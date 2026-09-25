#!/usr/bin/env python3
"""Unit tests for the GitHub account repository sync."""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from scripts.sync_account_repos import (
    README_END,
    README_START,
    escape_cell,
    normalize_repo,
    owned_by,
    parse_next_link,
    render_repo_table,
    replace_readme_section,
    sort_repos,
    write_repos_json,
)


SAMPLE_RAW = {
    "name": "andrewkcl",
    "full_name": "andrewkcl/andrewkcl",
    "html_url": "https://github.com/andrewkcl/andrewkcl",
    "description": "Profile hub | all repos",
    "private": False,
    "fork": False,
    "language": None,
    "stargazers_count": 0,
    "updated_at": "2026-09-25T05:51:21Z",
    "default_branch": "main",
    "topics": [],
    "owner": {"login": "andrewkcl"},
}


class SyncAccountReposTest(unittest.TestCase):
    def test_parse_next_link(self) -> None:
        header = (
            '<https://api.github.com/user/repos?page=2>; rel="next", '
            '<https://api.github.com/user/repos?page=3>; rel="last"'
        )
        self.assertEqual(
            parse_next_link(header),
            "https://api.github.com/user/repos?page=2",
        )
        self.assertIsNone(parse_next_link(None))
        self.assertIsNone(parse_next_link('<https://example.com>; rel="last"'))

    def test_normalize_and_owner_filter(self) -> None:
        ours = normalize_repo(SAMPLE_RAW)
        other = normalize_repo({**SAMPLE_RAW, "owner": {"login": "someone-else"}})
        self.assertEqual(ours["name"], "andrewkcl")
        self.assertIsNone(ours["language"])
        self.assertEqual(owned_by([ours, other], "andrewkcl"), [ours])

    def test_sort_puts_private_last(self) -> None:
        public_b = normalize_repo({**SAMPLE_RAW, "name": "beta"})
        private_a = normalize_repo(
            {**SAMPLE_RAW, "name": "alpha", "private": True}
        )
        public_a = normalize_repo({**SAMPLE_RAW, "name": "alpha"})
        names = [repo["name"] for repo in sort_repos([public_b, private_a, public_a])]
        self.assertEqual(names, ["alpha", "beta", "alpha"])
        self.assertTrue(sort_repos([public_b, private_a, public_a])[-1]["private"])

    def test_render_escapes_pipes(self) -> None:
        table = render_repo_table([normalize_repo(SAMPLE_RAW)])
        self.assertIn("Profile hub \\| all repos", table)
        self.assertIn("[andrewkcl](https://github.com/andrewkcl/andrewkcl)", table)
        self.assertIn("| public |", table)
        self.assertEqual(render_repo_table([]), "_No repositories visible to this sync._")

    def test_replace_readme_section(self) -> None:
        readme = f"before\n{README_START}\nold\n{README_END}\nafter\n"
        updated = replace_readme_section(readme, "new table")
        self.assertIn(f"{README_START}\nnew table\n{README_END}", updated)
        self.assertTrue(updated.startswith("before\n"))
        self.assertTrue(updated.endswith("after\n"))
        with self.assertRaises(RuntimeError):
            replace_readme_section("no markers", "x")

    def test_escape_cell(self) -> None:
        self.assertEqual(escape_cell("a|b\nc"), "a\\|b c")

    def test_write_repos_json(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "data" / "repos.json"
            write_repos_json(path, "andrewkcl", [normalize_repo(SAMPLE_RAW)], "public")
            payload = json.loads(path.read_text(encoding="utf-8"))
            self.assertEqual(payload["owner"], "andrewkcl")
            self.assertEqual(payload["count"], 1)
            self.assertEqual(payload["repositories"][0]["full_name"], "andrewkcl/andrewkcl")

    def test_owned_by_is_case_insensitive(self) -> None:
        repo = normalize_repo(SAMPLE_RAW)
        self.assertEqual(owned_by([repo], "AndrewKCL"), [repo])


if __name__ == "__main__":
    unittest.main()
