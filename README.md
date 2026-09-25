# andrewkcl

GitHub account hub for [andrewkcl](https://github.com/andrewkcl).

This profile lists **every repository** the account sync can see. Public repos refresh automatically. Private repos appear after you add an `ACCOUNT_REPO_TOKEN` Actions secret with `repo` scope.

## All repositories

<!-- repos:start -->
| Repository | Visibility | Description | Language | Updated |
| --- | --- | --- | --- | --- |
| [andrewkcl](https://github.com/andrewkcl/andrewkcl) | public | — | — | 2026-09-25 |
<!-- repos:end -->

## Connect Cursor to every repository

Cloud Agents only see repositories the Cursor GitHub App is allowed to access. To integrate the whole `andrewkcl` account:

1. Open [Cursor Integrations](https://cursor.com/dashboard?tab=integrations)
2. Next to GitHub, click **Manage Connections** (or **Connect**)
3. Choose **All repositories**
4. Confirm the GitHub permission prompt

Until that is set to **All repositories**, new repos will not be available to Cloud Agents even if they appear in the table above.

## Refresh the list

```bash
python3 scripts/sync_account_repos.py
```

The workflow in `.github/workflows/sync-account-repos.yml` runs the same command on a schedule and on demand.
