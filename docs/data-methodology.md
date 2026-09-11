# Data Methodology

## Purpose

The PCDS 2030 Project Tracker is an independent, public, scan-first tracker for major Sarawak development projects connected to the Post COVID-19 Development Strategy 2030. It represents each project's current public status, next visible milestone, milestone history, reported lead parties, reported value, summary, and public evidence links.

The tracker should be read as a public-evidence monitor, not as an official project certification system. Statuses reflect what can be supported from available public sources in the repository and dashboard data.

## Data Location

Dashboard data is stored in `src/trackerData.js`.

The active dashboard imports:

- `LAST_UPDATED`
- `SECTORS`
- `ECONOMIC_SECTOR_IDS`

Tracker rendering, derived metrics, filters, status grouping, sorting, milestone progress, source rendering, and last-updated formatting are implemented in `src/App.jsx`.

`src/localization.js` is a presentation layer, not an independent evidence source. It stores
explicit Malaysian Bahasa Melayu renderings of current project facts, summaries, and milestones.
Project titles remain in English, while canonical names, URLs, date tokens, and completion flags
stay shared with `src/trackerData.js`. Source citation labels remain in their original language so linked
article and report titles are not misrepresented.

Additional repository source material:

- `audit/project-inclusion.json`: the enforced inclusion-provenance register for every audited
  non-overview card identity. It records whether a card is active or monitored, its inclusion tier,
  tracked unit, authoritative inclusion basis, live-evidence presence, manual component approval,
  and follow-up trigger. `npm run check:content` requires exact parity between active register
  records and active tracker cards.
- `audit/pcds-audit.json`: prior evidence-quality and trackability audit notes. This file is not rendered by the dashboard and some counts/status labels differ from current `src/trackerData.js`, so it should be treated as methodology context rather than active dashboard data.
- `docs/source-pdfs/*.pdf`: local PCDS framework and report material, including the main Post COVID-19 Development Strategy PDF, PCDS 2030 final report volumes, AIP economic-sector and enabler volumes, Sarawak Government PCDS 2030 highlights, Facts & Figures 2025, Sarawak innovative initiatives material, and the Sarawak 13th Malaysia Plan 2026-2030 executive summary. These PDFs are not automatically parsed by the app.
- `README.md`, `docs/product.md`, `docs/design.md`, and `docs/backlog.md`: project memory and maintenance guidance.

## Current Data Fields

Global fields:

- `LAST_UPDATED`: one manually maintained ISO date string for the tracker data freshness indicator. Current value: `2026-09-08`.
- `SECTORS`: the main data array. It contains PCDS economic sectors, enablers, and a framework overview entry.
- `ECONOMIC_SECTOR_IDS`: set used by the UI to label rows as `Sector`.
- `ENABLER_IDS`: set listing the PCDS enabler category ids. It is exported but not currently imported by `src/App.jsx`.

## Inclusion Provenance Standard

Every active card must have exactly one active record in `audit/project-inclusion.json`. Inclusion
and live-card evidence answer different questions: an authoritative PCDS or officially linked
strategy source establishes why the item belongs in this tracker, while accessible public webpages
support the facts displayed on the card.

Use these inclusion tiers:

- `direct`: the exact tracked unit is named in the core PCDS strategy, highlights, or AIP reports.
- `official_linked`: the exact unit is named in an official supplementary PCDS publication,
  Sustainability Vision 2030, or the Sarawak 13th Malaysia Plan as a continuation or delivery
  project aligned with PCDS.
- `component`: the exact card is a distinct, publicly trackable delivery component of a named PCDS
  programme or zone. This tier requires explicit manual approval with a date and rationale.
- `unconfirmed`: the project exists and may align with Sarawak policy, but the reviewed evidence
  does not establish an acceptable PCDS relationship. It must not appear as an active card.

An active card may use only `direct`, `official_linked`, or an approved `component` relationship.
An `unconfirmed` record stays in the monitored register with its evidence gap and an observable
re-review trigger. Future additions are paused until identity, scope, live evidence, and inclusion
provenance all pass the register and content checks.

Reported-value standard:

- `value` is reserved for the monetary figure only, using a compact display such as `RM1.38 billion`, `RM25-30 billion`, or `USD130 million`.
- Put the figure's meaning and qualifiers, such as estimated cost, allocation, investment, commitment, contract, phase, or source year, in the project summary and source label rather than the `value` field.
- Capacity, distance, site area, output, and network size belong in the summary or milestones, not the reported-value field.
- An older project-specific estimate may be retained when its source clearly attributes the amount and value type. Keep the displayed value amount-only, identify the estimate year and value type in the summary, check for a newer project-specific figure, and do not present the historical estimate as a current final cost.
- A derived aggregate may be displayed when one source provides a monetary estimate per equivalent unit and current evidence confirms the exact number of units within the tracked scope. Preserve any range, show the arithmetic and source years in the summary, and label the result as a derived estimate rather than an announced allocation, contract, or total.
- Use `Not disclosed` when no reliable public monetary figure is available.
- Use `Not applicable` only for non-capital policy or legislative entries where a project value is not meaningful.
- Keep `Not disclosed` as the internal evidence state, but omit the reported-value column from the public card until a monetary figure is verified. Adding a monetary value restores the column automatically.

AI-assisted discovery standard:

- Use Google AI Overviews, other search summaries, snippets, and semantic search results as discovery tools when available. They are not evidence and must not be cited as live-card sources.
- For every reviewed card, run separate searches for value, status, lifecycle milestones, and lead or party roles. Search exact names, aliases, locations, phases, delivery bodies, current-year terms, and likely official domains.
- Capture the links cited by an AI Overview or search summary, then open each underlying page and compare its visible wording with the generated claim before accepting it.
- Expand every available AI Overview or search-summary citation group, including links hidden behind `+n`, `view related links`, or equivalent controls. A visible first citation is not a complete citation review.
- Record when an AI-generated synthesis narrows, combines, converts, or otherwise changes the scope of the underlying source. Do not use generated currency conversions unless an accepted source publishes that conversion.
- Preserve monetary qualifiers exactly. `About` or `around` is an approximation, `up to` is a ceiling, `over` or `more than` is a lower bound, `between` is a range, and `allocated` is funding rather than total project cost. Do not strengthen or change these qualifiers when converting source wording into the amount-only display.
- Run a counter-search for newer completion, delay, suspension, cancellation, scope reduction, revised cost, ownership, or delivery evidence before accepting an older claim.

Value-search exhaustion standard:

- Rejecting one unsuitable amount does not establish that no project-specific value exists. Continue searching after excluding an aggregate, allocation, contract, adjacent-project amount, resource valuation, capacity figure, or economic-impact estimate.
- Before using `Not disclosed`, search the exact project name, aliases, location, phase, and delivery body with `value`, `cost`, `project cost`, `estimated cost`, `investment`, `allocation`, `contract`, `funding`, and `financing`.
- Repeat value searches using likely official domains and Malaysian terminology such as `kos`, `nilai projek`, `anggaran`, `peruntukan`, `pelaburan`, `juta`, and `bilion`.
- Follow up any discovered number with exact-number, currency, and quoted-phrase searches. Open every cited underlying page and search for a newer project-specific amount.
- Classify each monetary candidate as total project cost, preliminary estimate, investment commitment, government allocation, study or consultancy funding, contract value, financing package, combined-package value, resource valuation, or economic impact.
- Record candidate amounts chronologically with their date, scope, value type, exact source qualifier, and acceptance decision. Use `Not disclosed` only when that completed record contains no defensible amount for the tracked unit.

Card-scope and aggregation standard:

- Define the card's tracked unit before evaluating evidence: a single asset, phase or package, combined project card, shared enabling system, programme, designation, or policy implementation.
- Classify each candidate claim as project-only, combined-card, shared-infrastructure, umbrella-programme, statewide or portfolio aggregate, or economic-impact evidence.
- A combined or historical figure may be displayed when the card genuinely represents that combined scope, the source names the included components, and the summary explains the scope, date, value type, and absence of any project-level split.
- Do not assign a wider programme, adjacent project, statewide portfolio, economic-impact, capacity, distance, or land-area figure to a narrower card merely because the named project appears in the same article.
- When evidence spans a broader package than the current card, either keep the value undisclosed or explicitly revise and document the card scope. Never silently present a package aggregate as a standalone project cost.

Lead-and-party standard:

- Search and record roles separately: owner, lead developer, implementing agency, operator, contractor, investor or financier, regulator, technology provider, and development partner.
- The `lead` field should identify the owner, principal developer, implementing agency, or operator most responsible for delivery. Other evidenced roles may appear in the summary or sources.
- Do not promote a minister, announcing body, regulator, funder, contractor, or one-package partner to project lead unless the source explicitly assigns that responsibility.
- When sources use broad terms such as partner or stakeholder, preserve the narrower wording instead of inferring ownership, operation, or delivery control.

Public-source-link standard:

