# Project review: Coastal Road Network and Second Trunk Road (CSTR)

- Review date: 2026-11-14
- Reviewer: Cursor Cloud Agent (`bc-db5730f0-b5c3-5005-bdb9-aad24cff26cc`)
- Review type: event-driven (Nazirul revisions to draft PR #141; tasks `cstr-bridge-milestones-v2` / `cstr-bridge-milestones-v3` / PCDS-28 / `cstr-bridge-names-v4` / PCDS-29)
- Current dashboard identity: Basic Infrastructure; Coastal Road Network and Second Trunk Road (CSTR); In Progress
- Tracked unit: combined card (Coastal Road Network + Second Trunk Road programme)
- Project identity checked: bridges that belong to CRN / STR packages only
- Name variants checked: Batang / Sungai / Jambatan; Muara Lassa / Batang Lassa; Tun Datuk Patinggi Tuanku Haji Bujang / Batang Rajang; Tun Abdul Taib Mahmud / Bintulu-Jepak; Batang Lingga / Sungai Lingga

## Context

Draft PR #141 first expanded per-bridge milestones, then restricted the card to **bridge opening lines only** with CRN/STR membership checks. This wording pass (PCDS-28 / v3) standardises every line to **opens to public** / BM **dibuka kepada orang awam**, tidies the summary, and makes Sungai Lingga its own undated pending line.

## Searches performed (Sungai Lingga traffic opening)

| Query / domain | Findings |
| --- | --- |
| `Jambatan Sungai Lingga dibuka` / `opened to traffic` / soft opening / pra-pelancaran | No traffic-opening page found |
| `site:ukas.sarawak.gov.my` Sungai Lingga | UKAS 44485 (14 Jul 2026): structure complete, **not yet open to the public**; STR package |
| DayakDaily / Borneo Post / The Star / Tribune / TVS / Bernama / New Sarawak Tribune | DayakDaily 13 Aug 2025: 99% complete, September completion target; Borneo Post 31 Oct 2026 Premier: Lingga **still to follow** after Lupar 2 opening |
| BM exact `Jambatan Sungai Lingga dibuka` | No opening article; Utusan/Suara coverage is construction progress only |

**Outcome:** No sourced opening-to-traffic date. Premier on 31 Oct 2026 still treats Lingga as forthcoming. Card uses open `TBD` **Sungai Lingga Bridge opens to public** (`done: false`) as the last milestone.

## CSTR membership decisions

| Bridge | Decision | Basis |
| --- | --- | --- |
| Batang Lassa | Keep | Bernama: Coastal Road and Second Trunk Road |
| Bintulu-Jepak | Keep | DayakDaily / Borneo Post: Second Trunk Road |
| Batang Rajang | Keep | Coastal mega-bridge set; DayakDaily 12-bridge coastal programme |
| Batang Saribas 1 / 2 | Keep | UKAS: Projek Jalan Pesisir |
| Batang Kemena (Sebauh) | Keep | Listed with coastal mega openings; DayakDaily / Borneo Post opening pages |
| Batang Igan | Keep | Coastal Package D5 |
| Sungai Krian | Keep | Coastal Package D4 |
| Batang Lupar 1 / 2 | Keep | Coastal / STR mega bridges |
| Sejingkat | Keep | Second Trunk Road (Aidel / DayakDaily) |
| Batang Paloh | Keep | Coastal Road Package 03 |
| Sungai Limbang | Keep | Original coastal 12-bridge programme; UKAS Dec 2026 public-opening schedule with other CRN/STR bridges. NCH connects *to* this bridge rather than replacing it |
| Rambungan | Keep | Coastal Road; Q4 2027 retained |
| Batang Samarahan 2 | Keep | UKAS: STR Package A1-A |
| Sungai Lingga | Keep (pending) | UKAS: Second Trunk Road; opening still pending |
| **Marudi** | **Remove** | UKAS 44485: MMMLL Road Project, not CRN/STR |
| **Datuk Amar Juma'ani** | **Remove** | Satok / Kuching urban landmark; not CRN/STR |
| **Marina (Miri)** | **Remove** | Miri urban complement to coastal / Pujut / Pan Borneo dispersal; not a CRN/STR package bridge |
| **Kuala Lawas** | **Remove** | Northern Coastal Highway (NCH / RECODA), not CSTR |

## Non-bridge rows removed

- Sejingkat Bridge construction remained on track
- Batang Paloh Bridge final span was connected
- Sejingkat Bridge reaches contractual completion
- Remaining CSTR road and bridge packages reach completion
- Remaining bridges (Sungai Lingga) reach completion (replaced by named Lingga opens-to-public line)

## Accepted milestone set (bridge lines only)

Wording: every EN line is `<Bridge name> opens to public`; every BM line is `Jambatan … dibuka kepada orang awam`.

Numbered-bridge naming (PCDS-29 / v4): official EN form is **`{Name} {N} Bridge`** (not `… Bridge {N}`). Backed by JKR press via DayakDaily (`Batang Saribas 1 Bridge`), UKAS / Premier Dept (`Batang Saribas 1 Bridge`, `Batang Saribas 2 Bridge`, `Batang Lupar 2 Bridge`), and UKAS BM `Jambatan Batang Lupar 1`. Applied to Saribas 1/2, Lupar 1/2, and Samarahan 2. BM already matches (`Jambatan Batang Saribas 1`, etc.).

Done openings: Batang Lassa (2025-01-09), Bintulu-Jepak (2025-03-23), Batang Rajang (2025-03-27), Batang Saribas 1 Bridge (2025-05-25), Batang Kemena (2025-12-06), Batang Igan (2026-03-16), Sungai Krian (2026-03-18), Batang Lupar 1 Bridge (2026-05-21), Sejingkat (2026-10-05), Batang Paloh (2026-10-30), Batang Lupar 2 Bridge (2026-10-31).

Open: Sungai Limbang (`2026-12`), Batang Saribas 2 Bridge (`2026-12-05`), Rambungan (`2027-Q4`), Batang Samarahan 2 Bridge (`2027-12`), Sungai Lingga (`TBD`, last).

**Pending-date note:** Limbang, Saribas 2, Rambungan, and Samarahan 2 dates are sourced **target or completion** dates. Replace each with an announced public-opening date when one is published. Samarahan 2 keeps `2027-12` from UKAS Package A1-A completion targeting even though the line now reads opens to public.

Collapsed next milestone should be **Sungai Limbang Bridge opens to public** (December 2026). Progress bar counts bridge lines only (**11/16**).

Summary no longer mentions the active Sejingkat Bridge package.

## Implementation

- `src/trackerData.js`: opens-to-public wording; Lingga named TBD last; Sejingkat package clause removed from summary; `LAST_UPDATED` stays `2026-11-14`
- `src/localization.js`: BM matched (`dibuka kepada orang awam`; summary without Sejingkat package)
- `src/updateHistory.js`: 2026-11-14 entry rewritten for wording / pending-date note
- `docs/data-methodology.md`: CSTR source-map note updated
