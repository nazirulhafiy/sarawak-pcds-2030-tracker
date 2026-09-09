# Design Notes

## V2 Preview

V2 is the default local and Preview interface. Its active behavior is documented in
[the V2 guide](v2.md). Earlier design notes below also describe V1, which remains on
Production until release approval. Internal `concept` identifiers select the interface
during builds; V2 is not an optional Preview mode.

## Current Design Direction

The current site is a compact civic-data tracker. It should feel clear, restrained, and evidence-oriented rather than promotional.

The design direction is:

- Light and dark theme surfaces built from the same restrained neutral palette.
- Editorial dashboard layout.
- Compact project cards.
- Clear status labels.
- Sector colors used as accents.
- Minimal decoration.
- Source links visible inside expanded cards.

Do not redesign this direction without explicit user approval.

## Layout

The page uses one centered column with a maximum width of about `1040px`.

Current layout order:

1. Kicker with compact language and theme controls, followed by the title.
2. Two short introductory paragraphs covering the tracker purpose, independence, status and
   milestone content, and public-source links.
3. Data-freshness link immediately above the summary metrics, with a subtle `↗` cue that opens the
   matching-language update history.
4. Summary metrics, which also provide the primary status filters.
5. Two-column project-card grid on desktop.
6. One-column project-card grid on mobile.
7. Compact shared footer with current site and project links, followed by the independence disclaimer.

The PCDS context belongs near the title so readers understand the dashboard at first glance.
Keep it succinct and integrated with the introduction rather than placing a separate About section
below the project grid.

The introduction uses a maximum reading width of about `720px`. This keeps the text visually
connected to the compact title block and avoids an overly wide paragraph slab on desktop.
The full strategy name is kept together as one typographic phrase above the mobile breakpoint.
Below `760px`, it returns to normal wrapping so long English and BM names cannot overflow.
The English second line uses the concise sentence `An independent tracker with project status,
milestones and links to public sources.` The social-preview card keeps its separate share description.

Summary metric boxes provide simple status navigation before readers scan the project cards. Their
active, hover, focus, and press states make the filtering behavior discoverable without duplicating
the same choices in a second pill group. Category filtering uses the separate horizontal discovery
row; its highlighted category is the only visible category-state indicator.

The language, theme, and navigation pills use one shared physical system: a fully rounded capsule,
an `11px` label, and a `36px` total height on desktop. The language control retains its segmented
outer shell. Status filtering belongs to the summary metrics, while the Milestones metric resets
filters and provides a bulk expand/collapse control for all projects.

The update history uses the existing last-updated pill as its entry point. Do not add a separate
navigation line beneath it or let the link compete with the project summary metrics.

Badges, filters, sorting, and summary counts use the same public status. If a detailed source status such as `Operational`, `Designated`, or `Enacted` still has an unfinished delivery milestone, the card is presented as `Ongoing` until that milestone is completed or removed as routine operational work.

Collapsed project cards prioritize category, title, status, milestone count/progress, next milestone, and the details affordance. Expanded cards keep evidence, milestone history, and source links close to the claims they support. The next-or-completed milestone callout remains visible in both states. Expanded milestone lists omit the milestone already promoted into that callout so each milestone appears only once.

Expanded project facts show the reported-value column only when a monetary figure has been
published. Cards whose internal value remains `Not disclosed` omit the column entirely and let the
lead or parties fact span the available width. The column returns automatically when a verified
monetary value is added; the public interface does not display a `Not disclosed` placeholder.

Project titles use a short public-facing `displayName` when the canonical source name starts with a lead organisation, places an acronym before the full name, or needs a long descriptive suffix. Canonical `name` values remain available for stable project identity. Public titles should put the project or facility first, place acronyms in parentheses, and leave lead organisations to the `Lead / parties` field unless they are part of the official project name. The word `Project` is retained only when it is important to the recognised name.

Collapsed desktop titles reserve a shared two-line, `44px` title area at the existing `18px` size. This keeps status and milestone content aligned without making the project order depend on viewport-specific title wrapping. The All view sorts cards by the public status sequence `Planning`, `Ongoing`, then `Completed`, with titles alphabetised inside each group. Mobile remains a one-column layout.

