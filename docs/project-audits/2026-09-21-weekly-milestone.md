# Weekly milestone audit — 2026-09-21

- Review date: 2026-09-21
- Reviewer: Cursor Cloud Agent (`2026-09-21-weekly-milestone`), on behalf of the tracker owner
- Cloud Agent run: https://cursor.com/agents/bc-541d676b-6bd6-50b4-b767-2730f13123b7
- Review type: weekly milestone automation (Stage A discovery + Stage B implement)
- Publication mode: `preview_merge`
- Timezone: `Asia/Kuching`
- Inventory: `node scripts/audit-inventory.mjs .` (and `--json` ranking)
- Base tip at launch: `21c0530bc902192df733e97df5d93c6945b817eb` on `preview`

Search syntheses, snippets, and result previews were discovery only. Every accepted claim was checked against an opened public page. Google AI Mode was not used.

## Scope table

Inventory-ranked Planning or Ongoing / In Progress cards, chosen for thin milestones, passed open targets, or provisional Planning wording. The 7, 14 and 20 September batches (forestry / VTMS / Low-Carbon; SIDC / Miri Port / social / Sago) were rotated out.

| Project | Category | Status | Why selected |
| --- | --- | --- | --- |
| SMD Semiconductor — GaN Chip Development | Manufacturing | In Progress | Score 2; unknown value; early-2026 IP target passed |
| RM1 Billion Paddy Infrastructure Programme | Commercial Agriculture | In Progress | Thin milestones (3); 2026 clustering / leasing still open |
| SCORE — Sarawak Corridor of Renewable Energy | Basic Infrastructure | In Progress | Thin milestones (3); prior RM151.5B hold pending a second opened page |
| Bau Gold Project | Mining | Planning | Planning; final mining-lease conditions still open |
| Baram Agrovoltaic Project | Renewable Energy | Planning | Planning; provisional component-operation wording |
| FR21 Jalan Serian-Tebedu-Indonesia Border Upgrade | Basic Infrastructure | Planning | Planning; Q4 2026 preliminary-cost finalisation approaching |

Out of scope: all other live cards; designated or operational cards; excluded or deferred candidates not triggered by this batch; Codex branches; `main`; V2 UI shell.

## Stage A outcomes

| Project | Outcome | Confidence | Notes |
| --- | --- | --- | --- |
| SMD Semiconductor — GaN Chip Development | Monitor | High | IP registration still unconfirmed; Linyang MoA already on the card |
| RM1 Billion Paddy Infrastructure Programme | Monitor | High | Clustering / leasing still proposed or under study; no 2026 commencement page |
| SCORE — Sarawak Corridor of Renewable Energy | Update recommended | High | Two opened reputable pages quote RM151.5B approved investment |
| Bau Gold Project | Monitor | High | 31 July 2026 Besra page: final lease terms not determined |
| Baram Agrovoltaic Project | Monitor | Medium | 18 June 2026 Tribune reports a proposed 2026 official launch, not an achieved event |
| FR21 Jalan Serian-Tebedu-Indonesia Border Upgrade | Monitor | High | No construction award; Q4 2026 preliminary work remains open |

## Implemented card

### SCORE — Sarawak Corridor of Renewable Energy

- Tracked unit: programme (SCORE corridor; RECODA / URDA / HDA / NRDA delivery)
- Searches: `"Sarawak Corridor of Renewable Energy" project milestones`; `SCORE Sarawak RECODA update 2026 latest status investment`; `SCORE "RM151.5 billion"`; official-domain `site:recoda.gov.my`; counter-search for later revision
- Opened and accepted:
  - https://www.sarawaktribune.com/recoda-drives-rm4-5-billion-infrastructure-push-strengthens-rural-connectivity/ (1 Apr 2026) — Deputy Premier: approved investments in SCORE have reached RM151.5 billion, 655 projects, potential over 60,000 jobs
  - https://suarasarawak.my/recoda-diamanah-laksana-243-projek-infrastruktur-asas-kritikal/ (1 Apr 2026) — independent BM report of the same Rindok Raya speech; `jumlah pelaburan yang diluluskan di SCORE telah mencecah RM151.5 bilion`
- Opened and retained as context:
  - https://dayakdaily.com/243-critical-projects-worth-rm4-5-bln-to-boost-infrastructure-devt-rural-connectivity-across-sarawak/ (2 Apr 2026) — already on the card; same event; omits the RM151.5 billion figure; supports 243 / RM4.5 billion rural works still underway
  - https://recoda.gov.my/pbm-miri-2025-transforming-sarawak-through-score/ (15 Jul 2025) — official older more-than-RM125-billion figure
  - https://recoda.gov.my/recoda-delivers-four-completed-projects-to-asset-owners-in-northern-region/ (8 Apr 2026) — four northern community handovers; does not close the statewide rural-infrastructure outcome
