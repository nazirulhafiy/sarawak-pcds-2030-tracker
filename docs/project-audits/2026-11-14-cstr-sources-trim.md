# Project review: Coastal Road Network and Second Trunk Road (CSTR)

- Review date: 2026-11-14
- Reviewer: Cursor Cloud Agent (`bc-0045806f-20f7-5e0c-a35a-d27978f3648e`)
- Review type: event-driven (Nazirul pick `cstr-sources-trim`; draft PR into `preview`)
- Current dashboard identity: Basic Infrastructure; Coastal Road Network and Second Trunk Road (CSTR); In Progress
- Tracked unit: combined card (Coastal Road Network + Second Trunk Road programme)
- Project identity checked: unchanged from [per-bridge milestone expansion](2026-11-14-cstr-bridge-milestones.md)
- Name variants checked: n/a (sources-only trim)

## Context

Preview at `6f58164` listed 25 CSTR sources. This pass removes five superseded or redundant links so the live card keeps the smallest set that still supports every displayed milestone. Milestones, dates, wording, summary, lead, value, and status are unchanged.

## Sources removed (preview numbering at `6f58164`)

| # | Label | URL | Reason |
| --- | --- | --- | --- |
| 7 | Borneo Post — Kemena traffic opening 6 Dec 2025 restated (Nov 2026) | https://www.theborneopost.com/2026/11/09/14-out-of-22-bridges-in-sarawak-completed-says-caretaker-deputy-premier/ | Restates the Dec 2025 Kemena opening already covered by DayakDaily opening page |
| 11 | DayakDaily — Sejingkat Bridge opening and contractual completion (Aug 2026) | https://dayakdaily.com/sejingkat-bridge-on-track-to-open-to-traffic-by-oct-1/ | Pre-opening / contractual target; superseded by Sejingkat opened page |
| 12 | DayakDaily — JKR sets Sejingkat Bridge opening for 5 October (Sep 2026) | https://dayakdaily.com/sejingkat-bridge-to-open-to-road-users-on-oct-5/ | Prospective opening date; superseded by Sejingkat opened page |
| 14 | DayakDaily — Batang Paloh Bridge final span connected; traffic opening 30 Oct (Oct 2026) | https://dayakdaily.com/1-7km-batang-paloh-bridge-to-open-to-traffic-on-oct-30-strengthening-coastal-link/ | Final-span / target page; superseded by Paloh opens-to-traffic page |
| 17 | The Star — Batang Lupar 2 officially opens (Oct 2026) | https://www.thestar.com.my/news/nation/2026/10/31/batang-lupar-2-bridge-officially-opens-to-cut-drive-time-between-simanggang-betong | Duplicate opening corroboration; UKAS Lupar 2 opening retained |

## Milestone coverage after trim

Every bridge-opening milestone still has at least one retained live source. No milestone was left without a source.

| Milestone | Retained evidence source (post-trim label) |
| --- | --- |
| Batang Lassa opens to public | Bernama — Batang Lassa Bridge opened… |
| Bintulu-Jepak opens to public | Borneo Post — Bintulu-Jepak Bridge opened… |
| Batang Rajang opens to public | NST — Batang Rajang Bridge opened… |
| Batang Saribas 1 Bridge opens to public | Borneo Post — Batang Saribas 1 opened… |
| Batang Kemena opens to public | DayakDaily — Batang Kemena Bridge opened… |
| Batang Igan opens to public | DayakDaily — Batang Igan Bridge opened… |
| Sungai Krian opens to public | UKAS — Sungai Krian Bridge opened… |
| Batang Lupar 1 Bridge opens to public | UKAS — Batang Lupar 1 opened… |
| Sejingkat opens to public | DayakDaily — Sejingkat Bridge opened to the public… |
| Batang Paloh opens to public | DayakDaily — Batang Paloh Bridge opens to traffic… |
| Batang Lupar 2 Bridge opens to public | UKAS — Batang Lupar 2 opened… |
| Sungai Limbang opens to public | UKAS — Limbang Dec public opening… |
| Batang Saribas 2 Bridge opens to public | Borneo Post — Batang Saribas 2 set to open 5 Dec… |
| Rambungan opens to public | DayakDaily — Batang Rambungan Bridge Q4 2027… / UKAS 49466 |
| Batang Samarahan 2 Bridge opens to public | UKAS — Package A1-A / Batang Samarahan 2… |
| Sungai Lingga opens to public | UKAS 44485 / Borneo Post Lingga still to follow |

## Localization

`src/localization.js` stores BM display fields only for this card (displayName, lead, value, summary, milestones). Source citation labels remain English in `src/trackerData.js`. No matching source entries existed to remove; milestone BM strings are unchanged.

## Update-history entries removed

Rather than retargeting `sourceUrl` values, these three superseded CSTR Updates entries were removed entirely from `src/updateHistory.js` (each entry carried both EN and BM descriptions; BM is not stored separately in `src/localization.js`):

| Date | EN summary | BM removed |
| --- | --- | --- |
| 2026-10-08 | Batang Paloh Bridge targeted to open 30 Oct (final-span / stitching update) | yes (same entry) |
| 2026-09-30 | Sejingkat Bridge 5 October opening set (JKR schedule) | yes (same entry) |
| 2026-08-17 | Sejingkat Bridge on track for 1 Oct | yes (same entry) |

## Implementation

- `src/trackerData.js`: remove the five sources above; 20 sources remain; milestones and other fields unchanged; `LAST_UPDATED` stays `2026-11-14`
- `src/updateHistory.js`: remove the three CSTR Updates entries listed above (EN + BM)
- `src/localization.js`: no change (no BM source labels or Updates copy for these entries)
- `docs/data-methodology.md`: review-cadence pointer and CSTR source-map note updated for this trim
