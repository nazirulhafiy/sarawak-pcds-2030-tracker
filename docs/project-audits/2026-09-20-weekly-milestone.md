# Weekly milestone audit — 2026-09-20

- Review date: 2026-09-20
- Reviewer: Cursor Cloud Agent (`2026-09-20-weekly-milestone`), on behalf of the tracker owner
- Cloud Agent run: https://cursor.com/agents/bc-b12852ac-8ded-5003-a1d9-8437a279bcc0
- Review type: weekly milestone automation (Stage A discovery + Stage B implement)
- Publication mode: `preview_merge`
- Timezone: `Asia/Kuching`
- Inventory: `node scripts/audit-inventory.mjs .` (and `--json` ranking)
- Base tip at launch: `82a0d617678eee30dbcfff83aa35f6bbb791b6ae` on `preview`

Search syntheses, snippets, and result previews were discovery only. Every accepted claim was checked against an opened public page. Google AI Mode was not used.

## Scope table

Inventory-ranked Planning or Ongoing / In Progress cards, chosen for thin milestones, approaching or passed open targets, or provisional Planning wording. Last week's top-scoring Forestry / VTMS / Low-Carbon / Climate Centre batch was rotated out.

| Project | Category | Status | Why selected |
| --- | --- | --- | --- |
| Miri Port Kuala Baram Capital Dredging | Transport | In Progress | Thin milestones (3); October 2026 completion approaching |
| Coastal Road Network and Second Trunk Road (CSTR) | Basic Infrastructure | In Progress | Limited sources; Sejingkat 1 October 2026 opening approaching |
| Sarawak Infectious Disease Centre | Innovation | In Progress | October 2026 campus-completion target approaching / passed-target risk |
| Special Needs Community Centre | Social Services | Planning | Planning; JKR tender T/388/07/2026 closing 23 September 2026 |
| Community Social Support Centre (CSSC) Network | Social Services | In Progress | Passed May 2026 Bintulu operations target still open |
| Sago BioCNG Plant and Gas Distribution Network | Renewable Energy | In Progress | Unknown value; Q4 2026 pilot-completion target |

Out of scope: all other live cards; designated or operational cards; excluded or deferred candidates not triggered by this batch; Codex branches; `main`; V2 UI shell.

## Stage A outcomes

| Project | Outcome | Confidence | Notes |
| --- | --- | --- | --- |
| Miri Port Kuala Baram Capital Dredging | Update recommended | High | Official SRB page: 69% as of 30 June 2026 |
| Coastal Road Network and Second Trunk Road (CSTR) | Monitor | High | Finishing works; 1 October opening still a target |
| Sarawak Infectious Disease Centre | Update recommended | High | CEO schedules official launch Q3 2027; two independent reports |
| Special Needs Community Centre | Monitor | High | Tender still closing 23 September 2026; no letter of award |
| Community Social Support Centre (CSSC) Network | Monitor | High | No Bintulu opening or operator-handover page |
| Sago BioCNG Plant and Gas Distribution Network | No card change | High | March 2026 TVS page remains latest opened delivery claim |

## Implemented cards

### 1. Sarawak Infectious Disease Centre

- Tracked unit: single asset (Samarahan One Health research campus)
- Searches: `"Sarawak Infectious Disease Centre" project milestones`; `update 2026` / `latest status 2026`; delayed / revised / cancelled / official launch; counter-search for campus completion
- Opened and accepted:
  - https://dayakdaily.com/sarawak-infectious-disease-centre-construction-expected-to-complete-by-q3-2027/ (10 Sep 2026) — CEO: official launch Q3 2027; construction began March 2024; “our facility is not even here yet”
  - https://www.sarawaktribune.com/sidc-targets-2027-launch-eyes-regional-pandemic-preparedness-hub/ (10 Sep 2026) — independent CEO quote: official launch in the third quarter of 2027; facility still under construction
  - https://www.sarawaktribune.com/sidc-headquarters-reaches-80-pct-completion/ (18 May 2026) — ministerial 80 percent headquarters completion
  - Existing SIDC, DayakDaily Dec 2025 40.19 percent, and August 2026 RM300 million pages retained
