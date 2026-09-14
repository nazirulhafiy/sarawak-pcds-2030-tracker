# Weekly milestone audit — 2026-09-14

- Review date: 2026-09-14
- Reviewer: Cursor Agent CLI (`2026-09-14-weekly-milestone`), on behalf of the tracker owner
- Review type: weekly milestone automation (Stage A discovery + Stage B implement)
- Publication mode: `preview_merge`
- Inventory: `node scripts/audit-inventory.mjs .`
- Base tip at launch: `9a381bcb28e80bfd5afb7bb66b937713763d1aa6` on `preview`

## Scope table

| Project | Category | Status | Why selected |
| --- | --- | --- | --- |
| Piasau Nature Reserve Discovery Centre | Forestry | In Progress | Score 3; two milestones; one live source |
| Marudi Forest Conservation and Restoration Project | Forestry | In Progress | Score 3; thin milestones; unknown value; credit-issuance open |
| Sarawak River Aids to Navigation and Surveillance System | Transport | In Progress | Score 3; thin milestones; limited sources |
| Samalaju SME Cluster | Manufacturing | In Progress | Score 2; thin milestones |
| Kuching Low-Carbon Hub | Basic Infrastructure | Planning | Planning flag; provisional masterplan wording |
| Sarawak Climate Change Centre | Forestry | Planning | Planning flag; provisional standalone-operations wording |
| Sarawak-Singapore Electricity Interconnection | Utilities | In Progress | Score 2; unknown value; limited sources (batch expansion after thin yield on first six) |

Out of scope: all other live cards; Codex branches; `main`; V2 UI shell.

## Stage A outcomes

| Project | Outcome | Confidence | Notes |
| --- | --- | --- | --- |
| Piasau Nature Reserve Discovery Centre | No card change | High | Jan 2026 commencement / Aug 2027 completion remain latest opened claims |
| Marudi Forest Conservation and Restoration Project | Update recommended | High | Verra public-comment listing and Edge final-stages validation evidence |
| Sarawak River Aids to Navigation and Surveillance System | No card change | High | Sarawak River VTMS operational; Miri River still targeted 2027-Q3 |
| Samalaju SME Cluster | No card change | High | June 2026 launch already on card; no Phase 3 progress opened |
| Kuching Low-Carbon Hub | No card change | High | May/June 2026 pages restate masterplan finalisation and 2027 PPP works |
| Sarawak Climate Change Centre | Monitor | Medium | 3 Mar 2026 Tribune uses technical-support wording; no address, director, or centre-only budget |
| Sarawak-Singapore Electricity Interconnection | Update recommended | High | Cabinet, MKN, and MPA clearances plus commercial/technical commencement |

## Implemented cards

### 1. Sarawak-Singapore Electricity Interconnection

- Tracked unit: single cross-border interconnection (Sarawak Energy / Sembcorp Utilities consortium)
- Searches: `"Sarawak-Singapore Electricity Interconnection" project milestones`; `update 2026` / MKN / MPA terms; counter-search for delay or cancellation
- Opened and accepted:
  - https://www.thestar.com.my/news/nation/2026/05/18/sarawak-in-talks-to-export-power-to-borneo-singapore (18 May 2026) — MKN Dec 2025; MPA Feb 2026; commercial talks begun
  - https://dayakdaily.com/premier-sarawak-singapore-partnership-poised-to-become-asean-green-energy-model/ (18 May 2026) — 2032-2035 export window; NSC/MPA support
  - https://srb.sarawak.gov.my/web/subpage/news_view/903 (7 Jul 2026 / posted 15 Jul 2026) — Cabinet Feb 2024; EMA Oct 2025; MKN Dec 2025 for subsea survey; Sampadi landfall
  - Existing Sarawak Energy EMA release retained
- Rejected / not used as sole evidence: Borneo Post mirror (Cloudflare block); Touchdown Asia industry digest (secondary to Star/SRB)
- Field effect: milestones expanded; summary refreshed; sources added; status remains `In Progress`
- Update-history: added 2026-05-18 entry from The Star ministerial report

### 2. Marudi Forest Conservation and Restoration Project

- Tracked unit: SaraCarbon Marudi forest-carbon project (25,675 ha)
- Searches: mandatory milestone-first; Verra / validation / credits 2025-2026; counter-search for issuance
- Opened and accepted:
  - https://verra.org/projects-open-for-public-comment-january-6-2025/ (6 Jan 2025) — Marudi listed; comment closed 25 Jan 2025
  - https://theedgemalaysia.com/node/787365 (Edge Weekly 29 Dec 2025 – 4 Jan 2026) — final stages of validation; Blignaut quote; credits not yet issued
  - https://saracarbon.com/marudi/ — scope retained
  - https://foe-malaysia.org/articles/support-for-marudi-indigenous-communities-affected-by-forest-carbon-project/ (22 Feb 2025) — corroborates under-validation status; community conflict kept as research context only
- Rejected: credit issuance claims (none found); Verra SPA registry body (JS shell, not citable as opened claim text)
- Field effect: added completed Verra public-comment milestone; added open Verra-validation milestone ahead of credit issuance; sources added
- Update-history: **no Updates entry** — lifecycle backfill and pre-issuance validation progress, not a new reflected public development for the Updates feed

## Unchanged cards (brief)

- **Piasau:** Malay Mail 31 Jan 2026 restates Borneo Post 30 Jan 2026 claims already on the card.
- **Sarawak River VTMS:** DayakDaily 21 Feb 2025 is older intent language; Dec 2025 Borneo Post operational claim already on card; Miri open target not passed.
- **Samalaju SME Cluster:** Borneo Post 29 Jun 2026 launch mirror; no Phase 3 tender/award opened.
- **Kuching Low-Carbon Hub:** Star 8 Jun 2026 / Tribune masterplan pages match existing open milestones.
- **Sarawak Climate Change Centre:** keep `Planning`; follow-up trigger remains official address, director, opening, or centre-only budget.

## False positives / collisions

- LinkedIn “Operations Director” hits for Climate Change Centre are unrelated organisations.
- Miri Port VTMS PDF mentions are port-adjacent, not the SRB river VTMS card.
- Reddit / tracker self-hits ignored as evidence.

## Checks

- `npm run check:content`
- `npm run lint`
- `npm run build:preview`
- `git diff --check`
