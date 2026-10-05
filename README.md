# andrewkcl

GitHub account hub for [andrewkcl](https://github.com/andrewkcl).

This profile lists every **public** repository on the account, refreshed automatically. Private repositories are deliberately excluded by `scripts/sync_account_repos.py` and are never published here.

## All repositories

<!-- repos:start -->
| Repository | Visibility | Description | Language | Updated |
| --- | --- | --- | --- | --- |
| [andrewkcl](https://github.com/andrewkcl/andrewkcl) | public | — | Python | 2026-10-04 |
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