Milestone dates are stored as compact source values but formatted consistently in the interface. Full dates use day, full month, and year; month targets use full month and year; and quarter targets use `Quarter # YYYY` in English and `Suku # YYYY` in BM. A completed milestone whose date has never been published uses the `Achieved` label, rendered as `Achieved` in English and `Dicapai` in BM. Milestones without a published date, including continuous work without a single completion date, omit the date label and render as compact bullet points under the existing `Remaining Milestones` heading. Reserve `Ongoing` for project status rather than milestone timing. Do not add a second title for undated milestone lists. The next-milestone date is visually separated from its description so readers can scan timing and outcome independently.

Segmented milestone indicators follow the milestone-array order. Completed segments must remain
contiguous from the left, followed by open segments, so the visual sequence agrees with the
completed count shown beside it. On mobile, the count stays beside the label and segments, shrinking
the segments slightly and wrapping within the remaining inline space instead of dropping below the
indicator row. Active projects use a compact `1/5 complete` count; cards already marked `Completed`
use only the ratio, such as `4/4`, because the status badge already supplies the meaning. The full
milestone wording remains available to assistive technology. A completed card's final callout uses
`Final milestone` in English and `Pencapaian Akhir` in BM so it does not repeat the project status.
Expanded cards retain the `Milestones` label and detailed timeline for added context.

Collapsed desktop cards use a shared minimum height so every two-column row remains visually
aligned even when titles or milestone copy vary. The narrower two-column range from `761px` to
`980px` uses a slightly taller shared minimum to accommodate wrapped titles, milestone counts, and
BM copy. Within that shared height, the collapsed card's three content rows use the available space
between them so the composition remains balanced instead of leaving excess space below the final
row. The visible classification control and final milestone callout keep matching `30px` top and
bottom insets on collapsed desktop cards; collapsed detail panels do not add invisible grid gaps
around the callout. Mobile cards return to content-driven heights and `18px` insets in the one-column
layout, and their internal grid and flex rows must be allowed to shrink so narrow screens do not clip
card content.

## Typography

The app imports Inter from Google Fonts inside `src/App.jsx`, with system font fallbacks.

Current type style:

- Strong bold headings.
- The two-line tracker title uses a restrained hierarchy: `PCDS 2030` is slightly smaller as
  programme context, while `Project Tracker` remains the dominant product label.
- Small uppercase labels for metadata.
- Compact body text for project summaries and milestones.
- Introductory copy at `16px` with a `1.6` line height. Keep the hero language plain and direct,
  with no inline emphasis treatment, so the tracker purpose and source basis remain easy to scan.
- A compact `11px` linked last-updated pill so freshness metadata remains visible without competing
  with the introduction.
- No decorative display font.

## Color

Main interface colors:

- Light theme: white surfaces with deep navy and slate-gray text.
- Dark theme: charcoal `#121212` page background with lighter neutral surfaces, high-contrast
  slate, and near-white text. The neutral base keeps the teal brand and project category colours
  clear while retaining comfortable separation between the page and raised surfaces.
- Brand/accent: teal `#0d9488` in light mode and a brighter teal treatment in dark mode.
- Development environment: orange `#f97316`.
- Preview environment: purple `#7c3aed`.

Project-card status badges display the project state using the shared neutral treatment. Category colour is
reserved for the classification pill so the filterable identity remains easy to scan.
The status badge uses a white surface in light mode and the theme surface in dark mode, with a small
neutral dot and shared text colour. Planning, Ongoing, and Completed do not receive separate badge
colours; the status label remains the authoritative cue while the neutral treatment keeps the cards
calm and comparable.

Sector colors are stored in `src/trackerData.js` and appear primarily on the classification pills and
their interactive filter states.

Category colour should be reserved for project identity and filtering, especially the joined classification
pill. Status badges, milestone indicators, dates, next milestone surfaces, source badges, and expand
controls use a shared neutral palette so the dashboard stays credible and scan-first. Summary metrics
use separate neutral surfaces, modest gaps, and quiet borders so the dashboard hierarchy stays calm.

## Components

The tracker UI is primarily implemented as React functions inside `src/App.jsx`. Shared route
controls and the update history have separate focused components.

Important components:

- `EnvironmentBadge`
- `SummaryMetrics`
- `DiscoveryControls`
- `ProjectResultStatus`
- `ProjectGrid`
- `ProjectCard`
- `StatusBadge`
- `MilestoneIndicator`
- `NextMilestoneCallout`
- `SourceLinks`
- Shared route controls in `src/SiteControls.jsx`
- The editorial update history in `src/UpdatesPage.jsx`