- Live project cards should link to official agency or project-owner pages, parliamentary or government releases, company disclosures, or reputable public news reports.
- PCDS strategy and report PDFs may confirm project inclusion, naming, scope, and historical context during research, but PDF-only claims should not be added to live project cards.
- Each public card claim should remain independently verifiable through a visible public webpage that identifies the exact project and directly supports the displayed field. PDF references may instead be recorded in methodology, audit, or research documentation.
- A live source may be a dedicated project page or a broader official speech, release, budget report, or reputable news article containing a clear, attributable project-specific claim. The article's main subject does not disqualify a source when the passage itself names the exact project and directly establishes a value, milestone, status, party, or timeline.
- A concise list item or passage can qualify when it contains a specific evidence-bearing fact such as an allocation, contract, date, achieved event, or stated target. Mere name-drops, comparisons, repeated context, inaccessible bodies, and passages that support no displayed field remain research context only.
- Source labels must describe the linked page and supported claim accurately. A label must not make a broader article appear to be a dedicated project report.
- Evaluate claims within a source independently. A page may support one displayed field while another claim, such as an older target schedule, has been superseded by newer official evidence.
- When an official project page presents milestone evidence only in a graphic or image asset, inspect the image directly and transcribe only clearly legible dates and outcomes. Record omitted minor stages in the audit document when the public card uses a shorter lifecycle.
- Not every qualifying mention needs to be retained. Prefer the smallest set of sources that collectively supports the displayed fields, but do not remove the only public evidence for a milestone merely because the article has a broader subject.
- If no public project-specific source can be found, keep the card explicitly provisional and avoid unsupported values, completion claims, or detailed schedules.
- `POPULATED_ECONOMIC` and `POPULATED_ENABLERS`: exported sets that identify categories with projects. They are not currently used by the dashboard UI.

Field-verification standard:

- Build a field-level evidence map for `status`, `summary`, `lead`, `value`, `milestones`, and `sources`; one page does not need to support every field.
- Verify milestones across the full public lifecycle: approval or agreement, study or design, procurement or contract, construction or implementation, commissioning, service or production commencement, and completion.
- Treat targeted, planned, expected, proposed, discussed, or scheduled events as open. Mark a milestone complete only when an accepted source states that the event happened.
- Derive status from the latest achieved lifecycle evidence and remaining delivery outcomes, not from an AI-generated status label or an isolated target date.
- When newer evidence supersedes an older cost, party, schedule, or scope, keep the older claim only as clearly labelled historical context.

Category fields inside `SECTORS`:

- `id`: stable category identifier.
- `name`: displayed category name.
- `icon`: category icon stored in data, not currently rendered by `src/App.jsx`.
- `color`: category accent color used for card accents, milestone indicators, source badges, and related UI accents.
- `projects`: project records under that category.
- `isOverview`: marks the PCDS framework overview entry. The active project grid excludes overview rows.

Project fields:

- `name`: canonical project name used for stable project identity.
- `displayName`: optional shorter public title. Use it when an organisation prefix, acronym-first construction, or descriptive suffix makes the canonical name harder to scan.
- `status`: detailed source-data status such as `Planning`, `In Progress`, `Awaiting Decision`, `Operational`, `Designated`, or `Enacted`.
- `statusColor`: stored in data but the current UI mainly uses category accent color for badges.
- `lead`: lead party or parties shown in the card facts.
- `value`: reported monetary value, or `Not disclosed` / `Not applicable` when a monetary value is unavailable or not meaningful.
- `summary`: prose summary of the project and current public context.
- `milestones`: manually defined project milestone list.
- `sources`: manually defined project-level evidence links.

Milestone fields:

- `date`: display date, phase, target, or placeholder such as `TBD` or `Before 2031`.
- `text`: canonical milestone statement rendered in both collapsed and expanded card states.
- `done`: boolean used to count completed milestones, draw progress indicators, split completed and remaining milestones, and select the next open milestone.

Milestone date display standard:

- Keep source values compact and sortable where possible: `YYYY-MM-DD`, `YYYY-MM`, `YYYY-Q#`, or `YYYY`.
- Use `TBD` when no reliable date has been published or continuous work has no single completion date; the UI omits the date label.
- Use `Achieved` for a completed milestone whose date has never been published. `TBD` is not available on a completed milestone, and a year or month label would assert a date that no source states. The UI renders it as `Achieved` in English and `Dicapai` in BM.
- Reserve `Ongoing` for the public project-status label rather than displaying it as a milestone date.
- The UI formats full dates, month targets, quarter targets, ranges, and open-ended years consistently rather than exposing the compact source syntax directly.

Legacy `shortText` aliases have been removed. Milestones now use one canonical `text` value in every card state.

Source fields:

- `label`: displayed source label. Labels usually include publisher and sometimes an encoded publication month/year.
- `url`: source URL rendered as an external link.

No per-project `lastReviewed`, per-source publication date, source type, confidence score, or field-level evidence mapping exists in the active data file.

When canonical project facts change, update the corresponding explicit BM entry in
`src/localization.js` in the same change. A missing localization must fall back safely to the
English source rather than alter or invent a claim.

## Source Types

The current data uses these source types:

- Official statements and official bodies: for example Sarawak Government source PDFs and UNESCO listing pages.
- Government websites: for example `sarawak.gov.my`.
- Agency/ministry pages: for example RECODA's official site and Business Events Sarawak's PCDS page.
- Company announcements and project pages: for example Zecon's Kota Petra Green Technology Park page and Sarawak Energy project announcements.
- News reports: especially DayakDaily and The Edge Malaysia.
- Industry media: Data Center Dynamics.
- Other public sources: FULCRUM policy analysis pieces.

The active data stores only `label` and `url`, so source type and publisher must be inferred from labels/domains unless a future data field is added.

## Evidence Rules

Explicit rules found in the repository:

- Data is manually curated from public reports and announcements.
- Project claims should be tied to visible source links.
- Milestone statuses are best-effort based on available information.
- Data freshness is manual and represented by `LAST_UPDATED`.
- Source links are not automatically checked.

Rules to use for future maintenance:

- Official sources are highest confidence.
- Reputable news sources can support public reporting.
- Conflicting sources require manual review.
- No update should be made without a source.
- Statuses reflect available public evidence, not official project certification.
- When a source supports only general context, do not treat it as proof of a specific milestone unless the source directly supports that milestone.
- Use PCDS PDFs as confirmation and research references rather than as the sole live-card evidence. If a potentially useful PDF fact has no supporting public webpage, leave the corresponding card field unchanged.
- When a milestone is future-dated or target-based, leave `done: false` until a source confirms completion.
- When sources disagree on cost, date, scope, or completion, keep the existing value until manually reviewed and note the conflict before changing dashboard data.

## Project Update Search and Verification

Use a search-first, source-verified workflow for recurring project reviews. Google Search and its AI Overview are useful discovery tools because they can surface aliases, recent reporting, and related official pages that an exact-name search misses. They are not evidence by themselves. Every dashboard claim must still be checked against the underlying public page.

### Search sequence

For each project and each excluded or deferred candidate in the audit scope:

1. Start with the exact public project name plus `project milestones`, for example `"Project name" project milestones`. This is the mandatory first discovery pass because it can surface a lifecycle chronology, recent reporting, official project pages, aliases, and cited source groups in one result set.
2. Review both the AI Overview or equivalent synthesis, when available, and the ordinary web results. An unavailable, incomplete, or unhelpful AI response does not end the search; the standard results may still expose stronger or newer sources.
3. Expand every visible citation group, including `+n`, `view related links`, `sites`, and equivalent controls. Capture the underlying candidate URLs, then open and verify the visible source pages before accepting any claim.
4. Run a current-status query using the exact public project name and current year, for example `"Project name" update 2026` or `"Project name" latest status 2026`.
5. If results remain weak or the discovered chronology has gaps, repeat the search with:
   - the recognised acronym, alternate spelling, former name, or lead organisation;
   - the project name plus its current open milestone;
   - the project name plus terms such as `completed`, `commissioned`, `delayed`, `revised`, `cancelled`, or `financial close`;
   - an official-domain filter when a likely project owner or ministry is known.
6. Search passed or near-term milestones separately. A target date passing is a review trigger, not proof that the milestone was achieved.
7. Complete the separate value, lead or party-role, and counter-searches required by the reported-value, lead-and-party, and field-verification standards. The milestone-first query accelerates discovery but does not replace field-specific evidence checks.

Use AI Overview statements, search snippets, and news-result groupings only to identify candidate links. Personalised ranking and generated wording are not evidence. Acceptance depends on the opened public source page, not its search position or summary.

### Source-page checks

For every candidate page, confirm:

- the publication date shown for the article, announcement, or disclosure, rather than a website footer or page-modification date;
- the exact project identity, including location, phase, package, and delivery body;
- whether the source says an outcome was achieved, commenced, approved, targeted, expected, proposed, delayed, reduced, or merely discussed;
- whether the information is newer than the latest source already on the card;
- which fields are affected: `status`, `summary`, `lead`, `value`, `milestones`, or `sources`;
- whether a monetary figure is a contract award, allocation, estimate, investment, or total project cost.
- whether the visible passage names the exact project and directly supports a displayed field, even when the article's primary subject is broader;
- whether the source adds unique evidence or only repeats a field already supported more directly elsewhere.

Prefer a project owner, ministry, regulator, company disclosure, or other primary source. A reputable report may support an ordinary progress update. Require one strong primary source or two independent reputable reports before making a consequential status change.

### Review outcomes

Record one outcome for every project:

- `Update recommended`: a verified source materially changes or clarifies a displayed field.
- `Evidence enhancement`: the displayed claim remains correct, but a stronger public source should be added.
- `Monitor`: a milestone is approaching or has passed without public confirmation, or the available result is still only a target.
- `No card change`: no newer project-specific information was verified.
- `Conflict / manual review`: sources disagree, project identities are ambiguous, or the evidence is insufficient for a safe change.

For each audit, record the audit date, query variants, candidate and accepted URLs, source publication dates, affected fields, decision, and confidence. Also record false positives and name collisions so later reviews do not repeat them.

### Review cadence

- Run a lightweight search on a card when its next milestone date passes.
- Run a full dashboard sweep at least quarterly.
- Run an event-driven check after major budgets, legislative sittings, project-owner announcements, or reported status changes.
- Re-review a previously excluded or deferred candidate when its recorded target date passes, a new official project page appears, a material announcement or reported status change occurs, or its recorded follow-up date arrives.
- Every exclusion or deferral must record the review date, evidence gap, follow-up date or observable trigger, and the exact identity or alias to search. `Do not add` is a dated evidence decision, not a permanent classification.
- Include triggered excluded and deferred candidates in the same milestone-first discovery pass used for live cards. A full candidate-pool audit should begin with this pass before deciding which candidates require deeper source verification.
- Compare each sweep with the previous dated audit so unchanged cards do not need to be researched from scratch.

