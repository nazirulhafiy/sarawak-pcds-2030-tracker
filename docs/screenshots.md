# Screenshot capture (`tools/shots.mjs`)

Use this Node CLI for tracker UI screenshots in PRs, design reviews, and visual comparisons. It drives **system Google Chrome** via `playwright-core` (no bundled browser download). Install tool deps once: `npm install` in `tools/`.

## Site config (`tools/shots.config.json`)

Tracker-specific defaults live beside the script (default URL, theme keys, default crop, output dir). The script in `tools/shots.mjs` is shared across repos; do not fork it for PCDS-only behaviour—adjust `tools/shots.config.json` instead.

This repo’s config sets `defaultUrl` to preview, `pcds-theme` / `data-theme`, intro skip in `sessionStorage`, default crop `.project-card`, and phone + light/dark.

## Quick start

```bash
cd tools && npm install && cd ..
node tools/shots.mjs \
  --config tools/shots.config.json \
  --url https://preview.pcds2030.com \
  --out ./shots \
  --name my-change \
  --devices phone \
  --themes light,dark
```

Omit `--url` to use `defaultUrl` from config. Omit `--crop` to use the configured `.project-card` crop (or pass `--no-crop` for viewport/full-page).

For a local build, pass the `dist/` directory; the tool serves it on a temporary `127.0.0.1` port.

## Defaults agents should use

For every UI change screenshot in a PR or review:

- **Device:** `phone` (390×844 CSS px, `deviceScaleFactor` 3 → ~1170px-wide PNG, no downscaling)
- **Crop:** the changed region (often the first affected `.project-card`), with `--pad 24` (config default)
- **Themes:** `light` and `dark`

Desktop captures use 1280×900 at scale 1; pass `--desktop-scale 2` when higher resolution is needed.

## CLI reference

| Flag | Purpose |
|------|---------|
| `--config` | Path to JSON config (default: `tools/shots.config.json` next to the script) |
| `--url` | HTTPS URL, HTML file, or path to a built site (`dist/`); default from config |
| `--out` | Output directory (default from config, else `shots`) |
| `--name` | Filename prefix (default from config or derived from URL) |
| `--crop` | CSS selector; full viewport width, height clamped ~0.75–1.3× width (see config `crop`) |
| `--no-crop` | Ignore configured default crop |
| `--clip` | Manual `x,y,width,height` clip in CSS pixels (overrides crop) |
| `--pad` | Padding around `--crop` (default `24`) |
| `--full-page` | Full scrollable page when not using crop/clip (else first viewport) |
| `--themes` | Comma-separated: `light`, `dark` |
| `--devices` | Comma-separated: `phone`, `desktop` |
| `--desktop-scale` | `deviceScaleFactor` for desktop (default `1`) |
| `--compare` | `<beforeUrl> <afterUrl>` — writes `-before`, `-after`, and side-by-side `-compare` PNGs; logs differing pixel count |

Output filenames: `<name>-<device>-<theme>[-before|-after|-compare].png`.

## Theme and render stability

The site exposes **light and dark** only. Theme is set before first paint by matching production behaviour (see config `theme` and `sessionStorage`):

- `localStorage` key `pcds-theme`
- `html[data-theme]` and `color-scheme` (see `index.html` and `src/theme.js`)

The tool disables CSS transitions/animations, waits for `document.fonts.ready` and `readySelector` / crop, uses an opaque page background, and logs the computed `body` background color.

Without `--crop`, `--clip`, or `--full-page`, the capture is the first viewport (above-the-fold).

## Compare mode

```bash
node tools/shots.mjs \
  --config tools/shots.config.json \
  --compare https://preview.pcds2030.com/ ./dist/ \
  --out ./compare \
  --name nav \
  --devices phone \
  --themes light
```

## Build isolation

`tools/` lives outside `src/` and is not imported by the Vite app; it is never bundled into production or preview build output.