- Rejected / not used to change fields:
  - DayakDaily 10 Aug 2026 “nearing completion” — superseded by the 10 September CEO launch date
  - RM143 million May 2026 development figure — older / different scope than the Premier’s more-than-RM300-million establish investment
  - RM72 million 2026 construction-and-operations allocation and older RM200 million commitment — already rejected
- Field effect: added March 2024 construction-start and 18 May 2026 80 percent completed milestones; replaced the open October 2026 campus-completion row with Q3 2027 official launch; sources added; status remains `In Progress`; value remains `RM300 million`
- Update-history: added 2026-09-10 entry for the revised official-launch schedule

### 2. Miri Port Kuala Baram Capital Dredging

- Tracked unit: single asset (Kuala Baram access-channel dredging and training bunds)
- Searches: `"Miri Port Kuala Baram Capital Dredging" project milestones`; 69 percent / SRB / 2026 progress; completed / delayed / later percent; official-domain SRB
- Opened and accepted:
  - https://srb.sarawak.gov.my/web/subpage/news_view/896 (posted 8 Jul 2026; visit 4 Jul 2026) — as of 30 June 2026 overall progress 69 percent, 3 percent ahead of schedule
  - https://www.sarawaktribune.com/kuala-baram-delta-dredging-project-ahead-of-schedule/ (7 Jul 2026) — corroborates the 69 percent / 30 June figure
- Opened, retained as context only:
  - https://dayakdaily.com/kuala-baram-dredging-project-eyes-end-2026-finish-ahead-of-march-2027-deadline/ (5 Sep 2026) — restates end-2026 finish ahead of March 2027; does not replace the more precise October 2026 open target already on the card
  - Existing DayakDaily 25 Apr 2026 55 percent and MIPD acceleration pages retained
- Rejected:
  - RM208.9 million later official figure — conflict with the June 2024 RM238 million contract award; existing dashboard value retained
  - April 2026 “70 percent offshore works” — different measurement; not used to overwrite overall progress
  - DID Kuala Baram fishermen-access dredging — different project
- Field effect: added completed 30 June 2026 69 percent milestone; SRB source added; October 2026 completion remains open; status remains `In Progress`
- Update-history: added 2026-07-08 entry from the official SRB page

## Unchanged cards

### Coastal Road Network and Second Trunk Road (CSTR)

- Searches: `"Coastal Road Network and Second Trunk Road" project milestones`; `"Sejingkat Bridge" update 2026`
- Opened:
  - https://dayakdaily.com/sejingkat-bridge-on-track-to-open-to-traffic-by-oct-1/ — already on the card
  - https://sarawakdaily.com/sejingkat-bridge-october-opening-2026/ (18 Sep 2026) — finishing works and early-October opening still prospective
  - https://www.sarawaktribune.com/bridges-complete-continuous-corridors/ (23 Aug 2026) — programme context; Sejingkat not among the five completed packages
- Decision: Monitor. 1 October 2026 opening and 22 October contractual completion remain open targets.
- Follow-up: a page that names Sejingkat Bridge and states it opened to traffic, or a revised opening date.

### Special Needs Community Centre

- Searches: `"Special Needs Community Centre" project milestones`; tender / award / SNCC Samarahan 2026
- Opened:
  - https://dayakdaily.com/sarawak-to-build-rm30-mln-special-needs-community-centre-to-deliver-lifelong-care-training-support/ — already on the card
  - https://www.sarawaktribune.com/sncc-first-phase-on-track-for-2028-completion/ (14 Sep 2026) — restates RM30 million and May 2028 completion; no award
  - https://jkr.sarawak.gov.my/web/subpage/tender_and_quotation_list/tender — live tender list page opened; listing body is JS-rendered
  - https://etendernotice.sarawak.gov.my/etender/public/public_tender_list.jsp?current_index=65 and adjacent search-result slices were opened; those fetched pages did not include T/388/07/2026. Search listings still describe that tender as posted 25 July 2026 and closing 23 September 2026. No award page was opened.