Latest full milestone review:
`docs/project-audits/2026-08-20-full-milestone-update-sweep.md`.

Focused six-card live audit (27 August 2026):
`docs/project-audits/2026-08-27-six-card-live-audit.md`.
A 2 September 2026 monitor-trigger re-review of SIDC, OSEIC Miri, CSSC Bintulu, and KUTS is appended to that file. All four remained watch-only.

Latest PDF-derived candidate leftover (30 August 2026):
`docs/project-audits/2026-08-30-pdf-candidate-batch.md`.

Parked 13MP / zone candidate-pool re-review (1 September 2026):
`docs/project-audits/2026-09-01-13mp-zone-candidate-pool.md`. Three live cards were added (SAIC, Sarawak Climate Change Centre, Kuching Low-Carbon Hub). The Baram Renewable Energy Economic Zone remains umbrella context for the Baram Agrovoltaic Project.

Weekly milestone audit (7 September 2026):
`docs/project-audits/2026-09-07-weekly-milestone.md`. Six Planning / In Progress cards were reviewed. Only the Miri Combined Cycle Gas Turbine (CCGT) Power Plant received a page-backed field change: the M701F gas-turbine installation.

## Project Summary Writing Standard

- Write each summary as a concise introduction to what the project is, where it is, its defining scope or capacity, its purpose, and why it matters. Two short sentences are usually enough.
- Include a monetary figure when it materially helps the reader understand the project's scale, funding, or delivery scope. State the number naturally rather than using editorial phrases such as `the reported value is`.
- Preserve the accepted value type and qualifier in the prose, such as `estimated cost`, `allocation`, `investment`, `commitment`, `contract`, `derived estimate`, or `historical combined package`. A historical, derived, phase-specific, or combined figure must remain clearly scoped without turning the summary into an audit note.
- Include a lead party or partner only when it helps define the project. Do not use the summary to reproduce every delivery role already represented by the lead field or sources.
- Do not duplicate milestone chronology, progress percentages, target dates, completion claims, audit caveats, missing-evidence notes, or review history. Keep those details in milestones, sources, the source map, or audit documentation.
- Use only facts already supported for the card's exact tracked scope. A concise introduction must not strengthen an estimate, allocation, package value, or relationship beyond its accepted evidence.

## Milestone Writing Standard

- Use one canonical `text` value everywhere. Collapsed and expanded cards must not use different wording for the same milestone.
- Follow the format `Date: clear action or outcome`; the UI supplies the date from the milestone's `date` field.
- Keep the milestone to one clause, normally 6 to 12 words and about 70 characters or fewer after the date.
- Use sentence case without a terminal period.
- Do not repeat the project name when the card title already provides the context.
- Avoid `Target:` prefixes, slash-separated alternatives, vague `rollout` wording, and internal research tasks such as confirming a project's status.
- Write completed milestones with a definitive past-tense outcome, such as `Construction officially began` or `Contract awarded`.
- Write future milestones as concise, public-facing outcomes and keep `done: false` until completion is confirmed. Prefer a concrete subject followed by an observable outcome, such as `Logistics hub enters operation`, over internal task wording such as `Develop logistics hub` or repetitive abstract wording such as `Completion of logistics hub`. Use an operating, commissioning, or completion outcome only when that stage is supported by the available evidence. Do not add `planned` when the milestone date and open state already communicate that the outcome is prospective.
- Do not phrase an open milestone as though it has already happened. Avoid terminal past-participle wording such as `approval obtained`, `capacity added`, or `centre completed`. Use an active present-tense outcome such as `Federal authorities approve the request`, `capacity increases by 120MW`, or `centre reaches completion`. A pending event may use a concise noun phrase when that is clearer, such as `Announcement of updated project plan`.
- Distinguish construction completion, commissioning, operations commencement, and commercial operation. These terms describe different project stages and must not be used interchangeably.
- Keep completed milestones before the next open milestone in each project's array. The card's segmented progress indicator follows this order, so an open milestone placed before a completed milestone creates a misleading broken sequence.
- A non-completed capital project should continue to an evidence-supported delivery outcome such as construction completion, commissioning, service commencement, commercial operation, or first production. An intermediate announcement, approval, or design stage must not make the card appear fully complete. Do not invent missing lifecycle stages when public evidence does not identify them.
- For an active capital project, fewer than four milestones is a trigger for a deeper lifecycle search across approval, design, procurement, construction, commissioning, and operations. Four to seven milestones is a useful editorial range only when those stages are supported by public evidence. It is not a publication quota: a card may remain below four when the available sources do not support more distinct stages, and no standard stage may be invented merely to increase the count.
- `npm run check:content` enforces the structural portion of this standard: non-completed cards retain an open milestone, completed milestones cannot use `TBD`, open milestones cannot end in selected completed-event wording, reported values must be amount-only monetary figures or use the approved unknown-value labels, public sources cannot be PDF links, and English and BM milestone counts must match.

## Selected Project Source Map

This map records the earlier source-audit set. The 10 provisional additions revalidated on 10 July 2026 are summarized separately below, with full field-level rationale in `docs/manual-review-project-addition-plan.md`.

### SMD Semiconductor - GaN Chip Development