Most component layout styling remains inline in `src/App.jsx`. Shared light/dark color tokens,
focus treatment, and theme-icon visibility live in `src/index.css`, with responsive and animation
rules in the inline `<style>` block in `App`.

## Interaction

Current interactions:

- Refreshing any site route returns the document to the top. This reset is limited to reloads so
  browser back/forward restoration and deliberate in-page anchor navigation keep their existing behavior.
- After the reader moves beyond the opening viewport, a compact fixed Back to top control appears in
  the lower-right corner on tracker and update-history routes. It uses the shared neutral control
  surface, brand-coloured arrow, focus ring and localized EN/BM accessible label. On mobile it becomes
  a 40px icon-only arrow button with a teal brand surface and theme-aware contrast. Activation scrolls
  smoothly to the page start, or immediately when reduced motion is preferred. In Preview and
  development it sits above the environment badge rather than overlapping it.
- `EN | BM` controls switch the hydrated presentation without a document reload and retain real
  route links for direct navigation and fallback. The same pill treatment appears on the tracker
  and update-history pages. Each language option gently lifts and gains a tinted surface on
  hover or keyboard focus, with a small press response. When the alternate option is being
  hovered or focused, the selected option temporarily flattens so attention follows the
  alternate choice. The site
  kicker, main title, and project titles remain in English in both modes so the identity and project
  names stay consistent across the tracker and its sources. The BM introduction uses the idiomatic
  phrase `platform pemantauan bebas`; the footer retains the quoted English phrase `'Project tracker'`,
  while the category label `Enabler` is presented as `Pemboleh`.
- Light is the initial theme for first-time visitors regardless of their operating-system theme.
  The icon theme button switches between light and dark modes and remembers an explicit selection. Its
  single SVG morphs between sun and moon states by reshaping the centre, moving the crescent mask,
  and rotating the rays. The sun represents the current light theme and the crescent represents the
  current dark theme; the accessible name describes the next action and updates immediately after a
  change. The button lifts into a soft
  tinted surface with a subtle shadow on hover or keyboard focus and gives a small press response.
- The `Projects`, `Planning`, `Ongoing`, and `Completed` summary metrics are interactive status
  filters. They use `aria-pressed`, a restrained hover/focus lift, and a persistent active treatment;
  a small, low-emphasis descending-bar filter symbol appears in the top-right of Planning, Ongoing, and Completed on hover or
  keyboard focus and remains visible in teal while that status is selected. Projects shows the same
  behaviour with an equal-line list symbol on hover or keyboard focus; it remains visible when it can
  clear an active status filter, so the default all-projects state stays quiet at rest. All metric cues
  share the same rendered size and rise to the same full-opacity, strong-text emphasis as the card
  chevrons on hover or keyboard focus. Milestones has no action cue because it is a static summary.
  The active `Projects` metric stays neutral and flat, while the narrower status metrics retain the
  pressed treatment. Hovering another metric temporarily flattens the selected status metric so
  attention follows the target. The active `Projects` metric stays flat with its normal text colour
  so it remains easy to track. Pressing the selected Planning, Ongoing, or Completed metric again
  returns the status filter to Projects. Card milestone indicators mirror the dashboard metric format with a
  compact `1/5 complete` count; expanded cards retain the `Milestones` label and the full accessible
  wording.
  On initial load or refresh, each numeric segment in the metric values counts up from zero over
  `1.4s` with an eased finish. Compound values such as milestone completion animate both numbers
  independently. Reduced-motion preferences show the final values immediately.
  On mobile, the milestone summary uses the shared brand teal for its progress fill against the
  neutral theme-aware track.
  The project search remains visually quiet at rest, showing only the search icon without visible
  placeholder text. A compact × clear control appears at the far right only while the field contains
  text. The input and clear action retain localized accessible labels in both languages.
  The `Milestones` metric is a non-interactive progress summary, and project details expand or
  collapse individually. Choosing a status or category filter collapses expanded cards before
  applying the new filter. The separate status pill
  group is intentionally omitted so the dashboard has one primary status-filtering path. Applying a
  status or category filter briefly fades the current card grid out, then reveals the filtered cards
  with a short lead-in, a row-aware stagger, and a restrained scale transition; reduced-motion
  preferences bypass this transition.
