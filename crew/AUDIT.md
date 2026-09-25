# Grok Bot crew slim-down audit

Proposals only. Rulings are in [`SETTLED.md`](SETTLED.md).
Nothing here is pasted into the Grok Bot app until you say yes.

## Blocker

The 15 profiles and 3 skills are not in this repo. I did not invent them.

| Place | Result |
| --- | --- |
| `github.com/andrewkcl/andrewkcl` | no profile or skill files |
| Other `andrewkcl` GitHub repos | none visible |
| Hub / Lowburn on this VM | not running |
| Supermemory / SenseLab | architecture notes only |
| Google Drive | journal + a writing sample; no skill files |

Profiles still live in the Grok Bot app.

## What I slimmed

Shared memory only. Six stores repeated the same door / costume / Aux / place rules (**516 words** of copies). [`proposed-shared.md`](proposed-shared.md) is **one 119-word** copy.

After you drop files into `profiles/` and `skills/`, delete any line that already lives in shared memory.

## How to finish the file trim

1. Copy the 15 profiles into `crew/profiles/`.
2. Copy the 3 skills into `crew/skills/`.
3. Export current shared memory to `crew/shared/current.md`.
4. Run `./crew/scripts/wordcount.sh`.
5. Re-ask the slim-down. Then each file gets a real before/after row.