- Rejected / not used to change fields:
  - Borneo Post 2 Apr 2026 mirror — Cloudflare challenge; body not opened
  - Jiwa Bakti 1 Apr 2026 RM151.5 billion page — previously opened; not required once Tribune and Suara Sarawak were opened
  - MIDA statewide approved-private-investment tables — portfolio aggregate, not SCORE
  - Four northern-region handovers — not a SCORE industrial-park or programme-completion event
- Field effect: value `RM125 billion` → `RM151.5 billion`; summary restated as approved investment across 655 projects; added completed 1 April 2026 milestone; Tribune and Suara Sarawak sources added; status remains `In Progress`; open industrial-park and rural-infrastructure rows remain open
- Update-history: added 2026-04-01 entry from the Sarawak Tribune report

## Unchanged cards

### SMD Semiconductor — GaN Chip Development

- Searches: `"SMD Semiconductor — GaN Chip Development" project milestones`; `"SMD Semiconductor" "GaN" project milestones`; update / latest status 2026; IP registration / commercialisation / completed; value / kos / pelaburan; counter-search delayed / cancelled
- Opened:
  - https://smdsemiconductor.com/smd-linyang-partner-to-bring-sarawak-semiconductor-technologies-to-global-markets (13 Aug 2026) — already on the card; evaluation, qualification and commercialisation remain prospective
  - https://dayakdaily.com/sarawak-designed-keteq-ai-chip-set-to-secure-global-ip-rights-by-early-2026/ (3 Oct 2025) — already on the card; early-2026 IP target, not confirmation
  - https://dayakdaily.com/builds-on-semiconductor-roadmap-phase-1-success-sarawaks-smd-targets-global-chip-commercialisation-in-phase-2/ (19 May 2026) — Phase 2 commercialisation is still a target / pathway
- Value exhaustion: RM2 billion is the Semiconductor Roadmap 2030 investment target; RM3 billion is the X-FAB Sama Jaya expansion; RM15.4 billion is the Sama Jaya Free Industrial Zone aggregate; RM30 billion is a roadmap GDP contribution. `Not disclosed` retained.
- Decision: Monitor. Follow-up: a page that names keteq / SMD and states IP registration granted, or commercial production / product embedding as achieved.

### RM1 Billion Paddy Infrastructure Programme

- Searches: `"RM1 Billion Paddy Infrastructure Programme" project milestones`; Sarawak paddy infrastructure clustering leasing 2026; kos / peruntukan; counter-search completed / delayed
- Opened:
  - https://did.sarawak.gov.my/web/subpage/news_view/813 (20 Nov 2024) — 18 projects to commence in 2025 and 22 in 2026; target language, not confirmation
  - https://dayakdaily.com/rm1-bln-in-infra-at-stake-minister-warns-against-misuse-of-paddy-facilities-for-oil-palm/ (16 Feb 2026) — already on the card; clustering proposed; leasing still being studied
  - https://www.sarawaktribune.com/11700-hectares-identified-for-paddy-cultivation-to-boost-rice-self-sufficiency/ (27 May 2025) — land identification and DBOT guidelines being drafted
- Rejected identity collision: MADA / Kedah five-seasons-in-two-years RM1 billion infrastructure programme
- Borneo Post 17 Feb 2026 DBOT page — Cloudflare challenge; body not opened
- Decision: Monitor. 2026 farmer clustering and paddy land leasing remain open. Follow-up: a page that names the Sarawak programme and states clustering, leasing, or 2026 project commencement as achieved.

### Bau Gold Project

- Searches: `"Bau Gold Project" project milestones`; Besra mining-lease update 2026; `ML 05/2012/1D` finalised August / September 2026
- Opened:
  - https://www.besra.com/update-on-ml-05-2012-1d-renewal-discussions/ (31 Jul 2026) — already on the card; final terms still to be determined
  - https://www.besra.com/june-2026-quarterly-activities-report-appendix-5b-cash-flow-report/ — conditional offer accepted; finalisation subject to ongoing discussion
- Decision: Monitor. Follow-up: a Besra or official page that states the final mining-lease conditions.

### Baram Agrovoltaic Project

- Searches: `"Baram Agrovoltaic Project" project milestones`; Temala update 2026; delayed / cancelled / construction; official launch 2026
- Opened:
  - https://ukas.sarawak.gov.my/web/subpage/news_view/37208 (29 Mar 2026) — already on the card; RM6 billion Temala scope
  - https://www.sarawaktribune.com/baram-poised-for-economic-transformation-via-strategic-projects/ (18 Jun 2026) — proposed Baram Agrivoltaic Project in Temalak; Premier proposed an official launch this year; not an achieved launch