- Each project card's joined classification pill keeps one stable two-tone silhouette as a static
  identity label. It no longer morphs or filters the grid. Specific category filtering belongs to the
  horizontal row beneath the metrics, which can be combined with status and search. Pressing the
  selected category again returns to `All`; the row automatically scrolls to keep the selected option
  visible. Mobile cards reserve only the chevron's space for the label, and long category names may
  wrap within that boundary.
- Project cards expand and collapse. A collapsed card's `View details` control rests as a bare down
  chevron inside a fixed hit area; expanded cards use the same control with an up chevron. Hover or
  keyboard focus on hover-capable devices, including hovering the card itself, reveals a soft neutral
  rounded-square surface and slight lift without changing the control's size. On touch devices, the
  same control treatment appears briefly while the card is pressed, while the parent card button
  preserves the localized accessible expand/collapse label.
- Whole cards use a restrained neutral hover/focus treatment on pointer devices: a `3px` lift, firmer
  neutral border, and layered neutral shadow while their white surface and category classification colours
  remain unchanged. Touch presses mirror that depth cue for immediate feedback, then return to the
  resting state after release instead of retaining a browser-dependent hover state. Reduced-motion
  preferences keep the stronger border and shadow but omit the physical lift.
- Compact buttons and links with custom press feedback use `touch-action: manipulation`; their browser
  tap flash is suppressed only where that custom feedback already makes the interaction clear. Do not
  disable pull-to-refresh or text selection globally.
- Source links open in a new tab. Hover and keyboard focus use a subtle brand-tinted surface,
  stronger border, slight lift, and a clearer external-link arrow so the supporting evidence is easy
  to identify as interactive without competing with the project content.
- The linked last-updated control rests as plain metadata in the standard muted text colour, aligned with
  the hero text. Hover or keyboard focus reveals one soft tinted pill aligned with the summary metrics and
  filters while its label eases slightly right into the pill. The low-opacity `↗︎` cue becomes fully
  visible on hover or focus. The fixed hit area prevents flicker, resizing, or a nested inner surface.
  Each update page keeps a visible top-left link back to its matching-language tracker, while entries
  link only to their supporting public sources.
- The last-updated pill uses the text-presentation sequence `U+2197 U+FE0E` for its `↗︎` symbol so
  mobile platforms do not substitute an emoji glyph.
- The BM introduction uses `platform pemantauan bebas`, the footer quotes the borrowed phrase
  `'Project tracker'`, and navigation pills use the unquoted label `Project tracker`.
- The tracker and update history share a compact two-column footer on desktop: a public-source note
  and an Explore group with the short labels Tracker, Updates, and Contact or Hubungi. Contact opens
  the public hafiy.my email address with the tracker name prefilled as the subject. The active
  internal route uses `aria-current="page"` without changing its resting visual formatting. The two
  content blocks use equal internal spacing and a faint vertical separator, while the disclaimer row
  uses a faint horizontal separator. Footer body copy and navigation links use `13px`, the site name
  uses `14px`, the uppercase Explore label remains `11px`, and the secondary disclaimer remains `12px`.
  Navigation links use a regular-medium weight, the secondary text colour, and slightly wider vertical
  spacing so they read clearly as destinations without competing with the site name or group label.
  The public-source note places its status-and-milestones clause on a second line for desktop scanning and
  lets mobile layouts wrap naturally.
  A subtle neutral surface separates the footer from the project grid without adding shadow or
  promotional decoration. Mobile converts the vertical divider into a horizontal separator and
  stacks the note, Explore links, and disclaimer. The hafiy.my credit remains linked in the
  disclaimer. A separate copyright line is omitted because it repeats both the site identity and
  owner credit without adding useful context. Do not show links for unbuilt pages or duplicate
  external destinations in a separate link group.
- Environment badge is fixed at the bottom-right in non-production environments.

The expansion animation respects `prefers-reduced-motion`.

## Accessibility behavior

- Each tracker route starts with a localized, visually hidden skip link. When focused, it moves
  keyboard users directly to the tracked-projects region, which has a stable `#projects` target and
  remains focusable for reliable anchor navigation.
- The page title is the only `h1`. Project titles are `h2` headings, and expanded-card sections such
  as Sources and Remaining Milestones use `h3` headings while retaining their existing visual sizes.
