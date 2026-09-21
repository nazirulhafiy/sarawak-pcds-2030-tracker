---
name: audit-pcds-2030-projects
description: >-
  Use when auditing PCDS 2030 tracker cards for values, milestones, status,
  leads, and live public sources, or when implementing those evidence-backed
  data changes. Opt-in only via / or @ — not every run.
disable-model-invocation: true
---

# Audit PCDS 2030 tracker cards

Opt-in skill. Run it only when Nazirul (or an explicit `/audit-pcds-2030-projects` / `@audit-pcds-2030-projects` invocation) asks for a card audit or for evidence-backed data changes from that audit. Do not load this workflow on ordinary coding, docs, or UI work.

Canonical evidence, identity, source-link, milestone, localisation, inclusion, and review-record rules live in [`docs/data-methodology.md`](../../../docs/data-methodology.md). This skill is an execution procedure. It does not replace, shorten, or weaken that methodology. If anything here appears to conflict, follow the methodology.

Also read, and use as working records:

- [`docs/project-research-template.md`](../../../docs/project-research-template.md)
- [`docs/data-review-checklist.md`](../../../docs/data-review-checklist.md)
- [`AGENTS.md`](../../../AGENTS.md)

## Execution surface

You are already in this repository. Do the work yourself.

- Run inventory, searches, source-page checks, edits, localisation, lint, content checks, and Preview build in this checkout.
- Do not ask a separate bot, sandbox clone, or human to perform those steps unless Nazirul explicitly redirects the work.
- Prefer the `preview` branch. Open a PR into `preview`. Never merge. Never promote to `main`. Never touch Codex branches.
- Do not edit DNS, Vercel, GitHub Pages, generated `dist/`, or PCDS source PDFs.
- Google AI Mode, AI Overviews, snippets, and search summaries are discovery-only. They are not evidence and must not be cited as live-card sources.

## Hard rules

- Do not redesign the site.
- Do not invent values, milestones, leads, status, or sources.
- Do not treat a PCDS PDF as the sole live-card evidence.
- Do not promote to `main` without an explicit yes after Preview review.
- Do not run this audit unprompted on every agent turn.
- Keep changes scoped to the named audit cards unless the invocation expands scope.
- When canonical English facts change, update the matching Bahasa Melayu entries in `src/localization.js` in the same change.
- Record an explicit update-history decision for every implemented card change.

## 1. Establish Scope

Confirm what this invocation covers before searching or editing.

1. Record the audit date (`YYYY-MM-DD`) and reviewer (this agent, on behalf of the tracker owner).
2. Classify the request:
   - named-card audit;
   - inventory-ranked batch;
   - status-filtered batch (`Planning`, `In Progress`, and so on);
   - monitor-trigger re-review;
   - excluded or deferred candidate re-review;
   - implement already-approved evidence-backed edits.
3. Name every in-scope card by canonical `name` from `src/trackerData.js`, plus category.
4. Name every out-of-scope card the user mentioned and leave those cards untouched.
5. Confirm whether this run is **audit-only** or **audit-and-implement**. Default to audit-only unless the user asked to apply evidence-backed data changes.
6. Confirm the tracked unit for each card before judging evidence: single asset, phase or package, combined card, shared system, programme, designation, or policy implementation.
7. Reuse prior dated audits in `docs/project-audits/` and the source map in `docs/data-methodology.md`. Do not re-research unchanged fields from scratch when a dated record already covers them; do re-check for newer public evidence.
8. Stop and report if identity is ambiguous (close names, umbrella programmes, adjacent projects). Do not guess the tracked unit.

Default batch size when the user does not name cards: the inventory’s top three live cards, unless the user asked for a different `--limit` or a full sweep.

## 2. Inventory

Rank live cards with the repo script. From the repository root:

```bash
node scripts/audit-inventory.mjs .
```

Useful variants:

```bash
node scripts/audit-inventory.mjs . --limit 3
node scripts/audit-inventory.mjs . --status Planning
node scripts/audit-inventory.mjs . --json
```

A mirrored copy lives at `.cursor/skills/audit-pcds-2030-projects/scripts/audit-inventory.mjs`. Prefer the repo-root command above. Keep both files identical if you change scoring.

The script scores **live, non-overview** projects. One point each:

| Flag | Meaning |
| --- | --- |
| unknown value | displayed `value` is `Not disclosed` |
| thin milestones | fewer than four milestones |
| limited sources | fewer than three live sources |
| no primary-like source | no source hostname matches the official host suffixes below |
| Planning | dashboard `status` is `Planning` |