- Rejected / not used: 2025 Planet QEOS DeepTech HOA pages already treated as adjacent-programme context; RM2.32 billion and US$2.12 billion figures belong to partner packages, not a replacement for the UKAS RM6 billion card value
- Decision: Monitor. Follow-up: a page that names the Baram Agrovoltaic Project and states official launch, construction start, or a revised schedule.

### FR21 Jalan Serian-Tebedu-Indonesia Border Upgrade

- Searches: `"FR21" "Serian-Tebedu" project milestones`; Jalan Serian-Tebedu update 2026; tender award / construction
- Opened:
  - https://jkr.sarawak.gov.my/web/subpage/news_view/614 (2 Aug 2024) — already on the card; official 42 km scope
  - https://www.sarawaktribune.com/sarawak-roads-get-major-development-boost/ (28 Jun 2025) — older early-works / RM13 million wording
  - https://jkr.sarawak.gov.my/web/subpage/webpage_view/403 — opened tender-results listing; no FR21 construction award
- Rejected identity collisions: Tebedu ICQS rebuild; Kampung Semeru–Kuhom link road; Sg. Edak rural bridge
- Decision: Monitor. Q4 2026 preliminary-work / cost-finalisation remains open. Follow-up: consultancy award, cost finalisation, or construction start.

## Field-by-field claim matrix (accepted card)

| Field | Current value | Candidate claim | Source scope | Decision |
| --- | --- | --- | --- | --- |
| `value` | RM125 billion | RM151.5 billion approved investment | Programme / SCORE corridor | Accept; amount-only display; qualifier in summary |
| `milestones` | Thin; latest completed May 2025 | 1 Apr 2026 RM151.5B / 655 projects reported | Programme | Accept completed row; keep both open delivery rows |
| `status` | In Progress | Still In Progress | Latest achieved lifecycle | Retain |
| `lead` | RECODA | RECODA remains implementing / investment-facilitating agency | Programme | Retain |
| `summary` | More than RM125 billion cumulative investment | Approved investment RM151.5 billion across 655 projects | Programme | Accept restated wording |
| `sources` | Four live links | Add Tribune and Suara Sarawak | Reputable news of Deputy Premier speech | Accept |

## Editorial update-history decision

Add a 2026-04-01 SCORE entry. The revised approved-investment total is a material public development for the Updates page.

## False positives / collisions

- MADA / Kedah RM1 billion five-seasons paddy infrastructure is not the Sarawak programme.
- X-FAB RM3 billion fab expansion and the RM2 billion Semiconductor Roadmap 2030 target are not an SMD GaN project cost.
- Tebedu ICQS, Kampung Semeru–Kuhom, and Sg. Edak works are not FR21.
- Baram DeepTech / WEF TIC / RM2.32 billion partner-package figures are adjacent-programme context, not a replacement for the UKAS RM6 billion agrovoltaic card.
- PCDS tracker self-hits (`pcds2030.com`) are not evidence.
- Borneo Post bodies were Cloudflare-blocked in this environment and were not treated as opened evidence.

## Checks

- `npm run check:content`
- `npm run lint`
- `npm run build:preview`
- `git diff --check`

## SCORE card polish (Nazirul-approved, 2026-09-21)

Follow-up wording/structure polish only. No new research claims, no value/status/lead change, no other cards. Nazirul approved all three polishes in Maintainer Bot chat.

| # | Current (preview tip before polish) | Proposed | Effect |
| --- | --- | --- | --- |
| 1 | `2025-05-10` done: More than RM125B investment and 53,000 jobs reported | `2025-05-10` done: More than RM125B investment attracted and 53,000 jobs created | Align May 2025 wording with DayakDaily / RECODA (investment attracted / jobs created) |
| 2 | (absent) | `2026-04-01` done: 243 critical rural infrastructure projects worth RM4.5B underway (URDA, HDA, NRDA) | Add completed rural checkpoint after the Apr 2026 investment row. Evidence already on the card: Tribune 1 Apr 2026, DayakDaily 2 Apr 2026, Suara Sarawak. Do **not** mark the remaining URDA/HDA/NRDA completion row as done. |
| 3 | `TBD` open: Industrial parks expand and attract investment | `2030` open: Miri–Marudi–Mulu road (142 km) reaches completion | Replace the vague industrial-parks Next with the Tribune 1 Apr 2026 142 km / 2030 road target |

Final milestone order after polish:

1. `2025-05-10` done — More than RM125B investment attracted and 53,000 jobs created
2. `2026-04-01` done — RM151.5B approved investment and 655 projects reported
3. `2026-04-01` done — 243 critical rural infrastructure projects worth RM4.5B underway (URDA, HDA, NRDA)
4. `2030` open — Miri–Marudi–Mulu road (142 km) reaches completion
5. `TBD` open — URDA, HDA and NRDA complete rural infrastructure

Unchanged: `value` RM151.5 billion; `status` In Progress; `lead` RECODA; remaining rural-infrastructure outcome stays open. No new sources added.
