# CI: Docs check for UI and build changes

Pull requests into `preview` or `main` run the **Docs check** workflow
(`.github/workflows/docs-check.yml`) on `opened`, `synchronize`,
`reopened`, `labeled`, and `unlabeled` events.

## What it enforces

If a PR changes files that affect how the site **looks or behaves**, it
must also change at least one file under `docs/` in the same PR.

The watched path list lives at the top of
[`scripts/check-pr-docs.mjs`](../scripts/check-pr-docs.mjs):

- `src/**/*.jsx`
- `src/**/*.css`
- `public/` favicons, Apple touch icons, and social preview images
  (`favicon*`, `apple-touch-icon*`, `social-preview*`)
- `scripts/prerender.mjs` and `scripts/write-cname.mjs` (preview/production builds)
- `vite.config.js`

**Not watched:** tracker data (`src/trackerData.js`), localization,
update history, methodology-only data paths, and other content-only PRs.
Those PRs are not blocked by this check.

## Escape hatch

Add the GitHub label **`no-docs-needed`** when the PR touches watched
files but genuinely needs no documentation update. The workflow creates
this label in the repository if it is missing.

## Failure message

When the check fails, CI prints:

> This PR changes how the site looks or behaves but doesn't update docs/. Update docs/design.md, or add the no-docs-needed label if no doc change is needed.

## Preview → main promotion

A pull request whose **head** branch is `preview` and **base** is `main`
is treated as a branch promotion. The check **always passes** for that
shape, so production promotion is not blocked by the aggregate diff
(which can include UI changes already documented on `preview`).

## Related automation

- **Validate changes** (`.github/workflows/validate.yml`) still runs
  lint, content checks, and builds on PRs.
- Agents should follow `AGENTS.md` documentation expectations; this
  workflow automates one slice of that policy for UI/build PRs.
