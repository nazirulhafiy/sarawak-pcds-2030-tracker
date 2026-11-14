# Project review: Coastal Road Network and Second Trunk Road (CSTR)

- Review date: 2026-11-14
- Reviewer: Cursor Cloud Agent (`bc-db5730f0-b5c3-5005-bdb9-aad24cff26cc`)
- Review type: event-driven (Nazirul revisions to draft PR #141; task `cstr-bridge-milestones-v2`)
- Current dashboard identity: Basic Infrastructure; Coastal Road Network and Second Trunk Road (CSTR); In Progress
- Tracked unit: combined card (Coastal Road Network + Second Trunk Road programme)
- Project identity checked: bridges that belong to CRN / STR packages only
- Name variants checked: Batang / Sungai / Jambatan; Muara Lassa / Batang Lassa; Tun Datuk Patinggi Tuanku Haji Bujang / Batang Rajang; Tun Abdul Taib Mahmud / Bintulu-Jepak; Batang Lingga / Sungai Lingga

## Context

Draft PR #141 first expanded per-bridge milestones. This revision restricts the card to **bridge opening lines only**, verifies each bridge against CRN/STR membership, and re-checks Sungai Lingga.

## Searches performed (Sungai Lingga traffic opening)

| Query / domain | Findings |
| --- | --- |
| `Jambatan Sungai Lingga dibuka` / `opened to traffic` / soft opening / pra-pelancaran | No traffic-opening page found |
| `site:ukas.sarawak.gov.my` Sungai Lingga | UKAS 44485 (14 Jul 2026): structure complete, **not yet open to the public**; STR package |
| DayakDaily / Borneo Post / The Star / Tribune / TVS / Bernama / New Sarawak Tribune | DayakDaily 13 Aug 2025: 99% complete, September completion target; Borneo Post 31 Oct 2026 Premier: Lingga **still to follow** after Lupar 2 opening |
| BM exact `Jambatan Sungai Lingga dibuka` | No opening article; Utusan/Suara coverage is construction progress only |

**Outcome:** No sourced opening-to-traffic date. Premier on 31 Oct 2026 still treats Lingga as forthcoming. Card uses open `TBD` **Remaining bridges (Sungai Lingga) reach completion** (`done: false`), not Achieved.

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

## Accepted milestone set (bridge lines only)

Done openings: Batang Lassa (2025-01-09), Bintulu-Jepak (2025-03-23), Batang Rajang (2025-03-27), Batang Saribas 1 (2025-05-25), Batang Kemena (2025-12-06), Batang Igan (2026-03-16), Sungai Krian (2026-03-18), Batang Lupar 1 (2026-05-21), Sejingkat (2026-10-05), Batang Paloh (2026-10-30), Batang Lupar 2 (2026-10-31).

Open: Sungai Limbang public opening (`2026-12`), Batang Saribas 2 (`2026-12-05`), Rambungan (`2027-Q4`), Batang Samarahan 2 (`2027-12`), Remaining bridges (Sungai Lingga) (`TBD`).

Collapsed next milestone should be **Sungai Limbang Bridge opens to the public** (December 2026). Progress bar counts bridge lines only (**11/16**).

## Implementation

- `src/trackerData.js`: bridge-only milestones; membership removals; sources trimmed/refreshed; `LAST_UPDATED` stays `2026-11-14`
- `src/localization.js`: BM list matched to EN
- `src/updateHistory.js`: 2026-11-14 entry rewritten for bridge-only / membership cleanup
- `docs/data-methodology.md`: CSTR source-map note updated