- Decision: Monitor. Letter of award remains November 2026; status stays `Planning`.
- Follow-up: tender close, award notice, or a page that names SNCC and states the letter of award.

### Community Social Support Centre (CSSC) Network

- Searches: `"Community Social Support Centre" project milestones`; CSSC Bintulu launch / handed over / operations 2026
- Opened:
  - https://jkr.sarawak.gov.my/web/subpage/webpage_view/465 — July 2026 furniture quotation already on the card
  - https://www.theborneopost.com/2026/02/27/bintulu-miri-homeless-transit-centres-near-completion-to-open-this-year-says-fatimah/ — TTG / homeless-transit wording, not CSSC operations
  - https://www.theborneopost.com/2025/07/25/bintulus-new-transit-centre-for-homeless-set-to-open-in-october/ — older TTG/CSSC housing claim; not an operations closer
- Value exhaustion: RM40 million remains PDF-only; RM1.3 million / RM1.8 million are TTG operating allocations, not this network’s capital cost. `Not disclosed` retained.
- Decision: Monitor. Bintulu operations remain undated.
- Follow-up: a page that names CSSC Bintulu and states opening, launch, or operator handover.

### Sago BioCNG Plant and Gas Distribution Network

- Searches: `"Sago BioCNG Plant and Gas Distribution Network" project milestones`; Kampung Tabo / CRAUN biogas 2026; kos / nilai projek / pelaburan / juta; completed / siap
- Opened:
  - https://www.tvsarawak.my/2026/03/27/krisis-tenaga-dunia-sisa-sagu-jadi-emas-hijau/ (27 Mar 2026) — 122 homes; pilot targeted for end-2026; already on the card
  - https://www.bernama.com/en/news.php?id=1792690 — RM8 million federal + RM1.5 million state is the 2016–2019 wastewater-plant allocation, not the BioCNG distribution network
  - https://colleges.segi.edu.my/sarawak/turning-sarawaks-sago-story-into-student-learning/ (13 Mar 2026) — student visit; no delivery milestone
- Decision: No card change. Value remains `Not disclosed`. Q4 2026 pilot completion remains open.
- Follow-up: a page confirming pilot completion or a project-specific BioCNG network cost.

## Field-by-field claim matrix (accepted cards)

| Field | SIDC current → decision | Miri Port current → decision |
| --- | --- | --- |
| `status` | In Progress → retain | In Progress → retain |
| `value` | RM300 million → retain | RM238 million → retain (RM208.9 million conflict) |
| `lead` | SIDC → retain | MPA / Rimbun Prima-CCCC JV → retain |
| `summary` | No Oct 2026 wording → retain | Contract summary still accurate → retain |
| `milestones` | Replace Oct 2026 open row; add Mar 2024 start and May 2026 80% | Add 30 June 2026 69%; keep Oct 2026 open |
| `sources` | Add May 2026 Tribune 80% and two 10 Sep 2026 launch pages | Add SRB 8 Jul 2026 official notice |

## False positives / collisions

- DID Kuala Baram fishermen-access dredging is not the Miri Port capital-dredging card.
- CSSC / CSSC Beihai shipbuilding hits are unrelated China State Shipbuilding results.
- PCDS tracker self-hits (`pcds2030.com`) are not evidence.
- GlobalTenders SNCC listing used an unverified 19 August 2026 deadline; the official eTender row still shows 23 September 2026.
- IMWO Kuala Baram briefs repeat the SRB 69 percent figure and are secondary.

## Checks

- `npm run check:content`
- `npm run lint`
- `npm run build:preview`
- `git diff --check`