Official host suffixes for primary-like scoring: `.gov.my`, `.sarawak.gov.my`, `sarawakenergy.com`, `petros.com.my`, `mysarawakmetro.com`, `recoda.com.my`, `bintuluport.com.my`, `besarawak.com`, `businesseventssarawak.com`, `unesco.org`, `besra.com`, `bioverde.com.my`, `ptkhn.com`, `samsungena.com`, `sbc.org.my`, `ysiss.edu.my`, `zecon.com.my`, `petronas.com`, `chitose-bio.com`.

Inventory score is a triage aid, not evidence. A high-scoring card still needs opened public pages. A low-scoring card can still be wrong. `Not applicable` is not an unknown value. Four to seven milestones is an editorial range only when public evidence supports those stages; do not invent stages to raise the count.

Read `audit/project-inclusion.json` for each in-scope active card. Inclusion provenance and live-card evidence answer different questions. Do not add, remove, or silently recategorise a card during a routine field audit.

## 3. Read the current card

For each in-scope project, capture the current dashboard state before searching:

- canonical `name`, optional `displayName`, category;
- `status`, `lead`, `value`, `summary`;
- full milestone list (`date`, `text`, `done`) and the first open milestone;
- live `sources` (`label`, `url`);
- Bahasa Melayu renderings in `src/localization.js`;
- any matching `src/updateHistory.js` entries;
- the active inclusion record;
- the latest dated audit notes for that identity.

Build an empty field-level evidence map for `status`, `summary`, `lead`, `value`, `milestones`, and `sources`. One page does not need to support every field.

## 4. Discover public sources

Use a search-first, source-verified workflow. Search syntheses are discovery tools.

For every in-scope live card, and for every triggered excluded or deferred candidate:

1. Mandatory first pass: `"[exact project name]" project milestones`. Review ordinary web results whether or not an AI Overview or AI Mode answer is available.
2. If AI Mode / AI Overview / a search summary is available, treat it as a citation finder only. Expand every citation group, including `+n`, `view related links`, `sites`, and equivalent controls. Capture the underlying URLs. Do not accept the generated wording.
3. Current-status pass: `"[exact project name]" update 2026` or `"[exact project name]" latest status 2026` (use the current year).
4. If results are weak, repeat with acronyms, aliases, former names, lead organisations, the current open milestone, and terms such as `completed`, `commissioned`, `delayed`, `revised`, `cancelled`, or `financial close`. Use an official-domain filter when a likely owner or ministry is known.
5. Search passed or near-term milestones separately. A target date passing is a review trigger, not proof of achievement.
6. Complete separate **value**, **lead / party-role**, and **counter-searches**. The milestone-first query does not replace field-specific checks.

Value-search exhaustion is mandatory before retaining `Not disclosed`. Rejecting one unsuitable amount does not finish the search. Cover English and BM terms (`kos`, `nilai projek`, `anggaran`, `peruntukan`, `pelaburan`, `juta`, `bilion`), aliases, location, phase, delivery body, likely official domains, and exact-number / quoted-phrase follow-ups.

Counter-search for newer completion, delay, suspension, cancellation, scope reduction, revised cost, ownership, or delivery evidence before accepting an older claim.

Record queries, candidate URLs, and false positives in the research template. Do not cite Google, AI Mode, or a snippet as a source.

## 5. Verify source pages

Open every candidate page before accepting a claim. For each page confirm:

- the publication date shown for the article, announcement, or disclosure, not a footer or last-modified stamp;
- exact project identity: name, location, phase or package, and delivery body;
- whether the wording says the outcome was achieved, commenced, approved, targeted, expected, proposed, delayed, reduced, or only discussed;
- whether the information is newer than the latest source already on the card;
- which displayed fields it could support;
- whether a monetary figure is total cost, estimate, allocation, investment, contract, financing, combined package, resource valuation, or economic impact;
- whether the visible passage names the exact project and directly supports a displayed field, even if the article’s main subject is broader;
- whether it adds unique evidence or only repeats a field already supported more directly.

Reject mere name-drops, inaccessible bodies, PDF-only live-card claims, generated currency conversions, and passages that do not support a displayed field.

Prefer a project owner, ministry, regulator, company disclosure, or other primary source. A reputable report may support an ordinary progress update. Require one strong primary source or two independent reputable reports before a consequential status change.

When an official project page presents milestone evidence only in a graphic, inspect the image and transcribe only clearly legible dates and outcomes.

## 6. Map claims to fields

Fill the field-by-field matrix from the research template. Classify each candidate claim as project-only, combined-card, shared-infrastructure, umbrella-programme, statewide or portfolio aggregate, or economic-impact evidence.