- Every project disclosure button exposes its expanded state and stable `aria-controls` references.
  Expanded content receives matching IDs; collapsed content is inert and source links are excluded from
  the keyboard sequence until the card is open. Multiple cards can remain expanded at once.
- The theme control keeps a generic localized label, matching the neutral presentation of the language
  control. The existing icon animation and reduced-motion behavior remain unchanged.
- Client-side navigation between Tracker and Updates moves focus to the new page heading without
  creating a visible pointer-navigation focus artifact. Language switches remain on the current page,
  while browser history and direct static routes retain their normal behavior.
- Light-theme muted text and footer links use AA-suitable contrast. Classification colors remain the
  category identity treatment, with the text on each color choosing a contrasting foreground rather
  than forcing white text on every category. Interactive classification labels wrap at narrow widths,
  including a 320px viewport, without horizontal page overflow.

## Responsive Behavior

The app switches to a mobile layout below `760px`.

Current mobile changes:

- Header controls remain compact beside the kicker and may tighten their spacing.
- Main padding reduces.
- Project grid becomes one column.
- Project cards remove the fixed desktop minimum height.
- Summary metrics become two columns.
- Desktop milestone metric is hidden.
- Mobile milestone summary appears.
- Project fact blocks stack vertically.
- At widths up to `760px`, the shared language, theme, and navigation pill height increases to
  `40px`. This improves touch comfort while keeping their visual rhythm consistent.
- On touch or coarse-pointer devices, project-card classification controls stay joined and expose
  both filter targets through the same press and focus states. The selected classification keeps the
  active accent surface visible after the press so the filter state is not lost.
- Fixed non-production environment badges add the device safe-area inset to their normal bottom-right
  offset so they remain clear of home indicators and rounded display edges without moving on desktop.

The update history uses a date column and content column on desktop, then becomes a single-column
entry list below `760px`. It uses the same neutral surfaces, typography, theme control, and
environment badge as the tracker without reproducing the dashboard metrics or filters. Its return
link uses the same two-layer pill language as the header controls: neutral at rest, with the inner
selected treatment and brand text colour appearing on hover or keyboard focus. Every update reuses
the tracker card's joined classification badge for `Sector` or `Enabler` and the specific area, but
keeps it non-interactive because filtering is scoped to the tracker grid.

## Environment Indicators

Environment indicators are intentionally small and unobtrusive:

- Development shows `DEV`.
- Preview shows `PREVIEW`.
- Production shows no badge.

Browser favicons use a simplified transparent `S` so the mark remains clear at every declared size.
The mark is orange in Development, purple in Preview, and teal in Production. Each `.ico` contains
the 16, 32, and 48px browser sizes, while a transparent 512px browser candidate helps Safari select
the same design. Every browser candidate uses a browser-specific filename so Safari cannot retain a
previous icon under the same asset path. The 180px Apple touch icon retains the complete `S` and
chart artwork on the existing dark rounded tile, where the extra detail has enough room to read.

Link previews use dedicated 1200 by 630 images rather than a favicon fallback. The card keeps the
simplified `S`, the restrained editorial palette, the tracker title, and a short projects,
milestones, and public-sources descriptor. Production is teal, Preview is purple and explicitly
labelled, and Development is orange. Open Graph and Twitter metadata must use absolute, versioned
URLs for the matching environment.

This is a professional workflow pattern. It prevents the owner from mistaking a test build for the public website. It is recommended and common for internal, staging, and preview environments.

Development, Preview, and Production use the same project-card behavior so local review matches
both deployed sites. Environment-specific presentation is limited to the badge, favicon, and
social-preview branding.

## Known Design Constraints

- Most layout styling is inline, so repeated non-color visual patterns remain harder to change consistently.
- Theme color tokens live in `src/index.css`; there is no separate JavaScript design-token module.
- There is no component library or Storybook.
- Empty sectors and enablers are not visually represented.

## Design Guardrails For Future Work

- Keep the existing scan-first tracker experience.
- Avoid large hero redesigns.
- Avoid decorative gradients or marketing-style sections.
- Keep status and milestone information easy to compare.
- Keep source links close to the claims they support.
- Keep the strategy context in the concise two-paragraph introduction; do not add a separate
  promotional About section without explicit approval.
- Keep the update history editorial and source-led. Do not style it as a product changelog or
  promotional news feed.
- Test any card or typography change on mobile before release.
