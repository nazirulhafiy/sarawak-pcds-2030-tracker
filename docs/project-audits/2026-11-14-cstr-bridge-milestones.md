# Project review: Coastal Road Network and Second Trunk Road (CSTR)

- Review date: 2026-11-14
- Reviewer: Cursor Cloud Agent (`bc-db5730f0-b5c3-5005-bdb9-aad24cff26cc`)
- Review type: event-driven (Chief task `cstr-bridge-milestones`; Nazirul pick)
- Current dashboard identity: Basic Infrastructure; Coastal Road Network and Second Trunk Road (CSTR); In Progress
- Tracked unit: combined card (Coastal Road Network + Second Trunk Road programme)
- Project identity checked: statewide mega-bridge set within CSTR / coastal and second-trunk packages
- Name variants checked: Batang / Sungai / Jambatan forms; Muara Lassa / Batang Lassa; Tun Datuk Patinggi Tuanku Haji Bujang / Batang Rajang; Tun Abdul Taib Mahmud / Bintulu-Jepak; Datuk Amar Juma'ani / Sungai Bintangor; Sebauh / Batang Kemena

## Context

Preview already carries Rambungan Bridge open traffic target `2027-Q4` (PR #140 / `0786f72`). This review removes the stale open row `Remaining nine major bridges reach completion` (`2027`) and replaces it with per-bridge milestones where public opening or expected-completion dates are sourced. Sungai Limbang Baharu and the RECODA Bandar Lawas bridge are excluded.

## Searches performed

| Search type | Exact query or official domain | Findings / candidate URLs |
| --- | --- | --- |
| Mandatory milestone-first discovery | `"Coastal Road" OR CSTR bridge milestones 2026` | UKAS 44267 / 44485; Borneo Post 9 Nov 2026 (14 of 22) |
| Exact-name | Each candidate bridge + opened / dibuka / completion | Opening dates for Marudi through Lupar 1, Igan, Krian, Kemena; Limbang Dec public opening; Samarahan 2 Dec 2027; Marina May 2029 |
| Counter-search | `"Sungai Limbang Baharu"` / RECODA Lawas bridge in 22 | Excluded per task; RECODA Lawas is the 22nd bridge outside JKR set |
| Official-domain | `site:ukas.sarawak.gov.my` Limbang / Samarahan / Krian / Lupar | UKAS 51425, 44169, 36562, 41130, 44485, 44267 |

## Candidate-source log

| URL | Discovery origin | Publisher/domain | Publication date | Identity and visible claim checked | Decision | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| https://ukas.sarawak.gov.my/web/subpage/news_view/51425 | Task lead | UKAS | 21 Oct 2026 | Sungai Limbang expected open to the public in December; also Lupar 2 / Saribas 2 schedules | Accepted | Primary for Limbang Dec public opening |
| https://www.theborneopost.com/2026/10/27/major-limbang-projects-on-track-for-completion-in-q1-2027/ | Task lead | Borneo Post | 27 Oct 2026 | Sungai Limbang Bridge package (with Sg Bunut No. 2 and roads) fully complete Q1 2027 | Noted / not used for open date | Package completion differs from public opening; card uses UKAS Dec public opening |
| https://ukas.sarawak.gov.my/web/subpage/news_view/44169 | Task lead | UKAS | 9 Jul 2026 | Package A1-A (Jambatan Samarahan to Sadong Jaya) expected complete Dec 2027 | Accepted | Current official Dec 2027 target for Batang Samarahan 2 / A1-A |
| https://www.bernama.com/bm/news.php?id=2279180 | Task lead | Bernama | 14 Mar 2024 | Paywalled Second Trunk Road general piece; no Dec 2027 / Feb 2027 revision visible | Rejected | Does not support the Samarahan schedule claim |
| https://suarasarawak.my/jambatan-batang-samarahan-baharu-dijangka-siap-februari-2027/ | Counter-search | Suara Sarawak | 19 Oct 2023 | Earlier Feb 2027 target for A1-A | Historical context only | Superseded by UKAS Jul 2026 Dec 2027 |
| https://dayakdaily.com/rm341-17-mln-marina-bridge-to-slash-miri-kpg-pulau-melayu-travel-time-to-5-mins-by-may-2029/ | Task lead | DayakDaily | 12 Sep 2026 | Marina Bridge completion May 2029 | Accepted | Open completion milestone |
| https://ukas.sarawak.gov.my/web/subpage/news_view/44267 | Task lead | UKAS | 10 Jul 2026 | Lists completed bridges including Sungai Lingga; pending Samarahan 2, Marina, Kuala Lawas | Accepted | Completed-set and undated open support |
| https://www.theborneopost.com/2026/11/09/14-out-of-22-bridges-in-sarawak-completed-says-caretaker-deputy-premier/ | Task lead | Borneo Post | 9 Nov 2026 | 14 of 22 complete; Kemena opened to public 6 Dec 2025 | Accepted | Programme count + Kemena traffic date |
| https://ukas.sarawak.gov.my/web/subpage/news_view/44485 | Chronology search | UKAS | 14 Jul 2026 | Opening / status chronology for Marudi, Lassa, Rajang, Jepak, Saribas 1, Juma'ani, Kemena, Igan, Krian, Lupar 1; Lingga structure complete but not yet open; Kuala Lawas phased to 2030 | Accepted | Multi-bridge chronology; Lingga stays undated Achieved |
| https://dayakdaily.com/highly-anticipated-marudi-bridge-opens-to-public/ | Opening search | DayakDaily | 10 Nov 2024 | Marudi opened to public | Accepted | Done opening |
| https://www.nst.com.my/news/nation/2025/03/1194065/sarawaks-longest-bridge-spanning-batang-rajang-now-open | Opening search | NST | 27 Mar 2025 | Batang Rajang soft-opened to public | Accepted | Done opening |
| Existing card Rambungan / Sejingkat / Paloh / Lupar 2 / Saribas 2 sources | Preview baseline | Mixed | Sep–Oct 2026 | Unchanged accepted claims | Retained | Keep prior PR #140 and weekly accepts |

## Field-by-field claim matrix

| Field | Current value | Candidate claim | Source scope | Role or value type | Newer evidence checked | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| `milestones` remaining-nine row | `2027` / Remaining nine… / open | Remove; replace with per-bridge rows | Combined-card bridges | Stale aggregate | 14 of 22 complete (Nov 2026) | Accept removal |
| `milestones` Limbang | Absent | Open `2026-12` public opening | UKAS 51425 | Targeted | Q1 2027 package page noted | Accept public-opening wording |
| `milestones` Samarahan 2 | Absent | Open `2027-12` completion | UKAS 44169 | Revised target | Feb 2027 older pages | Accept Dec 2027 |
| `milestones` Marina | Absent | Open `2029-05` completion | DayakDaily | Targeted | — | Accept |
| `milestones` dated opens | Only recent Sejingkat/Paloh/Lupar 2 | Add sourced openings Marudi→Lupar 1, Kemena, Igan, Krian | Official / news | Achieved | — | Accept |
| `milestones` Sungai Lingga | Absent | Done `Achieved` / Already open | UKAS 44267; no traffic date | Complete without day | UKAS 44485 still said not open (Jul) | Accept Achieved group line (Lingga only) |
| `milestones` Kuala Lawas | Inside remaining nine | Open `TBD` Remaining bridges (Kuala Lawas) | UKAS 44267 / 44485 | No sourced completion date | Phased-to-2030 is not a bridge date | Accept TBD |
| `milestones` Rambungan / Saribas 2 / Sejingkat rows | Present | Unchanged | Preview | — | — | Keep |
| `sources` | Rambungan-era set | Add opening / Limbang / Samarahan / Marina / 14-of-22 pages | — | — | — | Accept |
| `localization` | Old BM list | Match new EN milestone count and style | — | — | — | Accept |
| `updateHistory` | Rambungan Q4 entry | Add bridge-milestone expansion entry | — | — | — | Accept |
| `status` / `value` / `lead` / `summary` | Unchanged | — | — | — | — | No change |

## Accepted evidence and proposed effect

| Accepted URL | Exact supported claim | Claim strength | Affected field(s) | Proposed change |
| --- | --- | --- | --- | --- |
| UKAS 51425 | Sungai Limbang opens to the public in December 2026 | Official | `milestones`, `sources` | Add open `2026-12` public-opening row |
| UKAS 44169 | Package A1-A / Samarahan→Sadong Jaya complete Dec 2027 | Official | `milestones`, `sources` | Add open `2027-12` Batang Samarahan 2 |
| DayakDaily Marina | Completion May 2029 | Reputable news | `milestones`, `sources` | Add open `2029-05` |
| UKAS 44485 + opening pages | Dated traffic openings for Marudi, Lassa, Jepak, Rajang, Saribas 1, Juma'ani, Kemena, Igan, Krian, Lupar 1 | Official / news | `milestones`, `sources` | Add done rows |
| UKAS 44267 + Borneo Post 9 Nov | Lingga in completed set; 14 of 22 complete; no Lingga day date | Official / news | `milestones`, `sources` | Achieved “Already open: Sungai Lingga” |
| UKAS 44267 / 44485 | Kuala Lawas still pending; no inventable completion date | Official | `milestones` | Open TBD remaining-bridges row |

- Limbang wording choice: **Sungai Limbang Bridge opens to the public** (`2026-12`) from UKAS 21 Oct 2026, not the Borneo Post Q1 2027 package-completion claim.
- Publication dates verified on opened pages where fetch succeeded.
- Exact identity conclusion: mega bridges inside the combined CSTR card; Limbang Baharu and RECODA Lawas excluded.
- Card-scope conclusion: combined CSTR card; milestone expansion only.
- AI or search-summary claim compared with underlying source wording: pages opened or searched with visible claims; Bernama 2279180 rejected.
- Confidence: High for dated openings and Limbang/Samarahan/Marina targets; Medium for Lingga Achieved (complete in programme lists; no day-level traffic page found).
- False positives / name collisions: Rambungan shrimp aquaculture card; RECODA Lawas bridge; Sungai Limbang Baharu.
- Editorial update-history decision: add one 2026-11-14 entry for the per-bridge expansion (Rambungan Q4 entry from PR #140 retained).
- Follow-up trigger: Lingga traffic-opening page; Limbang or Saribas 2 opening confirmation; Kuala Lawas dated target; Sejingkat contractual completion confirmation.

## Implementation

- `src/trackerData.js`: remove remaining-nine row; add per-bridge done/open milestones in date order; expand sources; `LAST_UPDATED` stays `2026-11-14`
- `src/localization.js`: BM milestone list rewritten to match EN count and style
- `src/updateHistory.js`: new 2026-11-14 CSTR bridge-milestone entry
- `docs/data-methodology.md`: CSTR source-map note and review-cadence pointer updated