Apply the methodology without shortcuts:

- **Value:** amount-only display (`RM1.38 billion`, `USD130 million`). Put meaning, year, phase, and qualifiers in the summary or source label. Preserve `about`, `up to`, `over`, `between`, `allocated`, and `committed`. Do not assign a wider package figure to a narrower card. Use `Not disclosed` only after a completed exhaustion log. Use `Not applicable` only for non-capital policy or legislative entries.
- **Lead:** owner, principal developer, implementing agency, or operator most responsible for delivery. Do not promote a minister, announcing body, regulator, funder, contractor, or one-package partner unless the source assigns that responsibility.
- **Milestones:** one canonical `text`; compact sortable `date` where possible; `done: true` only when an accepted source states the event happened. Keep completed rows before the next open row. A non-completed capital project must retain an evidence-supported open delivery outcome. Do not invent missing lifecycle stages.
- **Status:** derive from the latest achieved lifecycle evidence and remaining delivery outcomes, not from an AI label or an isolated target date. `Planning`, `In Progress`, `Awaiting Decision`, `Operational`, `Designated`, and `Enacted` are the stored statuses.
- **Summary:** concise public introduction, not an audit note. Do not duplicate milestone chronology or missing-evidence caveats.
- **Sources:** public webpages only. Labels must describe the linked page and supported claim. Prefer the smallest set that collectively supports displayed fields, but do not remove the only public evidence for a milestone.

If sources conflict, keep the existing dashboard value and mark `Conflict / manual review`.

## 7. Decide

Record one outcome per card:

| Outcome | When to use |
| --- | --- |
| Update recommended | A verified source materially changes or clarifies a displayed field |
| Evidence enhancement | The displayed claim remains correct; a stronger public source should be added |
| Monitor | A milestone is approaching or has passed without public confirmation, or the result is still only a target |
| No card change | No newer project-specific information was verified |
| Conflict / manual review | Sources disagree, identities are ambiguous, or evidence is unsafe to apply |

Confidence: High / Medium / Low. Every exclusion, deferral, or monitor outcome needs an evidence gap and an observable follow-up trigger.

Do not implement `Conflict / manual review` or low-confidence identity calls.

## 8. Implement evidence-backed changes

Skip this section for audit-only runs.

Implement only accepted, high-or-medium-confidence field changes that the user asked to apply.

Files that may change in an implementation run:

- `src/trackerData.js` — canonical English facts;
- `src/localization.js` — explicit BM renderings of changed facts, summaries, and milestones;
- `src/updateHistory.js` — only for a meaningful reflected public development, or record why no entry is needed;
- `audit/project-inclusion.json` — only if identity, disposition, or inclusion basis actually changes;
- `docs/project-audits/YYYY-MM-DD-*.md` — dated research record;
- `docs/data-methodology.md` — only if a selected source map or dated-review pointer must stay accurate after the card change;
- `LAST_UPDATED` in `src/trackerData.js` when dashboard data changed.

Do not edit generated `dist/`. Do not add PDF URLs to live `sources`. Do not create a new live card unless the inclusion gate in the research template and `docs/data-methodology.md` passes, including an active register record.

After edits, complete the [data review checklist](../../../docs/data-review-checklist.md).

## 9. Check

From the repository root, on an implementation run:

```bash
npm run check:content
npm run lint
npm run build:preview
git diff --check
```

`npm run check:links` is report-only. HTTP failures, timeouts, and redirects are review triggers, not proof that a source should be removed, and they do not fail a release.

On an audit-only run, still run `node --check scripts/audit-inventory.mjs` if the inventory script changed, and do not leave a dirty tree of speculative data edits.

Push the focused branch and open or update a PR into `preview`. Stop. Do not merge. Do not promote to `main`. Do not touch Codex branches.

## 10. Report

Write a dated record using the project research template. For a multi-card batch, lead with a scope table, then one section per card.

The report must include:

- audit date, reviewer, review type, in-scope and out-of-scope names;
- inventory command and ranking used, if the batch came from the script;
- searches performed, including the mandatory milestone-first pass;
- candidate-source log with accept / reject / monitor reasons;
- field-by-field matrix and, where `Not disclosed` is retained, the value-exhaustion log;
- outcome, confidence, implemented effect or why the card was left unchanged;
- editorial update-history decision;
- follow-up date or observable trigger;
- false positives and name collisions.

Close the run with an explicit stop: Preview PR URL if implementation happened; no merge; no promotion.

If the user asked only for an audit, deliver the report and proposed diffs or recommendations without applying them until they say yes.
