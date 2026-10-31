# Weekly milestone audit — 2026-10-26

- Audit run ID: `2026-10-26-weekly-milestone`
- Reviewer: Cursor Cloud Agent Stage B (`bc-2369cbf5-a5b3-5c3b-a9b2-726d98ce5435`)
- Publication mode: `preview_merge`
- Scope: 14 parent-verified accepts after independent URL reopen
- Branch: `cursor/weekly-milestone-2026-10-26-c735` based on `preview` @ `26c437f`

Search syntheses were discovery only. Stage B implemented only the reopened, parent-accepted claims below.

## Stage B accepted field changes

| Card | Change | Key opened URLs |
| --- | --- | --- |
| SMD Semiconductor — GaN Chip Development | Open Linyang keteq.GaN chip integration begins (2027) before commercialisation; keep Not disclosed; IP and commercialisation stay open | SMD Semiconductor integration page |
| RM1 Billion Paddy Infrastructure Programme | Done: 10 projects / 3,460 ha under implementation (2026-10-20); open phased completion begins (2027) before 2030 output; farmer clustering stays open | DayakDaily paddy schemes |
| Lubok Punggor AgriHub and Mid Sadong 1 Irrigation Project | Open completion date TBD → 2027; text unchanged | Same DayakDaily paddy schemes page |
| Selangau Pig Farming Area | Porker production date TBD → 2027; keep 2028 basic infra; value stays RM300 million | Borneo Post 20 Oct 2026 |
| Environment (Reduction of Greenhouse Gases Emission) Ordinance 2023 | Done: RM20 million RMK-13 GHGMS Phase 2 allocation (2026-10-12); open GHGMS Phase 2 reaches operations; annual reporting stays open | UKAS 50544 |
| Sarawak Cancer Centre | Done: DUS confirmed design-and-build tender still live (2026-10-20); open Construction begins → Surat Setuju Terima (SST) is issued (2027-Q1); keep RM1.52 billion and 2032 | DayakDaily SST / 2032 |
| Sarawak Infectious Disease Centre | Value RM300 million → RM320 million; done campus 90 percent (2026-08) before Q3 2027 launch | Borneo Post 19 Oct; DayakDaily |
| Coastal Road Network and Second Trunk Road (CSTR) | Open Batang Lupar 2 (2026-11), Batang Saribas 2 (2026-12), Rambungan Bridge (2026) before remaining nine; keep Sejingkat 2026-10-22 and Paloh 2026-10-30 open | UKAS 51425; existing Star for Rambungan |
| Kuching Low-Carbon Hub | Done task force (2026-10-21); physical works text notes early 2027 PPP; open Samajaya 2 ready for investors (2028); value stays Not disclosed | UKAS 51455; Suara Sarawak |
| Bintulu-Samalaju Gas Pipeline | Done pipeline 96 percent (2026-10-19) before open gas supply; source label describes pipeline claim on KLCH-titled page | DayakDaily DUN article |
| KUTS — Kuching Urban Transportation System | Done Phase 1 49 percent (2026-09) and Blue Line 88 percent (2026-10-19) after girder, before pilot; pilot Q4 2026 and commercial 2027 stay open | UKAS 51243; DayakDaily |
| New Kuching International Airport | Done ADR submitted 26 May 2026 before open federal approval; status stays Planning | Borneo Post; Utusan Borneo optional |
| Sarawak-Singapore Electricity Interconnection | Done submarine cable survey study under way (2026-10) after MPA, before remaining licences | The Edge Malaysia 822339 |
| Miri Combined Cycle Gas Turbine (CCGT) Power Plant | Open completion 2027 → 2027-Q4; value stays RM2 billion | The Edge Malaysia 822339 |

## Conflict / manual review (not applied as value changes)

| Card | Issue | Notes |
| --- | --- | --- |
| Selangau Pig Farming Area | RM300 million on card vs RM200 million on 20 Oct Borneo Post | Operations date accepted; value unchanged |
| Miri CCGT | RM2 billion on card vs RM2.5 billion on UKAS / related reporting | Q4 2027 date accepted; value unchanged |
| Kuching Low-Carbon Hub | DayakDaily RM300 billion investment headline | Not assigned as card value; stays Not disclosed |

## Stage B rejects after reopen

- GHG Ordinance: no January workshop milestone. Parent did not reopen that page.
- CSTR: no Sungai Limbang open row.
- Kuching Low-Carbon Hub: value not set to RM300 billion.

## Implementation

`LAST_UPDATED` set to `2026-10-26`. Bahasa Melayu milestone arrays matched English length and order. Update-history entries added for all 14 cards. `docs/data-methodology.md` current-value line, weekly pointer, and selected source-map notes updated.

## Checks

```
npm run check:content
npm run lint
npm run build:preview
git diff --check
```