- Current dashboard status: `In Progress`
- Current next milestone: Global IP registration and commercialisation
- Sources currently used:
- [DayakDaily - SMD Advanced Chip Integration Centre (Sep 2025)](https://dayakdaily.com/sarawak-to-establish-smd-advanced-chip-integration-centre-to-power-semiconductor-leap/) - Publisher: DayakDaily; type: news report; date: Sep 2025; appears to support the SMD centre/chip-development context.
- [DayakDaily - keteq.GaN and AI converter unveiled (Oct 2025)](https://dayakdaily.com/smd-semiconductor-unveils-keteq-gan-ai-convertor-in-london-cementing-sarawak-as-tech-leader/) - Publisher: DayakDaily; type: news report; date: Oct 2025; appears to support platform/product unveiling claims.
- [DayakDaily - Keteq AI chip secures global IP rights (Oct 2025)](https://dayakdaily.com/sarawak-designed-keteq-ai-chip-set-to-secure-global-ip-rights-by-early-2026/) - Publisher: DayakDaily; type: news report; date: Oct 2025; appears to support the IP-rights/commercialisation pathway.
- [SMD Semiconductor - Linyang integration and commercialisation MoA (Aug 2026)](https://smdsemiconductor.com/smd-linyang-partner-to-bring-sarawak-semiconductor-technologies-to-global-markets) - Publisher: SMD Semiconductor; type: project-owner announcement; date: 13 Aug 2026; directly supports the signed MoA and its technical evaluation, integration, qualification, and commercialisation scope.
- Decision: the Linyang MoA is a completed agreement milestone. It does not confirm global IP registration or the start of commercial production, so both delivery outcomes remain open.
- Gaps or uncertainty: the timing of global IP registration and actual commercialisation remains unconfirmed.

### Rambungan Sustainable Shrimp Aquaculture Project

- Current dashboard status: `In Progress`
- Current next milestone: 94 new shrimp-farming ponds are constructed
- [State Farmers' Organisation Sarawak - Nursery tank construction tender (May 2026)](https://peladangsarawak.com.my/2026/05/07/kenyataan-tender-terbuka-kerja-pembinaan-sistem-tangki-asuhan-udang-di-bawah-projek-penternakan-udang-di-zon-industri-akuakultur-rambungan-loba-stoh-lundu-sarawak-tender-no-ppns-kpkm-shrimp-202/) - Publisher: State Farmers' Organisation Sarawak; type: official implementing-body tender notice; date: 7 May 2026; directly supports publication of the tender for the shrimp nursery tank system.
- Decision: the tender publication is a completed procurement milestone. It does not confirm construction completion or delivery of the planned 94 ponds, so the 94-pond outcome remains open.
- Editorial update-history decision: no entry. The tender improves the card's evidence and chronology but is not used as a current headline development.

### RM1 Billion Paddy Infrastructure Programme

- Current dashboard status: `In Progress`
- Current next milestone: Farmer clustering and paddy land leasing
- Sources currently used:
- [Office of the Premier / UKAS - Stumbin-Bijat paddy allocation (Sep 2025)](https://premierdept.sarawak.gov.my/web/subpage/news_view/24582/UKAS) - Publisher: Office of the Premier / UKAS; type: official government release; date: Sep 2025; directly supports the RM1 billion allocation and project scope.
- [DayakDaily - RM1B allocation (Jun 2024)](https://dayakdaily.com/sarawak-allocates-rm1-bln-for-large-scale-paddy-cultivation-to-boost-rice-self-sufficiency/) - Publisher: DayakDaily; type: news report; date: Jun 2024; appears to support allocation, value, and paddy infrastructure scope.
- [DayakDaily - Minister warns against misuse (Feb 2026)](https://dayakdaily.com/rm1-bln-in-infra-at-stake-minister-warns-against-misuse-of-paddy-facilities-for-oil-palm/) - Publisher: DayakDaily; type: news report; date: Feb 2026; appears to support implementation guardrails and paddy-only use.
- [DayakDaily - 500K tonnes rice target (Aug 2025)](https://dayakdaily.com/sarawak-ups-rice-output-target-to-500000-tonnes-by-2030-in-premiers-bold-food-security-push/) - Publisher: DayakDaily; type: news report; date: Aug 2025; appears to support the 2030 output target.
- [DayakDaily - Overtake Kedah as rice bowl (Aug 2025)](https://dayakdaily.com/sarawak-to-overtake-kedah-as-nations-rice-bowl-by-2030-eyes-global-export-future/) - Publisher: DayakDaily; type: news report; date: Aug 2025; appears to support broader rice-self-sufficiency/export framing.
- Gaps or uncertainty: the official allocation source does not confirm newer physical infrastructure progress; delivery remains weakly evidenced.

### Sarawak Delta Geopark - UNESCO Global Geopark Designation

- Current dashboard status: `Designated`
- Current next milestone: none; the designation milestones are complete
- Sources currently used:
- [DayakDaily - UNESCO approval (Apr 2026)](https://dayakdaily.com/sarawak-delta-geopark-gets-unesco-approval/) - Publisher: DayakDaily; type: news report; date: Apr 2026; appears to support UNESCO approval/designation.
- [DayakDaily - Borneo's Cradle of Origin (Apr 2026)](https://dayakdaily.com/borneos-cradle-of-origin-puts-sarawak-delta-geopark-on-world-map-with-unesco-recognition/) - Publisher: DayakDaily; type: news report; date: Apr 2026; appears to support branding and designation context.
- Gaps or uncertainty: no direct UNESCO page is encoded for the geopark. The card is scoped to the completed designation effort rather than open-ended tourism and community programmes.

### The Archaeological Heritage of Niah National Park’s Caves Complex

- Current dashboard status: `Designated`
- Current next milestone: none; UNESCO inscription is the tracked final outcome
- Sources currently used:
- [UNESCO - Niah World Heritage listing](https://whc.unesco.org/en/list/1014) - Publisher: UNESCO; type: official international body; date: not encoded in label; appears to support inscription/designation and heritage-site facts.
- Identity decision: the canonical name follows UNESCO's official listed-property title. The shorter public display name is `Niah Caves Archaeological Heritage Site`. UNESCO identifies Sarawak Forestry Corporation and the Sarawak Museum Department as the main responsible government institutions.

### Greenhouse Gas Emission Ordinance 2023

- Canonical legislation name: `Environment (Reduction of Greenhouse Gases Emission) Ordinance 2023`
- Current dashboard status: `In Progress`
- Current next milestone: scheduled sectors submit verified emissions reports annually
- Sources currently used:
- [NREB - GHG-MS Phase 1 commenced operations (Feb 2026)](https://www.nreb.gov.my/web/subpage/announcement_view/196) - Publisher: Natural Resources and Environment Board Sarawak; type: official regulator announcement; date: 10 Feb 2026; directly supports the Phase 1 commencement milestone and mandatory system use.
- [Borneo Post - Climate governance implementation update (Mar 2026)](https://www.theborneopost.com/2026/03/12/sarawak-intensifies-climate-governance-on-path-to-net-zero-2050/) - Publisher: Borneo Post; type: news report quoting NREB; date: 12 Mar 2026; supports annual reporting requirements, accredited external-auditor rules, and the integrated Greenhouse Gas Management System.
- [FULCRUM - Sarawak's low-carbon future](https://fulcrum.sg/envisioning-a-low-carbon-future-sarawaks-journey-towards-sustainable-development/) - Publisher: FULCRUM; type: policy analysis/public source; date: not encoded in active source label; appears to support the ordinance, carbon-market context, and low-carbon policy framing.
- Gaps or uncertainty: no official ordinance or gazette source is encoded in active dashboard data; future annual compliance remains an open recurring milestone.

### Sarawak Cancer Centre

- Current dashboard status: `In Progress`
- Current next milestone: Construction begins in Q1 2027
- Sources currently used:
- [DayakDaily - RM1.52B preliminary estimate (Dec 2025)](https://dayakdaily.com/sarawak-cancer-centre-construction-to-start-by-2026-with-rm1-52-bln-preliminary-estimate-cost/) - Publisher: DayakDaily; type: news report; date: Dec 2025; appears to support reported value and construction timeline.
- [DayakDaily - PM tells JKR to expedite (Dec 2025)](https://dayakdaily.com/pm-tells-jkr-to-expedite-swak-cancer-centre-project-to-be-tendered-in-q1-2026-operational-before-2031/) - Publisher: DayakDaily; type: news report; date: Dec 2025; appears to support lead/delivery agency, Q1 2026 tender direction, and before-2031 operational target.
- [DayakDaily - RM500M medical equipment fronted (Dec 2025)](https://dayakdaily.com/patients-cannot-wait-sarawak-fronts-rm500-mln-for-cancer-centre-medical-equipment/) - Publisher: DayakDaily; type: news report; date: Dec 2025; appears to support equipment funding/fronting claim.
- July 2026 update: DayakDaily reported that the project entered design-and-build procurement on 7 July 2026, with construction targeted for January 2027 and completion by 2032.
- Gaps or uncertainty: no official JKR tender award page or health ministry project page is encoded; the contractor award and construction start still need later confirmation.

### FutureData - Kuching Data Centre Park (monitored, not active)

- Current disposition: `monitored_unconfirmed`; removed from the active dashboard on 17 August
  2026 because the reviewed sources establish a Sarawak Digital Economy Blueprint connection but
  do not name the exact project as part of PCDS 2030.
- Sources currently used:
- [TSG Group - First 17MW FutureData off-taker (Oct 2024)](https://tsggroup.my/2024/10/09/sarawaks-futuredata-welcomes-1st-offtaker-a-17mw-data-center/) - Publisher: TSG Group; type: project-developer announcement; date: 9 Oct 2024. It supports the June 2023 park announcement, Global Telecommunications as first off-taker, above-USD130-million investment for the first 17MW facility, the then-future Q2 2025 construction target, and the 2026 online target.
- [InvestSarawak - FutureData first off-taker and schedule (Oct 2024)](https://investsarawak.gov.my/global-telecommunications-first-off-taker-for-kuchings-futuredata-park/) - Publisher: InvestSarawak; type: official investment-promotion portal; date: Oct 2024. It independently repeats the project-specific value, capacity, construction target, and online target.
- [DCD - FutureData first off-taker (2025)](https://www.datacenterdynamics.com/en/news/futuredata-announces-first-off-taker-at-500mw-malaysian-data-center-park-in-sarawak/) - Publisher: Data Center Dynamics; type: industry media; date: 2025; supports the off-taker, 500MW park, and first 17MW facility context.
- Gaps or uncertainty: the 1 September 2026 re-review found the same inclusion hold. Opened
  InvestSarawak wording still cites the Digital Economy Blueprint 2030, not PCDS 2030. No opened
  TSG or InvestSarawak page confirms construction after the Q2 2025 target. Re-review when a PCDS,
  13MP, Sarawak Government, InvestSarawak, or delivery-owner publication makes the PCDS connection.

### SCORE - Sarawak Corridor of Renewable Energy

- Current dashboard status: `In Progress`
- Current next milestone: Industrial parks expand and attract investment
- Sources currently used:
- [DayakDaily - SCORE: RM125B investment, 53K jobs (May 2025)](https://dayakdaily.com/score-fuels-sarawaks-economic-growth-with-rm125-bln-investment-53000-jobs-created/) - Publisher: DayakDaily; type: news report; date: 10 May 2025; supports investments surpassing RM125 billion, more than 53,000 jobs, Samalaju industrial-park growth, and RM4.5 billion for 247 rural infrastructure projects through HDA, NRDA and URDA.
- [RECODA - PBM Miri 2025 SCORE update (Jul 2025)](https://recoda.gov.my/pbm-miri-2025-transforming-sarawak-through-score/) - Publisher: RECODA; type: official agency page; date: 15 Jul 2025; repeats more than RM125 billion and over 53,000 jobs, and says 247 infrastructure projects are currently underway through HDA, NRDA and URDA.
- [DayakDaily - RECODA implementing 243 rural infrastructure projects (Apr 2026)](https://dayakdaily.com/243-critical-projects-worth-rm4-5-bln-to-boost-infrastructure-devt-rural-connectivity-across-sarawak/) - Publisher: DayakDaily; type: news report of a TVS account; date: 2 Apr 2026; supports continuing URDA, HDA and NRDA implementation of 243 funded rural projects. It does not mark those projects complete.
- [RECODA official site](https://recoda.gov.my/) - Publisher: RECODA; type: official agency site; date: not encoded in label; supports lead/agency context and corridor identity.
- Gaps or uncertainty: SCORE is an umbrella programme. Opened pages do not give a dated industrial-park or rural-package completion event. A 1–2 April 2026 Rindok Raya claim of RM151.5 billion approved investment and 60,000 potential jobs was opened on Jiwa Bakti but omitted from DayakDaily’s same-event report, so the displayed value stays RM125 billion pending a second opened reputable or official page.

### KUTS - Kuching Urban Transportation System

- Current dashboard status: `In Progress`
- Current next milestone: ART pilot service begins
- Sources currently used:
- [DayakDaily - ART Q4 2026 operations](https://dayakdaily.com/hydrogen-powered-art-to-begin-service-in-kuching-in-final-quarter-of-2026-premier/) - Publisher: DayakDaily; type: news report; date: not encoded in active label; appears to support Q4 2026 passenger-service target and ART system context.
- [The Edge - KUTS hydrogen plant relocation](https://theedgemalaysia.com/node/786079) - Publisher: The Edge Malaysia; type: business/news media; date: not encoded in active label; appears to support the hydrogen plant relocation contract/milestone.
- [The Star - KUTS Q4 pilot and 2027 commercial operations (May 2026)](https://www.thestar.com.my/news/nation/2026/05/18/kuching-urban-transportation-system-to-start-pilot-run-in-q4) - Publisher: The Star; type: news report; date: 18 May 2026; distinguishes Q4 2026 pilot operations from 2027 commercial operations and reports 38.2 percent Phase 1 progress.
- [DayakDaily - First two ART trains arrived (Aug 2026)](https://dayakdaily.com/kuchings-art-pilot-operations-move-closer-with-arrival-of-first-two-trains/) - Publisher: DayakDaily; type: news report; date: 1 Aug 2026; supports arrival of the first two ART units and the shift into system integration ahead of the Q4 pilot.
- [Sarawak Metro - KUTS official project page](https://www.mysarawakmetro.com/what-we-do/kuching-urban-transportation-system) - Publisher: Sarawak Metro; type: official project page; date: not encoded in active label; supports project scope and delivery context. August 2026 progress photos confirm continuing construction, not pilot commencement.
- Gaps or uncertainty: the feeder bus rollout remains `TBD`, while full-network completion is tracked separately from the first pilot and commercial operations. The earlier `2026-Q1` arrival date was corrected after April 2026 reporting still treated delivery as prospective and 1 August 2026 reporting confirmed arrival. The 2 September 2026 re-review opened 28 August 2026 Sungai Kuap last-girder reports; they confirm continuing Blue Line construction and the same year-end pilot target, and were not added as a card field.

### Bintulu Port - State Control Handover

- Current dashboard status: `Operational`
- Current completed milestone: Bintulu Port handed over to Sarawak
- Sources currently used:
- [DayakDaily - RM1.8B takeover agreed in principle (Feb 2026)](https://dayakdaily.com/rm1-8-bln-bintulu-port-takeover-agreed-in-principle-as-handover-enters-final-stage/) - Publisher: DayakDaily; type: news report; date: Feb 2026; appears to support agreement-in-principle and reported value.
- [DayakDaily - RM1.8B valuation confirmed (Feb 2026)](https://dayakdaily.com/rm1-8-bln-bintulu-port-valuation-not-arbitrary-reflects-true-asset-worth-after-detailed-negotiations/) - Publisher: DayakDaily; type: news report; date: Feb 2026; appears to support valuation and negotiation context.
- [DayakDaily - Awaiting cabinet endorsement (May 2026)](https://dayakdaily.com/rm1-8-bln-bintulu-port-handover-to-sarawak-awaits-federal-cabinet-endorsement/) - Publisher: DayakDaily; type: news report; date: May 2026; appears to support awaiting-decision status and next milestone.
- Gaps or uncertainty: no official federal cabinet decision source or final agreement source is encoded; status should remain public-evidence based.

### Baleh Hydroelectric Project

- Current dashboard status: `In Progress`
- Current next milestone: Reservoir impoundment begins
- Sources currently used:
- [Office of the Premier / UKAS - Impoundment from 2027 (Jun 2025)](https://premierdept.sarawak.gov.my/web/subpage/news_view/19825/UKAS) - Publisher: Office of the Premier / UKAS; type: official government release; date: 16 Jun 2025; supports the 2027 impoundment start and December 2029 completion and generation schedule.
- [Sarawak Energy - Baleh HEP project page](https://www.sarawakenergy.com/baleh-hep) - Publisher: Sarawak Energy; type: official project-owner page; date: not encoded in active label; supports the 1,285MW project scope and project context.
- [Sarawak Energy - Baleh HEP key milestones](https://www.sarawakenergy.com/baleh-hep/baleh-hep-project-key-milestones) - Publisher: Sarawak Energy; type: official project-owner milestone page; date: not encoded on the page. Its milestone graphic supports diversion-tunnel completion in September 2020, river diversion in October 2020, dam rockfill commencement in May 2025, reservoir impoundment in September 2027, minimum operating level in September 2029, first-unit generation in December 2029, and full generation in June 2030.
- [Borneo Post - About RM8B construction cost (Aug 2017)](https://www.theborneopost.com/2017/08/03/construction-of-baleh-hep-to-cost-rm8-bln-seb/) - Publisher: Borneo Post; type: reputable Sarawak news report; date: 3 Aug 2017. It quotes Sarawak Energy's group chief executive officer stating that the total construction cost was about RM8 billion, including financing.
- Value decision: `RM8 billion`. The source directly attributes this project-specific estimate to Sarawak Energy. The summary carries the 2017 date, estimate qualifier, and inclusion of financing so the amount is not presented as a current final cost. The earlier `~RM10 billion` display remains unsupported.
- Gaps or uncertainty: the dated future milestones remain targets. The card does not mark impoundment, minimum operating level, first-unit generation, or full generation complete without later confirmation.

### Green Hydrogen Economy - H2ornbill & H2biscus

- Current dashboard status: `Planning`
- Current next milestone: Announcement of updated project plan and production timeline
- Sources currently used:
- [Samsung E&A - H2biscus FEED project commenced (Nov 2023)](https://www.samsungena.com/en/newsroom/news/view?idx=15543) - Publisher: Samsung E&A; type: official company disclosure; date: 24 Nov 2023; supports the September 2022 renewable-power memorandum, the 23 November 2023 FEED commencement, the original design capacities, and the named H2biscus partners.
- [Borneo Post - H2ornbill joint development agreement (Dec 2023)](https://www.theborneopost.com/2023/12/19/sedc-energy-sumitomo-and-eneos-fine-tuning-project-h2ornbill-details/) - Publisher: Borneo Post; type: news report based on a project news release; date: 19 Dec 2023; supports the October 2023 joint development agreement, SEDC Energy, ENEOS and Sumitomo as parties, and the project's planned FEED stage.
- [The Edge Malaysia - US$4.2B hydrogen partnership package (Feb 2024)](https://theedgemalaysia.com/node/702237) - Publisher: The Edge Malaysia; type: news report; date: 26 Feb 2024; supports the combined partnership-package value and identifies H2biscus, H2ornbill, shared Sarawak Hydrogen Hub infrastructure, and the Rembus Depot within its scope.
- [MIDA - H2biscus joint development agreement (May 2024)](https://www.mida.gov.my/mida-news/sarawaks-new-energy-hub-to-receive-rm2-16-trillion-investment-by-2050-says-abang-johari/) - Publisher: Malaysian Investment Development Authority; type: official agency republication; date: 22 May 2024; supports the H2biscus joint development agreement and FEED context.
- [MEESty - H2biscus and H2ornbill in FEED (Jun 2025)](https://meesty.sarawak.gov.my/web/subpage/news_view/40) - Publisher: Ministry of Energy and Environmental Sustainability Sarawak; type: official ministry news page republishing a Borneo Post report; source-news date: 9 Jun 2025; supports both projects having reached FEED and the combined planned production scope at that time.
- [DayakDaily - USD4.2B hydrogen partnership package (Dec 2025)](https://dayakdaily.com/sarawak-is-open-for-business/) - Publisher: DayakDaily; type: Sarawak news feature; date: 6 Dec 2025; attributes the USD4.2 billion strategic-partnership value as of 21 Sep 2024 and states that the package encompasses H2ornbill, H2biscus, the Sarawak Hydrogen Hub, and the Rembus Depot.
- [Free Malaysia Today - Projects scaled down over weak demand (Apr 2026)](https://www.freemalaysiatoday.com/category/nation/2026/04/08/sarawak-hydrogen-projects-scaled-down-over-weak-demand/) - Publisher: Free Malaysia Today; type: news report; date: 8 Apr 2026; supports the reported downscaling and demand or offtake constraint.
- [Borneo Post - Original H2ornbill export concept suspended (May 2026)](https://www.theborneopost.com/2026/05/27/sarawaks-hydrogen-initiative-scaled-down-on-funding-constraints/) - Publisher: Borneo Post; type: news report quoting the SEDC Energy chairman; date: 27 May 2026; supports suspension of the original Japan-export concept while alternative hydrogen carriers are considered.
- [Borneo Post - Project scopes recalibrated (Jun 2026)](https://www.theborneopost.com/2026/06/09/sarawak-recalibrates-h2biscus-and-h2ornbill-hydrogen-projects-amid-financial-constraints/) - Publisher: Borneo Post; type: news report; date: 9 Jun 2026; supports the scope-recalibration milestone and immediate financial constraint.
- Value decision: `USD4.2 billion`. The amount is displayed as a historical combined strategic-partnership-package value covering H2biscus, H2ornbill, shared Sarawak Hydrogen Hub infrastructure, and the Rembus Depot, not as a project-level split or current final cost. The summary states that no revised investment value has been published following the 2026 capacity reductions and scope recalibration.
- Gaps or uncertainty: no updated project plan, investment value, or production timeline has been published. Former 2027, 2028, 2029, and 2030 delivery targets are historical planning references and are not retained after the 2026 recalibration. Final investment decisions, construction, and commercial production remain undated open outcomes because the earlier official project sequence identifies these delivery stages but newer evidence does not provide replacement dates.
- Editorial update-history decision: no new entry. The existing 9 June 2026 recalibration entry remains the latest material public development; the added milestones document earlier project stages.

### Proposal Cards Approved on 30 August 2026

- Selangau Pig Farming Area - `In Progress`; value: `RM300 million`, the project cost stated by the Minister for Food Industry, Commodity and Regional Development at the 6 November 2024 groundbreaking and carried on M-FICORD's own news page and the BERNAMA wire report. The tracked unit is the single 232.69-hectare farm at Sungai Selabi, Selangau, not the three-farm Pig Farming Area Initiative. Best Pork Sdn Bhd is the developer and operator in collaboration with the Sarawak Land Development Board; the Department of Veterinary Services monitors the site and M-FICORD owns the wider swine programme. The AIP-era anchor farms and MPF Agronomy Sdn Bhd are historical parties and are not shown as lead. The State Planning Authority approved the site on 22 February 2021, land clearing and infrastructure works began in early 2025, and the 19 May 2026 sitting places basic infrastructure completion in 2028, superseding the 2024 expectation of completion "within a year". Porker production remains undated. RM1.5 billion and RM1.29 billion are annual swine-industry production values, RM27 million was a 2024 statewide new-PFA allocation, RM312 million and RM129.8 million are Pasir Puteh export earnings, and RM6.5 million is PDF-only NCR land compensation; none is used as this card's value. Capacity reporting conflicts, so the card displays only the 12,000 parent stock design that every source agrees on. Sources: M-FICORD, BERNAMA, and DayakDaily.
- Samalaju SME Cluster - `In Progress`; value: `RM223 million`, the estimated total development cost for 10 phases across 96.72 hectares, preserved as an estimate from "total estimated cost" and "anggaran kos". The tracked unit is the phased industrial-lot development inside Samalaju Industrial Park, not the park and not SCORE. MINTRED leads delivery and will run the SCORE-MSME programme. Phases 1 and 2 were already complete by 20 October 2023, when Awang Tengah said the first two phases covered 16.4 hectares of a then-100-hectare plan. Later reporting restates the completed area as 21.53 hectares with 21 lots at RM25.8 million. No day-level completion date has been published, so the closer uses the year 2023. The 29 June 2026 event is the official launch, not the completion date. The open milestone names the remaining eight phases and the industrial lots they deliver for local MSMEs; `eight` is 10 phases minus the completed Phases 1 and 2, both figures stated on the launch pages, rather than a quoted total. No year, lot count, or hectare figure is attached to the later phases. The RM60 billion Samalaju Industrial Park investor total, the RM183.07 million 13MP industrial-park portfolio, the RM128.05 million 12MP industrial-park portfolio, and the RM58.2 million shared budget line are rejected as this card's value. The AIP's 43.2-hectare scope is historical. Sources: DayakDaily, Jiwa Bakti, and the 20 October 2023 Borneo Post article preserved on Wayback.
- Inclusion decision: both cards use the `direct` tier. Selangau is a `single_asset`; the SME Cluster is a `programme`. Neither addition changes the SMART, Kota Petra, Lubok Punggor, Samalaju Industrial Park, or SCORE records.
- Editorial update-history decision: both cards receive one entry. The 6 November 2024 Selangau groundbreaking and the 29 June 2026 cluster launch are material public delivery developments rather than editorial notes.
- Dated decision record: [PDF candidate batch implementation section](project-audits/2026-08-30-pdf-candidate-batch.md#implementation-30-august-2026).

### Candidate Additions Approved on 18 August 2026

- SMA Rural Telecommunication (SMART) - `Operational`; value: `RM1.5 billion`, the construction total for 600 SMART towers by SDEC in the Premier's Budget Speech 2025, delivered 11 November 2024. The amount is total construction cost, not an allocation. RM397 million in the same paragraph is a 2025 continuation allocation and is not displayed. RM116 million, RM200 million, and about RM207 million remain rejected as MOCN or OPEX. The direct PCDS rural-connectivity programme is represented by the current SMART600 delivery scope, which deploys carrier-neutral towers and enables MySRBN home broadband for underserved communities. SDEC pages support the August 2022 Nanga Sekukut launch, towers operating with MySRBN by March 2024, the July 2025 MCMC-SDEC operating-support agreement, and continuing active SMART infrastructure in July 2026. A 14 July 2026 Borneo Post report of a Communications Ministry written parliamentary reply states that as of 30 April 2026 all 600 SMART towers had been completed and were operational, including 29 in Baram. That public webpage closes the remaining-tower milestone; the tracked unit remains 600, not 618. Conflicting July 2025 tower totals are excluded from the card, the historical RM5.5 billion figure belongs to an earlier 1,500-tower PDF scope, and the RM8.99 million figure is statewide vandalism loss rather than project value. A 15 August 2026 Utusan Sarawak report quoting Minister Julaihi that all 618 SMART towers are fully operational remains linked as a reported claim only and is not the closer. Dated decision record: [SMART 618-claim review and 30 April 2026 closer](project-audits/2026-08-27-smart-rural-connectivity-618-claim.md). The construction-total leftover is recorded in the [29 August 2026 follow-up](project-audits/2026-08-20-full-milestone-update-sweep.md#29-august-2026-follow-up).
- Coastal Road Network and Second Trunk Road (CSTR) - `In Progress`; value: `RM11 billion`, the transparent combined programme figure formed by InvestSarawak's RM5.42 billion Coastal Road Network and RM5.58 billion Second Trunk Road component values. The combined card avoids duplicate component cards and introduces the statewide road, bridge and rehabilitation programme. DayakDaily's 17 August 2026 report supports the active Sejingkat Bridge package and its 1 October 2026 opening target; older programme-wide progress percentages are not presented as current.
- Inclusion decision: both cards use the `direct` tier. SMART is a `programme`; CSTR is a `combined_card`. The existing SMD GaN card's `trackedUnit` was corrected from `programme` to `component` so its metadata matches its approved component tier and rationale.
- Editorial update-history decision: the Sejingkat Bridge opening update is retained because it is a material current delivery development for CSTR. SMART has a 30 April 2026 Updates-page entry for the Communications Ministry SMART600 operational as-of date; the July 2026 SDEC resilience visit remains a later status source rather than a separate update-history entry.
- Dated decision record: [PDF and online verification audit](project-audits/2026-08-16-pdf-online-verification-audit.md), 18 August implementation section.

### Provisional Additions Revalidated on 10 July 2026

- Pan Borneo Highway Sarawak Phase 1 - `In Progress`; value: RM16.5 billion construction cost. DanaInfra's official project page records 99.98 percent completion as of 30 June 2026 and confirms that 10 of 11 work packages were complete, with the remaining package scheduled for 2029. Sarawak Tribune's December 2025 report gives Q1 2029 as the more precise completion target after water-pipe replacement and scope negotiations. The open milestone therefore remains `2029-Q1`; sources: DanaInfra, The Edge Malaysia, and Sarawak Tribune. DanaInfra's financing figures do not replace the RM16.5 billion construction cost.
- Sarawak-Sabah Link Road - `In Progress`; Phase 1 reached 71.16 percent and Phase 2 reached 11.39 percent physical progress as of 11 June 2026; Phase 1 completion is scheduled for 16 March 2027 and Phase 2 for 2029; sources: The Star and DayakDaily.
- Miri Port Kuala Baram Capital Dredging - `In Progress`; value: RM238 million contract; physical progress reached about 55 percent in April 2026; next milestone: dredging completion in October 2026; sources: MIPD, DayakDaily, and Dredging Today.
- Bau Gold Project - `Planning`; value: RM1.38 billion projected upstream investment in the PCDS 2030 Highlights 2023 report, corroborated by DayakDaily in November 2024. The separate RM24.3 billion in-ground gold value is a resource valuation and is excluded from the reported-value field. Besra completed an independent technical review, received conditional Jugan mining-lease renewal terms and formally accepted the conditional renewal offer on 31 July 2026; next milestone: finalised mining lease conditions; sources: DayakDaily and Besra Gold company disclosures.
- Special Needs Community Centre - `Planning`; value: RM30 million for Phase 1 in Samarahan. JKR Sarawak's live tender list records state tender T/388/07/2026 and a 23 September 2026 closing date, confirming that the July tender milestone was reached. The letter of award and May 2028 completion remain open; sources: JKR Sarawak, DayakDaily and Borneo Post. The 27 August 2026 six-card audit found the tender still unawarded.
- Sarawak Bioindustrial Park - `In Progress`; value: RM10 million combined Budget 2026 allocation for the park and SBC Bioprocess Commercial Centre. Sarawak Biodiversity Centre confirms that Central Hub construction commenced on 13 August 2026 with a 24-month construction period; the August 2028 target applies to the Central Hub, not automatically to the separate Bioprocess Commercial Centre. Anchor-partner selection and combined facility operations remain open.
- Sarawak Infectious Disease Centre - `In Progress`; value: `RM300 million`. Opened 10 August 2026 reports quote the Premier that the Sarawak government had invested more than RM300 million to establish the centre, which was nearing completion. The amount is a government investment, not the 2026 RM72 million construction-and-operations allocation or the older RM200 million commitment. The October 2026 campus-completion milestone remains open pending formal confirmation; sources: SIDC, DayakDaily, and Borneo Post. Dated decision record: [six-card live audit](project-audits/2026-08-27-six-card-live-audit.md). The 2 September 2026 re-review found no campus-completion or commissioning page and left the card unchanged.
- Bintulu-Samalaju Gas Pipeline - `In Progress`; value: RM1 billion committed; offshore work was reported complete in October 2025 and pre-commissioning activity was publicly notified in May 2026; next milestone: progressive commercial operations expected from 2027; sources: The Star, Bintulu Port Authority, and Sarawak Tribune.
- Sarawak Agrotechnology Park - `In Progress`; value: RM19.5 million Budget 2026 allocation for further development of Semenggok and Tarat. Official M-FICORD reporting confirms that a coral-shrimp farm at SARTECH Tarat has operated since 2022, while wider development of both sites remains incomplete; next milestone: completion of Semenggok and Tarat site development; sources: M-FICORD, Sarawak Tribune, and DayakDaily. The DayakDaily budget article is broader than SARTECH but contains an exact project-specific allocation line.
- Sungai Baji Agropark - `In Progress`; value: `RM180 million`, retained from the PCDS 2030 AIP as a user-approved planned state-funding figure comprising RM29 million approved under RMK-12 and an estimated RM151 million for the remaining area, pending an accessible online value source. December 2025 reporting states that infrastructure and agricultural components were complete by October 2025 and that LCDA appointed an anchor company on 14 May 2025. Operations were expected in Q1 2026 and commercial production in Q3 2026, but neither milestone is marked complete without a confirming public update; live sources: DID Sarawak and TVS.
- Semenggoh Rainforest Discovery Centre - `In Progress`; value: RM30 million. The PCDS 2030 AIP Volume II Forestry initiative identifies three phases covering the Wildlife Centre, Entrance, and Botanical zones through 2030. Borneo Post reporting confirms the August 2020 foundation-laying ceremony, three-stage scope, and funding, but no newer public source confirms whether the June 2024 Phase 1 target was achieved; sources: PCDS 2030 AIP Volume II, pages 504-507, and Borneo Post.
- Piasau Nature Reserve Discovery Centre - `In Progress`; value: RM30 million. The AIP identifies it as the second site under the discovery-centre initiative. Newer reporting confirms development commenced on 5 August 2025, describes its marine eco-tourism and national-park management functions, and gives an early August 2027 completion schedule; sources: PCDS 2030 AIP Volume II, pages 504 and 508, and Borneo Post.
- PETRONAS Kasawari Carbon Capture and Storage Project - `In Progress`; value: `RM4.5 billion`, reported in 2022 for the Phase 2 CCS platform and its connection to the Phase 1 central processing platform. PETRONAS approved the final investment decision on 20 October 2022 and awarded MMHE the EPCIC contract on 3 November 2022. PETRONAS is examining a 2027 first-injection date; sources: PETRONAS, The Edge Malaysia, The Sun, and The Star.
- Yayasan Sarawak International Secondary Schools Expansion - `In Progress`; value: `RM120-135 million`, a derived estimate for the three remaining schools based on the 2022 implementation estimate of RM40 million to RM45 million per school and September 2025 confirmation that three of six schools remained. This is not an announced contract or six-school network total. The Premier confirmed on 31 January 2026 that Miri and Bintulu construction had commenced after tenders were awarded, with completion still targeted for 2027; a sixth campus remains in planning without a published date. The 30 August 2026 re-review confirmed the same campus count from opened pages (three operating, Miri and Bintulu under construction, one more in planning) and added a DayakDaily source note for the planning / Betong-division discussion. The card does not name Betong as the sixth campus because the Premier's opened wording states only that one more school is in the planning stage; sources: Rakan Sarawak, YSISS, Borneo Post, DayakDaily, and Sarawak Tribune. Dated decision record: [six-card live audit](project-audits/2026-08-27-six-card-live-audit.md#30-august-2026-re-review-ysiss-sixth-campus).
- Sarawak River Aids to Navigation and Surveillance System - `In Progress` as an interim combined card; value: `RM30 million` for the first-phase Senari VTMS on the Sarawak River, excluding the later Miri system. Sarawak River VTMS was reported fully operational in December 2025, while Miri River system completion remains scheduled for Q3 2027. The PCDS 2030 Highlights 2023 report identifies Sarawak River as the first project under a wider river-management initiative and describes similar systems for Miri River and Kuala Baram as later plans. The scopes should ultimately be separated, but the combined card remains `Ongoing` while the Miri milestone is open; sources: DayakDaily, Borneo Post, and PCDS 2030 Highlights 2023, PDF page 121 (printed page 120).

### Standalone Candidate Additions Revalidated on 6 August 2026

- Sarawak Reef Ball Project - `In Progress`; value: `RM100 million`, the transparent combined public allocation comprising RM70 million for Phase I and RM30 million for Phase II. Sarawak Forestry Corporation is the implementing agency. Phase I was completed in July 2022, Phase II is officially scheduled for 2023-2027, stakeholder engagement was reported in August 2024, and 80 reef balls were deployed at Kuala Nyalau-Samalaju in July 2026. The latest deployment is treated as continuing programme activity because the source does not explicitly identify it as a Phase II work package. The open milestone uses `2027` for Phase II to reach scheduled completion. The separate long-term 5,000-unit target reported in July 2026 is tied to the PTBSB partnership, which had contributed 467 units since 2022, so it is not used as the statewide programme's next milestone; sources: Office of the Premier of Sarawak, DayakDaily, and Borneo Post. Dated decision record: [Sarawak Reef Ball Project Round 2 audit](project-audits/2026-08-06-sarawak-reef-ball-project-round-2.md).
- Community Social Support Centre (CSSC) Network - `In Progress`; value: `Not disclosed`. The statewide one-stop support network is led by the Ministry of Women, Childhood and Community Wellbeing Development through the Social Development Council. CSSC Sibu was launched and handed to its operator in November 2025, and UKAS recorded Kuching as operating by 17 March 2026. The former May 2026 Bintulu operations target is not retained because a July 2026 furniture-supply quotation shows that fit-out activity continued after that date; Bintulu operations remain undated and open. The RM40 million PCDS programme figure remains PDF-only and is not displayed; sources: Borneo Post, UKAS, JKR Sarawak, and DayakDaily. Dated decision record: [remaining-candidates Round 3 audit](project-audits/2026-08-06-remaining-candidates-round-3.md). The 2 September 2026 re-review again rejected a 26 August 2026 Bintulu key-handover synthesis; no opening or operator-handover page was opened.
- Sago BioCNG Plant and Gas Distribution Network - `In Progress`; value: `Not disclosed`. CRAUN Research's Kampung Tabo and Kampung Teh pilot combines sago-wastewater treatment, BioCNG development and a local gas network. Pipeline installation to about 122 homes and public facilities was reported in March 2026, with pilot completion targeted for the end of 2026. The newer 122-home scope supersedes the older 147-household figure; sources: Utusan Sarawak, Sarawak Tribune, The Star, and TVS. Dated decision record: [remaining-candidates Round 3 audit](project-audits/2026-08-06-remaining-candidates-round-3.md).

### Approved Six-Card Route Added on 7 August 2026

- Lubok Punggor AgriHub and Mid Sadong 1 Irrigation Project - `In Progress`; value: `RM30 million` for the initial 54.4-hectare project. DID Sarawak confirms the project-specific amount, February 2024 approval and November 2024 launch. UKAS confirms March 2026 compensation and the AgriHub scope covering irrigation and drainage, a reservoir, warehouse and machinery workshop. The statewide RM1 billion allocation, RM6.5 million compensation payment and approximate RM100 million expansion estimate are not used as the project value.
- Bako National Park ASEAN Heritage Park - `Designated`; value: `Not disclosed`. Sarawak Government publicly confirmed the nomination, the ASEAN Centre for Biodiversity completed its evaluation and designated Bako as the 65th ASEAN Heritage Park in September 2025. BIMP-EAGA independently confirms the designation. The ASEAN Centre for Biodiversity is the programme secretariat and designation authority, not the card's lead party.
- Lambir Hills National Park ASEAN Heritage Park - `Designated`; value: `Not disclosed`. Sarawak Government publicly confirmed the nomination, the ASEAN Centre for Biodiversity completed its evaluation and designated Lambir Hills as the 66th ASEAN Heritage Park in September 2025. `Lambir Hills National Park` follows the ASEAN body's current English identity; `Bukit Lambir` remains a source alias.
- Sarawak High Performance Centre - added at `Planning` on 7 August 2026, then moved to
  `monitored_unconfirmed` on 17 August 2026. The 1 September 2026 re-review found the same identity
  hold: 2026 MYSED reporting still places a high-performance centre at the Sarawak Sports Complex,
  while the 13MP separately names a Sarawak High Performance Sports Centre. No opened official page
  equates those units or connects the exact UKAS project to PCDS 2030. Re-review when an official
  implementation, budget, procurement or strategy publication resolves that identity and relationship.
- FR21 Jalan Serian-Tebedu-Indonesia Border Upgrade - `Planning`; value: `RM0.5-1 billion` as a provisional range. JKR Sarawak's official preliminary-design scope is 42 km, while November 2025 parliamentary reporting describes about 48 km and 10 new bridges. The displayed range preserves the reported statement that the cost will exceed RM500 million and may reach RM1 billion, subject to finalisation after preliminary work. The myBina RM10 million-RM50 million range is excluded because its page is scoped to consultancy services.
- Bintulu Bio-Algae Initial Commercial Plant - `In Progress`; value: `Not disclosed`. PETRONAS explicitly identifies the ICP collaboration between PETRONAS Research and SEDC Energy, and a second PETRONAS release confirms joint technology development for microalgae oil and SAF. September 2024 reporting confirms their studies in Bintulu and planned 10,000-acre scale-up. The card remains distinct from C4 Sarawak and does not treat the dependent future bio-refinery as an achieved project stage.
- Dated source, value and inclusion review: [approved six-card route](project-audits/2026-08-07-approved-six-card-route-first-three.md).

### Sustainability Vision 2030 Energy Projects Added on 13 July 2026

- Sejingkat Battery Energy Storage System - `Operational`; 60MW/82MWh facility energised in December 2024 and publicly announced as commissioned in February 2025. Routine grid services and performance monitoring are operational activities rather than open delivery milestones, so the commissioned facility displays as `Completed`; source: Sarawak Energy.
- Mentarang Induk Hydroelectric Project - `In Progress`; US$2.6 billion, 1,375MW cross-border hydropower venture in North Kalimantan; groundbreaking and early works were reported in 2023, and access roads were reported completed by March 2025. The developer is targeting commercial operation in 2030, with financial close still unconfirmed after an earlier Q1 2026 aim. Sarawak Energy supports the value, identity and groundbreaking; the Office of the Premier supports early works; Petromindo and Kompas support the access-road and 2030 COD schedule. The PT Kayan Hydropower Nusantara page remains omitted from the live card because it currently renders an error shell and adds no unique field evidence.
- Sarawak-Singapore Electricity Interconnection - `In Progress`; Sarawak Energy confirmed that a techno-commercial study with Sembcorp and Singapore Power was under way in March 2023. Conditional approval was obtained in October 2025 for around 1GW of renewable power exports, with further regulatory approvals and licences still required; sources: Sarawak Energy.

### Sarawak 13th Malaysia Plan Projects Added on 28 July 2026

- New Kuching International Airport - `Planning`; proposed at Tanjung Embang. The Sarawak Premier described `RM10 billion` as an approximate project cost in August 2025. The site-verification and feasibility study was complete by May 2026, and state and federal transport officials were discussing the Airport Development Request. No federal approval or airport construction start has been confirmed; sources: Sarawak Premier's Department and Ministry of Transport Sarawak. The broader KLCH master-plan page remains research context rather than a live airport-card source.
- Tanjung Embang Deep-Sea Port - `Planning`; separately tracked as the port and gas-terminal component of the integrated Tanjung Embang development. The Edge Malaysia reported an estimated RM25 billion to RM30 billion cost in November 2024, and CIDB Malaysia connected the same estimate to the Tanjung Embang port and gas-terminal scope in January 2025. An official April 2025 report placed the port master-plan design in its final stage, and project-specific May 2025 reporting confirmed that detailed technical and economic feasibility work was under way. The Sarawak Government and PETROS were identified as development partners, with operations scheduled for 2032. No final budget, procurement, or construction start has been confirmed; sources: The Edge Malaysia, CIDB Malaysia, Sarawak Premier's Department, DayakDaily, UKAS, and The Star.
- Baram Agrovoltaic Project - `Planning`; proposed RM6 billion integrated agriculture and 300MW power-development scope at Temala near Long Lama. UKAS identifies the current scope but does not publish contracts, delivery sequence, or schedule. The 2024 Borneo Post report and 2025 DayakDaily and Digital News Asia reports establish Planet QEOS Sdn Bhd (Planet QEOS) as the proponent and coordinating party for the evolving Baram agrovoltaic and DeepTech programme. Their different capacities, land areas, investment figures, and partner packages do not establish Planet QEOS Sdn Bhd as owner or operator of every RM6 billion component; sources: UKAS, Borneo Post, DayakDaily, and Digital News Asia.
- Kota Petra Green Technology Park - `In Progress`; 3,000-acre Zecon development near Demak Laut and Senari Port. Phase 1 site preparation was under way by May 2026, a RM328 million EPCC contract was awarded in July 2026, and commercial operations remain scheduled for December 2027; sources: Zecon, UKAS, and The Star.
- PDF research basis: `docs/source-pdfs/Final - Sarawak 13th Malaysia Plan 2026-2030_Executive Summary -13.01.2026.pdf`, especially pages 18 and 30. The PDF confirms strategic inclusion and naming; every live-card claim is also supported by a project-specific public webpage.
- Dated source and inclusion review: `docs/project-audits/2026-07-28-13mp-candidate-review.md`.
- Three 13MP / zone cards added on 1 September 2026 after the parked-pool re-review:
  - Sarawak Artificial Intelligence Centre (SAIC) - `In Progress`; value: `RM5 million`, the 2026 Budget operations allocation, not a capital cost. Operating state AI agency launched in 2025 at Unifor Complex; distinct from SAINS Sovereign AI. Open milestone: publication of the Sarawak AI Blueprint. Sources: SAIC, Budget Speech 2026, DayakDaily, UKAS.
  - Sarawak Climate Change Centre - `Planning`; value: `Not disclosed`. Proposed technical-arm climate hub under PCDS/13MP, still establishing. Google AI Mode’s 2025 operational-launch claim is rejected. RM7 million nearby climate-study lines are not this centre’s cost. Sources: Premier Department / UKAS, Malay Mail, FULCRUM, DayakDaily, Budget Speech 2026, SDI.
  - Kuching Low-Carbon Hub - `Planning`; value: `Not disclosed`. PETROS-led 13MP proposed zone at Tanjung Embang. Cross-links the existing airport and deep-sea port cards without duplicating their milestones. Open: detailed masterplan finalisation and 2027 PPP works. Sources: The Edge Malaysia, PETROS, UKAS, DayakDaily.
- Not a live card: the Baram Renewable Energy Economic Zone remains umbrella-zone context for the Baram Agrovoltaic Project. The 13MP names the zone; the agrovoltaic project is the tracked delivery unit and keeps the RM6 billion figure. Same-day owner reversal recorded in `docs/project-audits/2026-09-01-13mp-zone-candidate-pool.md`.
- Still not active: FutureData remains `monitored_unconfirmed`. The exact Sarawak High Performance Centre stays in `audit/project-inclusion.json` as monitored pending an explicit PCDS or 13MP identity link. Dated record: `docs/project-audits/2026-09-01-13mp-zone-candidate-pool.md`.

### PCDS 2030 - Overarching Framework

- Current dashboard status: `Operational`
- Current dashboard value: `Not applicable`. The RM282 billion figure is a 2030 GDP target, not a project value.
- Current next milestone: RM282B GDP goal
- Rendering note: this record is stored in `src/trackerData.js` under the `overview` category, but `src/App.jsx` excludes `isOverview` rows from the active project grid.
- Sources currently used:
- [Business Events Sarawak - PCDS 2030](https://businesseventssarawak.com/about-sarawak/pcds2030/) - Publisher: Business Events Sarawak; type: government-linked/official tourism-business portal; date: not encoded in label; appears to support PCDS targets and framework summary.
- [DayakDaily - Sarawak retains high-income status (Jul 2026)](https://dayakdaily.com/world-bank-sarawak-retains-high-income-state-status-with-gni-per-capita-of-rm70500-in-2025/) - Publisher: DayakDaily; type: news report; date: 7 Jul 2026; supports the completed high-income milestone and reports 2025 GNI per capita.
- Gaps or uncertainty: overview targets are long-range framework outcomes; no annual checkpoint methodology is encoded.

## Derived Metrics

The app derives display rows by flattening `SECTORS` into project rows and excluding the overview category:

- Active rendered projects: 55.
- Stored projects including overview: 56.
- PCDS economic sectors represented in data: 6.
- PCDS enablers represented in data: 7.
- Populated economic-sector ids: manufacturing, agriculture, tourism, forestry, mining, social-services.
- Populated enabler ids: digital-transformation, innovation, education, infrastructure, utilities, transport, renewable-energy.

Current active dashboard status counts from `src/trackerData.js`:

- `In Progress`: 37.
- `Awaiting Decision`: 0.
- `Planning`: 9.
- `Operational`: 5.
- `Designated`: 4.
- `Enacted`: 0.

The UI groups detailed statuses into public filter labels:

- `Awaiting Decision` and `In Progress` display as `Ongoing`.
- `Planning` displays as `Planning`.
- `Operational`, `Designated`, and `Enacted` display as `Completed`.

Current public display counts:

- Tracked projects: 55.
- Planning: 9.
- Ongoing: 37.
- Completed: 9.
- Milestones: 168 completed out of 251 active-project milestones.

Milestone completion is calculated from each milestone's manual `done` boolean:

- `doneMilestones`: count of milestones with `done: true`.
- `totalMilestones`: total milestone count.
- `progress`: rounded percentage `doneMilestones / totalMilestones * 100`.
- `nextMilestone`: first milestone where `done` is false.
- `latestMilestone`: last completed milestone in the list.
- Completed milestone timeline: milestones where `done` is true.
- Remaining milestones: milestones where `done` is false, after the first open milestone.

Cards are sorted by status attention order, then by project name:

- `Awaiting Decision`
- `In Progress`
- `Planning`
- `Operational`
- `Designated`
- `Enacted`

## Unknowns / Manual Review Needed

Explicit methodology found in docs/code:

- The tracker is independent and public-facing.
- Data is manually curated.
- Public claims should have source links.
- PCDS PDFs are confirmation and research references; live card claims require visible, project-specific public webpage evidence.
- Milestone statuses are best-effort based on available public information.
- `LAST_UPDATED` is manually maintained.
- Source links are not automatically checked.
- Run `npm run check:links` to test every unique project and update-history source URL. The command
  is report-only: HTTP failures, timeouts, redirects, and network errors are review triggers rather
  than proof that a source should be removed, and they do not fail a release.
- Detailed statuses are grouped into simplified public labels.

Inferred methodology based on data structure:

- Categories follow the PCDS 2030 six economic sectors and seven enablers, with one separate framework overview record.
- Milestones are manually defined rather than generated from source data.
- Milestone completion is evidence-based in intent, but technically controlled by manually set booleans.
- Reported values appear to be copied or normalized into compact display strings such as `RM1 billion`, `USD130 million (Phase 1)`, or `Multi-billion`.
- Source support is project-level, not field-level. The app does not know which source supports which specific field.
- The dashboard distinguishes detailed internal statuses from simpler public labels, but it does not distinguish official confirmation from media reporting in the UI.
- The audit JSON suggests a prior evidence-review method using `PRESS_total`, `PRESS_tier`, `evidence_quality`, `trackability_score`, `recommendation`, and rationale notes, but no formula or active app integration is present.

Unknown methodology needing human confirmation:

- The exact definition and scoring formula for `PRESS_total` and `PRESS_tier` in `audit/pcds-audit.json`.
- Whether every completed milestone has been checked against a direct source, or whether some are inferred from broader reporting.
- Whether `LAST_UPDATED` means any data edit, source review, link check, or full tracker review.
- How to handle stale, broken, paywalled, changed, or redirected source URLs.
- Whether future updates should require one official source, multiple public sources, or a documented exception.
- Whether source publication dates should become structured fields rather than embedded in labels.
- Whether the overview/framework record should remain hidden from the active dashboard grid.
- Whether source type, confidence, and field-level support should be added to `src/trackerData.js` or kept in documentation/audit files.
