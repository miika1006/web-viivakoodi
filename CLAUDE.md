# CLAUDE.md

## Project

**Web Barcode Reader** — a demo of the native `BarcodeDetector` Web API.
Scans barcodes via camera, shows an animated snackbar on detection, and
demonstrates the API with a minimal code example and generated barcode samples.

- **Live site:** https://web-viivakoodi.vercel.app/
- **Dev branch:** `claude/redesign-barcode-scanner-G8iUO`

## Commands

```bash
yarn install  # install all dependencies
yarn dev      # webpack-dev-server → http://localhost:8080 (live reload)
yarn build    # production bundle → dist/bundle.js
```

## Architecture

```
dist/index.html        Static HTML shell — SEO, OG tags, JSON-LD, all DOM structure
src/index.js           App entry — camera, BarcodeDetector loop, snackbar, sample generation
src/styles/main.css    All styles (injected at runtime via style-loader/css-loader)
dist/bundle.js         Build artifact — do NOT edit directly
```

Webpack bundles `src/index.js` → `dist/bundle.js`.
`dist/` is the static server root; `dist/index.html` loads `bundle.js` with `defer`.

## Key constraints

- `BarcodeDetector` must be created **once** at module level, not inside the detection loop.
- The `<video>` element needs `playsinline` for iOS Safari to autoplay inline.
- Detection loop uses `requestAnimationFrame` + `detector.detect(video)`.
  After a detection, the loop is paused while video is paused to avoid duplicate hits.
- Webpack target is `["web", "es5"]` — use ES5-compatible syntax in `src/`.
  Arrow functions, `const`, template literals are fine (Babel transpiles them),
  but avoid ES2015+ APIs that have no polyfill (e.g. optional chaining `?.` is
  only safe if `@babel/plugin-proposal-optional-chaining` is configured).

## Runtime dependencies

| Package | Purpose |
|---------|---------|
| `jsbarcode` | Renders 1D barcodes (EAN-13, Code 128, Code 39, EAN-8) to SVG/canvas |
| `qrcode` | Renders QR codes to canvas |

## Adding barcode samples

In `src/index.js` → `generateSamples()`:

```js
// 1D barcode (SVG element with id="my-svg")
JsBarcode("#my-svg", "VALUE", {
  format: "CODE128",
  lineColor: "#e2e8f0",
  background: "transparent",
});

// QR code (canvas element with id="my-canvas")
QRCode.toCanvas(document.getElementById("my-canvas"), "VALUE", {
  width: 160,
  color: { dark: "#e2e8f0", light: "#00000000" },
});
```

Add a matching `.sample-card` div in `dist/index.html` with the correct `id`.

## Deployment

Vercel auto-deploys from the `main` branch.
- **Build command:** `yarn build`
- **Output directory:** `dist`
- No server-side code; purely static.
