# Grok Bot crew slim-down audit

Proposals only. Nothing in this folder is pasted into the Grok Bot app.
Bots keep their current behaviour until you review and say yes.

## Blocker

This repo has no crew files. I searched and did not invent replacements.

| Place | Result |
| --- | --- |
| `github.com/andrewkcl/andrewkcl` | `README.md` only (`# andrewkcl`) |
| Other `andrewkcl` GitHub repos | none |
| Local disk / hub ports `41773`, `43191` | hub and Lowburn not running here |
| Supermemory (3 docs, 30 memories) | architecture notes, not the 15 profiles or 3 skills |
| SenseLab | same architecture notes |
| Google Drive | Drift dig journal + a burn *writing* sample; no skill files |
| Notion / ChatPRD / Dropbox | no crew files (Dropbox email unverified) |

A prior cloud agent ([Bot team setup audit](https://cursor.com/agents/bc-eeb405ae-4859-4d43-875e-efa23abdf688)) hit the same gap. Profiles still live in the Grok Bot app on your machine.

## What I could slim

Shared memory, not the 15 profiles. The same rules sit in Supermemory, SenseLab, Drive, and (from your note) several bot profiles.

`crew/proposed-shared.md` is one 97-word copy of those rules. After you drop the real files into `crew/profiles/` and `crew/skills/`, strip any line that already lives there.

## Roster (partial)

Named in your prompts or memory. Not a complete 15.

| Name | Role I can evidence | Keep in profile? |
| --- | --- | --- |
| ◈7 / ◇7 Drift | Front door. Default bot. Reads a long profile every turn. | Yes — identity and door-only duties |
| ◈14 Still | Spoke in the launch note; no profile text found | Yes — once you paste it |
| Riff, Wander, Play, Wonder | You flagged overlap | Sharpen or merge after paste |
| Quest, Spot | You flagged overlap | Sharpen or merge after paste |
| Lowburn | Quota gate (port 43191), not a Grok Bot teammate | Not a 15th profile |
| Hub scratch pads | Memory: other hub bots are API pads, not teammates | Do not count as crew |

Skills named last time (bodies not here): `burn-playbook`, `specialist-as-costume`, `rustdesk-phone-reconnect`.

## Repeated rules — keep once, in shared memory

Delete these from every profile and skill after you paste files. Wording can stay as in `crew/proposed-shared.md`.

1. Drift is the front door. Do not fan out to specialist bots.
2. One costume per pass. One connector per pass.
3. Prefer free Aux (Exa, Tavily, Firecrawl, Context7, TubeAlfred, Parallel, Hugging Face, Supermemory).
4. Skip Refero. GitHub needs auth.
5. Playbooks at `/playbooks` paste into the Grok Bot app. Handoff at `/api/handoff`.
6. Kuching / Asia/Kuala_Lumpur / UTC+8.
7. After a dig: one-liners → memory; long scraps → Drift dig journal.
8. Confirm before public share, paid steps, or hard-to-undo actions.
9. Lowburn saves quota (exact cache, near-duplicate reuse, coalescing, one-model route). Not a teammate.

## Contradictions

1. **14 vs 15.** Last launch said 14 assistant bots. This one says 15. Confirm the roster before any merge.
2. **Crew vs costume.** Shared memory says no specialist fan-out and hub extras are scratch pads. A 15-profile crew only fits if those 15 live in the Grok Bot *app*, not the hub.
3. **◈7 vs ◇7.** Two spellings of Drift. Pick one in shared memory; profiles should not restate it.
4. **Which door.** Hub chat is `/api/chat`. Live web is `/api/explore`. Profiles should not each pick a different door.
5. **GitHub.** Drive journal (2026-09-24) said signup was skipped. This public repo and cloud agents exist now. Update that journal line; do not copy the old “skipped” rule into shared memory.

No profile-vs-skill wording conflicts were checkable without the files.

## Double-check before you apply anything

1. Exact list of 15 names (I only have eight).
2. Exact three skill filenames and whether “~1,100 words” is each or all three.
3. Whether Riff / Wander / Play / Wonder are four jobs or four tones of one job.
4. Whether Quest / Spot should merge.
5. Any “wake / @ / hand to another bot” lines — those cost extra turns. Shared rule 1 already forbids fan-out; extra wake rules in profiles may fight it.
6. Drift’s ~1,840-character description: I did **not** rewrite it. Doing that without the source would drop rules.

## How to finish the trim

1. Copy the 15 profiles into `crew/profiles/` (one file each).
2. Copy the 3 skills into `crew/skills/`.
3. Export current shared memory into `crew/shared/current.md`.
4. Re-run `./crew/scripts/wordcount.sh`.
5. Launch this agent again on this branch, or paste the same ask. Then I can cut each file and fill the before/after table from real text.
