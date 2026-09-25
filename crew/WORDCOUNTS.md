# Word counts

`wc -w` on UTF-8 text. Run `./crew/scripts/wordcount.sh` after you drop files in.

## Source files (the 15 + 3)

| File | Before | After | Delta |
| --- | ---: | ---: | ---: |
| 15 profiles | not in repo | — | — |
| 3 skills (~1,100 words, each or total — confirm) | not in repo | — | — |

No profile or skill was rewritten. Inventing text would change behaviour.

## Shared layer I could see

`wc -w` on the texts pulled from each store (verified 2026-09-25).

| Source | Before |
| --- | ---: |
| Supermemory hub note | 62 |
| Supermemory Lowburn note | 43 |
| Supermemory Aux stack | 168 |
| SenseLab `architecture-front-door` | 67 |
| SenseLab `architecture-quota-gate` | 74 |
| Drive journal standing rules | 102 |
| **Sum of copies (overlap included)** | **516** |
| `crew/proposed-shared.md` (one copy) | **97** |

Those six sources repeat the same door / costume / Aux / place rules. The proposal is one 97-word copy. It does not replace the 15 profiles.

## When files are in the repo

The script prints a row per file under `crew/profiles/`, `crew/skills/`, and `crew/shared/`. Re-run it, then fill After once the slim lands.
