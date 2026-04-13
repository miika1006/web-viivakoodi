# Viivakoodinlukija / Web Barcode Reader

**Suomi** | [English](#english)

---

## Suomi

Selainpohjainen viivakoodinlukija, joka käyttää natiivia [`BarcodeDetector`](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector) Web API:a. Sovellus avaa kameran ja tunnistaa viivakoodit reaaliaikaisesti — ei lisäosia, ei palvelinta, ei latauksia.

🌐 **Live-demo:** https://web-viivakoodi.vercel.app/

### Tuetut formaatit

QR Code · EAN-13 · EAN-8 · Code 128 · Code 39 · Code 93 · Codabar · ITF · PDF417 · UPC-E · Data Matrix

### Selain- ja laiteyhteensopivuus

| Selain / Alusta | Android | Windows | macOS | Linux | iOS / iPadOS |
|---|:---:|:---:|:---:|:---:|:---:|
| **Chrome 88+** | ✅ | ❌ | ✅ | ✅ | ❌ |
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

### Minimiesimerkki

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Barcode Scanner</title>
</head>
<body>
  <video id="v" autoplay muted playsinline style="width:100%"></video>

  <script>
    const video = document.getElementById('v');

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => (video.srcObject = stream));

    const detector = new BarcodeDetector({
      formats: ['qr_code', 'ean_13', 'code_128']
    });

    function scan() {
      if (video.paused) return;
      detector.detect(video).then(codes => {
        if (codes.length > 0) {
          alert(codes[0].format + ': ' + codes[0].rawValue);
          video.pause();
          setTimeout(() => video.play(), 2000);
        }
      });
      requestAnimationFrame(scan);
    }

    video.addEventListener('play', () => setTimeout(scan, 500));
  </script>
</body>
</html>
```

Toimiva demo: [`dist/example.html`](dist/example.html)

### Kehitys

Vaatii **Node.js 24+** (katso `.nvmrc`). nvm:llä: `nvm use`.

```bash
yarn install     # asenna riippuvuudet
yarn dev         # kehityspalvelin → http://localhost:8080
yarn build       # tuotantokooste → dist/bundle.js
```

---

## English

A browser-based barcode reader using the native [`BarcodeDetector`](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector) Web API. Opens the camera and detects barcodes in real time — no plugins, no server, no uploads.

🌐 **Live demo:** https://web-viivakoodi.vercel.app/

### Supported formats

QR Code · EAN-13 · EAN-8 · Code 128 · Code 39 · Code 93 · Codabar · ITF · PDF417 · UPC-E · Data Matrix

### Browser & device compatibility

| Browser / Platform | Android | Windows | macOS | Linux | iOS / iPadOS |
|---|:---:|:---:|:---:|:---:|:---:|
| **Chrome 88+** | ✅ | ❌ | ✅ | ✅ | ❌ |
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

### Minimal example

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Barcode Scanner</title>
</head>
<body>
  <video id="v" autoplay muted playsinline style="width:100%"></video>

  <script>
    const video = document.getElementById('v');

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => (video.srcObject = stream));

    const detector = new BarcodeDetector({
      formats: ['qr_code', 'ean_13', 'code_128']
    });

    function scan() {
      if (video.paused) return;
      detector.detect(video).then(codes => {
        if (codes.length > 0) {
          alert(codes[0].format + ': ' + codes[0].rawValue);
          video.pause();
          setTimeout(() => video.play(), 2000);
        }
      });
      requestAnimationFrame(scan);
    }

    video.addEventListener('play', () => setTimeout(scan, 500));
  </script>
</body>
</html>
```

Live demo: [`dist/example.html`](dist/example.html)

### Development

Requires **Node.js 24+** (see `.nvmrc`). With nvm: `nvm use`.

```bash
yarn install     # install dependencies
yarn dev         # dev server → http://localhost:8080
yarn build       # production bundle → dist/bundle.js
```

### Key implementation notes

- `BarcodeDetector` is instantiated **once** at module level — not inside the detection loop
- The `<video>` element requires `playsinline` for iOS Safari
- Camera permission requires HTTPS in production (Vercel provides this automatically)
- Language detection: `navigator.language.startsWith('fi') ? 'fi' : 'en'`, with `localStorage` override

### Deployment

Vercel auto-deploys from the `main` branch.

- **Build command:** `yarn build`
- **Output directory:** `dist`
- No server-side code; purely static.

---

## License

MIT © Miika
