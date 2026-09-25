#!/usr/bin/env python3
"""Sync every GitHub repository owned by this account into data/ and README.md."""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Mapping


DEFAULT_OWNER = "andrewkcl"
README_START = "<!-- repos:start -->"
README_END = "<!-- repos:end -->"
USER_AGENT = "andrewkcl-account-repo-sync/1.0"

Repo = dict[str, Any]


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def github_headers(token: str | None) -> dict[str, str]:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": USER_AGENT,
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def parse_next_link(link_header: str | None) -> str | None:
    if not link_header:
        return None
    for part in link_header.split(","):
        section = part.strip()
        if 'rel="next"' not in section:
            continue
        start = section.find("<")
        end = section.find(">", start + 1)
        if start == -1 or end == -1:
            return None
        return section[start + 1 : end]
    return None


def fetch_json_pages(url: str, headers: Mapping[str, str]) -> list[Any]:
    collected: list[Any] = []
    current: str | None = url
    while current:
        request = urllib.request.Request(current, headers=dict(headers), method="GET")
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
                link_header = response.headers.get("Link")
        except urllib.error.HTTPError as error:
            body = error.read().decode("utf-8", errors="replace")
            raise RuntimeError(
                f"GitHub API {error.code} for {current}: {body}"
            ) from error
        if not isinstance(payload, list):
            raise RuntimeError(f"GitHub API returned a non-list payload from {current}")
        collected.extend(payload)
        current = parse_next_link(link_header)
    return collected


def normalize_repo(raw: Mapping[str, Any]) -> Repo:
    owner = raw.get("owner")
    owner_login = ""
    if isinstance(owner, Mapping):
        owner_login = str(owner.get("login") or "")
    description = raw.get("description")
    language = raw.get("language")
    topics = raw.get("topics")
    return {
        "name": str(raw.get("name") or ""),
        "full_name": str(raw.get("full_name") or ""),
        "html_url": str(raw.get("html_url") or ""),
        "description": description if isinstance(description, str) else None,
        "private": bool(raw.get("private")),
        "fork": bool(raw.get("fork")),
        "language": language if isinstance(language, str) else None,
        "stargazers_count": int(raw.get("stargazers_count") or 0),
        "updated_at": str(raw.get("updated_at") or ""),
        "default_branch": str(raw.get("default_branch") or "main"),
        "topics": [str(topic) for topic in topics] if isinstance(topics, list) else [],
        "owner": owner_login,
    }


def owned_by(repos: list[Repo], owner: str) -> list[Repo]:
    wanted = owner.lower()
    return [repo for repo in repos if repo["owner"].lower() == wanted]


def sort_repos(repos: list[Repo]) -> list[Repo]:
    return sorted(repos, key=lambda repo: (repo["private"], repo["name"].lower()))


def list_account_repos(owner: str, token: str | None) -> tuple[list[Repo], str]:
    if token:
        query = urllib.parse.urlencode(
            {
                "per_page": "100",
                "affiliation": "owner",
                "sort": "full_name",
            }
        )
        pages = fetch_json_pages(
            f"https://api.github.com/user/repos?{query}",
            github_headers(token),
        )
        visibility = "public_and_private"
        repos = owned_by([normalize_repo(item) for item in pages if isinstance(item, Mapping)], owner)
        return sort_repos(repos), visibility

    query = urllib.parse.urlencode(
        {
            "per_page": "100",
            "type": "owner",
            "sort": "full_name",
        }
    )
    pages = fetch_json_pages(
        f"https://api.github.com/users/{urllib.parse.quote(owner)}/repos?{query}",
        github_headers(None),
    )
    repos = [normalize_repo(item) for item in pages if isinstance(item, Mapping)]
    return sort_repos(owned_by(repos, owner)), "public"


def escape_cell(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ").strip()


def render_repo_table(repos: list[Repo]) -> str:
    if not repos:
        return "_No repositories visible to this sync._"
    lines = [
        "| Repository | Visibility | Description | Language | Updated |",
        "| --- | --- | --- | --- | --- |",
    ]
    for repo in repos:
        name = escape_cell(repo["name"])
        url = repo["html_url"]
        visibility = "private" if repo["private"] else "public"
        description = escape_cell(repo["description"] or "—")
        language = escape_cell(repo["language"] or "—")
        updated = escape_cell((repo["updated_at"] or "")[:10] or "—")
        lines.append(
            f"| [{name}]({url}) | {visibility} | {description} | {language} | {updated} |"
        )
    return "\n".join(lines)


def replace_readme_section(readme: str, table: str) -> str:
    start = readme.find(README_START)
    end = readme.find(README_END)
    if start == -1 or end == -1 or end < start:
        raise RuntimeError("README.md is missing the repos:start / repos:end markers")
    before = readme[: start + len(README_START)]
    after = readme[end:]
    return f"{before}\n{table}\n{after}"


def write_repos_json(
    path: Path,
    owner: str,
    repos: list[Repo],
    visibility: str,
) -> None:
    payload = {
        "owner": owner,
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "visibility": visibility,
        "count": len(repos),
        "repositories": repos,
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=False) + "\n", encoding="utf-8")


def sync(
    owner: str,
    token: str | None,
    readme_path: Path,
    data_path: Path,
) -> dict[str, Any]:
    repos, visibility = list_account_repos(owner, token)
    write_repos_json(data_path, owner, repos, visibility)
    table = render_repo_table(repos)
    readme_path.write_text(
        replace_readme_section(readme_path.read_text(encoding="utf-8"), table),
        encoding="utf-8",
    )
    return {
        "owner": owner,
        "count": len(repos),
        "visibility": visibility,
        "names": [repo["full_name"] for repo in repos],
    }


def resolve_token() -> str | None:
    for key in ("ACCOUNT_REPO_TOKEN", "GH_TOKEN", "GITHUB_TOKEN"):
        value = os.environ.get(key, "").strip()
        if value and key == "GITHUB_TOKEN":
            # Installation tokens for this repo cannot list other private repos
            # or call /user. Prefer the public owner catalog unless a PAT exists.
            continue
        if value:
            return value
    return None


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--owner", default=os.environ.get("GITHUB_OWNER", DEFAULT_OWNER))
    parser.add_argument("--readme", type=Path, default=repo_root() / "README.md")
    parser.add_argument("--data", type=Path, default=repo_root() / "data" / "repos.json")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv if argv is not None else sys.argv[1:])
    result = sync(args.owner, resolve_token(), args.readme, args.data)
    print(
        f"Synced {result['count']} {result['visibility']} "
        f"repositor{'y' if result['count'] == 1 else 'ies'} for {result['owner']}: "
        + ", ".join(result["names"])
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
