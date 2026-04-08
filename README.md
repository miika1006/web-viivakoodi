# Viivakoodinlukija / Web Barcode Reader

**Suomi** | [English](#english)

---

## Suomi

Selainpohjainen viivakoodinlukija, joka käyttää natiivia [`BarcodeDetector`](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector) Web API:a. Sovellus avaa kameran ja tunnistaa viivakoodit reaaliaikaisesti — ei lisäosia, ei palvelinta, ei latauksia.

🌐 **Live-demo:** https://web-viivakoodi.vercel.app/

### Ominaisuudet

- 📷 Reaaliaikainen viivakoodin tunnistus kameralta
- 🎯 Animoitu snackbar näyttää tunnistetun koodin tyypin ja arvon
- 🌍 Kaksikielinen käyttöliittymä (suomi / englanti, automaattinen tunnistus)
- 📦 Esimerkkiviivakoodeja skannattavaksi (QR, EAN-13, Code 128, Code 39, EAN-8)
- 📋 Kopioitava minimiesimerkki omaan käyttöön
- 📱 PWA — lisättävissä kotinäytölle
- 🔒 Kaikki käsittely tapahtuu laitteella, ei verkkoyhteyksiä kuville

### Tuetut formaatit

QR Code · EAN-13 · EAN-8 · Code 128 · Code 39 · Code 93 · Codabar · ITF · PDF417 · UPC-E · Data Matrix

### Selain- ja laiteyhteensopivuus

| Selain / Alusta | Android | Windows | macOS | Linux | iOS / iPadOS |
|---|:---:|:---:|:---:|:---:|:---:|
| **Chrome 88+** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Edge 88+** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Opera 74+** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Samsung Internet 13+** | ✅ | — | — | — | — |
| **Firefox** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Safari** | — | — | ❌ | — | ❌ |
| **Chrome / Firefox iOS** | — | — | — | — | ❌ |

> **Huom:** iOS ei tue `BarcodeDetector`-rajapintaa millään selaimella, koska kaikki iOS-selaimet käyttävät Applen WebKit-moottoria, joka ei tue tätä API:a.

### Miksi osa selaimista ei tue API:a

`BarcodeDetector` kuuluu [Fugu-projektiin](https://developer.chrome.com/capabilities) — Googlen johtamaan modernien web-ominaisuuksien kokoelmaan. Se on toteutettu Chromiumissa (Chrome, Edge, Opera, Samsung Internet), mutta:

- **Firefox:** Ei toteutettu. [Seurantaissue](https://bugzilla.mozilla.org/show_bug.cgi?id=1639900) on olemassa, mutta aktiivista kehitystä ei ole.
- **Safari/WebKit:** Ei toteutettu. [WebKit-bugi](https://bugs.webkit.org/show_bug.cgi?id=206328) on auki. Kaikki iOS-selaimet käyttävät WebKitiä, joten iOS-tuki on estetty kunnes Apple toteuttaa sen.

### Kehitys

Vaatii **Node.js 24+** (katso `.nvmrc`). nvm:llä: `nvm use`.

```bash
yarn install     # asenna riippuvuudet
yarn dev         # kehityspalvelin → http://localhost:8080
yarn build       # tuotantokooste → dist/bundle.js
```

### Arkkitehtuuri

```
dist/index.html        Staattinen HTML (SEO, DOM-rakenne)
src/index.js           Sovelluslogiikka (kamera, tunnistus, i18n, PWA)
src/styles/main.css    Kaikki tyylit (injektoidaan webpack-paketissa)
dist/bundle.js         Webpack-kooste — älä muokkaa suoraan
dist/manifest.json     PWA-manifest
dist/sw.js             Service worker (PWA-asennus)
dist/icons/            Sovelluskuvakkeet (SVG + PNG)
```

---

## English

A browser-based barcode reader using the native [`BarcodeDetector`](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector) Web API. Opens the camera and detects barcodes in real time — no plugins, no server, no uploads.

🌐 **Live demo:** https://web-viivakoodi.vercel.app/

### Features

- 📷 Real-time barcode detection from camera
- 🎯 Animated snackbar shows detected barcode type and value
- 🌍 Bilingual UI (Finnish / English, auto-detected from browser language)
- 📦 Sample barcodes to scan (QR, EAN-13, Code 128, Code 39, EAN-8)
- 📋 Copyable minimal code example
- 📱 PWA — can be added to home screen
- 🔒 All processing happens on-device, no network requests for images

### Supported formats

QR Code · EAN-13 · EAN-8 · Code 128 · Code 39 · Code 93 · Codabar · ITF · PDF417 · UPC-E · Data Matrix

### Browser & device compatibility

| Browser / Platform | Android | Windows | macOS | Linux | iOS / iPadOS |
|---|:---:|:---:|:---:|:---:|:---:|
| **Chrome 88+** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Edge 88+** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Opera 74+** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Samsung Internet 13+** | ✅ | — | — | — | — |
| **Firefox** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Safari** | — | — | ❌ | — | ❌ |
| **Chrome / Firefox on iOS** | — | — | — | — | ❌ |

> **Note:** iOS does not support the `BarcodeDetector` API in any browser because all iOS browsers are required to use Apple's WebKit engine, which does not implement this API.

### Why some browsers don't support it

The `BarcodeDetector` API is part of the [Fugu project](https://developer.chrome.com/capabilities) — a set of modern web capabilities led by Google. It has been implemented in Chromium (Chrome, Edge, Opera, Samsung Internet) but:

- **Firefox:** Not implemented. A [tracking issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1639900) exists but no active development.
- **Safari/WebKit:** Not implemented. A [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=206328) is open. All browsers on iOS use WebKit, so iOS support is blocked until Apple implements it.

### Development

Requires **Node.js 24+** (see `.nvmrc`). With nvm: `nvm use`.

```bash
yarn install     # install dependencies
yarn dev         # dev server → http://localhost:8080
yarn build       # production bundle → dist/bundle.js
```

### Architecture

```
dist/index.html        Static HTML shell (SEO, DOM structure)
src/index.js           App logic (camera, detection, i18n, PWA)
src/styles/main.css    All styles (injected via webpack bundle)
dist/bundle.js         Webpack output — do NOT edit directly
dist/manifest.json     PWA web app manifest
dist/sw.js             Service worker (enables PWA install)
dist/icons/            App icons (SVG + PNG)
```

### Key implementation notes

- `BarcodeDetector` is instantiated **once** at module level — not inside the detection loop
- The `<video>` element requires `playsinline` for iOS Safari
- Camera permission requires HTTPS in production (Vercel provides this automatically)
- Language detection: `navigator.language.startsWith('fi') ? 'fi' : 'en'`

### Deployment

Vercel auto-deploys from the `main` branch.

- **Build command:** `yarn build`
- **Output directory:** `dist`
- No server-side code; purely static.

---

## License

MIT © Miika
