# Weekly milestone audit — 2026-11-16

- Audit run ID: `2026-11-16-weekly-milestone`
- Reviewer: Cursor Cloud Agent (`bc-f4194a19-b5b2-5d82-9e8d-e8532d0c529c`)
- Publication mode: `preview_merge`
- Scope: 3 Stage A accepts after independent Stage B URL reopen
- Branch: `cursor/weekly-milestone-2026-11-16-529c` based on `preview` @ `3063e04`

Search syntheses were discovery only. Stage B implemented only the reopened, accepted claims below.

## Stage B accepted field changes

| Card | Change | Key opened URLs |
| --- | --- | --- |
| Bintulu-Samalaju Gas Pipeline | Done: gas sales agreement signed with first Samalaju industrial customer (2026-11-11). Open: Samalaju Industrial Zone receives gas supply (2026) | Borneo Post 12 Nov 2026 |
| Community Social Support Centre (CSSC) Network | Open Bintulu centre begins operations revised 2026-Q4 → 2027-Q1 (TTG that also functions as CSSC). Additional centres stay TBD | Utusan Borneo 11 Nov; Borneo Post 12 Nov |
| Miri Port Kuala Baram Capital Dredging | Evidence enhancement: UKAS 10 Nov 2026 MPA end-2026 finish (weather-qualified). Open 2026-Q4 stays incomplete | UKAS 52864 |

## Held / Conflict (not applied)

| Card | Note |
| --- | --- |
| New Kuching International Airport | Conflict: Premier early-2027 physical works versus SAP airport construction 2030–2035 |
| Selangau Pig Farming Area | Conflict: card RM300 million versus Oct 2026 DUN RM200 million |
| Miri CCGT Power Plant | Conflict: card RM2 billion versus UKAS/DUN RM2.5 billion |
| PETRONAS Kasawari CCS | Conflict: 2027 injection versus 2028 storage; PDF-only sailaway |
| Sarawak-Sabah Link Road | Conflict: Phase 2 open 2030 on card versus 2029 news |

## Implementation

`LAST_UPDATED` set to `2026-11-16`. Bahasa Melayu milestone arrays matched English length and order. Update-history entries added for all three cards. `docs/data-methodology.md` current-value line, weekly pointer, and selected source-map notes updated.

## Checks

```
npm run check:content
npm run lint
npm run build:preview
git diff --check
```
