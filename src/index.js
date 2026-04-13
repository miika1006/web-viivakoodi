import "./styles/main.css";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

// ── i18n ─────────────────────────────────────────────────────
var LANG = (function() {
	var saved = localStorage.getItem("lang");
	if (saved === "fi" || saved === "en") return saved;
	return (navigator.language || "en").startsWith("fi") ? "fi" : "en";
})();

var i18n = {
	fi: {
		heroTitle:      "Web",
		heroTitleAccent:"Viivakoodinlukija",
		heroSubtitle:   "Lue viivakoodeja kameralla natiivilla <code>BarcodeDetector</code>-rajapinnalla – suoraan selaimessa.",
		startCamera:    "Käynnistä kamera",
		stopCamera:     "Pysäytä kamera",
		scanning:       "Skannataan\u2026",
		tapToScan:      "Käynnistä kamera skannataksesi",
		notSupported:   "BarcodeDetector-rajapintaa ei tueta tässä selaimessa. Kokeile Chromea tai Edgeä.",
		samplesTitle:   "Kokeile skannata näitä",
		samplesDesc:    "Osoita kamera johonkin näistä – ne toimivat yläpuolella olevan lukijan kanssa.",
		codeTitle:      "Minimikonfiguraatio",
		codeDesc:       "Kaikki mitä tarvitset viivakoodien lukemiseen kameralla – alle 25 rivillä.",
		codeLang:       "HTML",
		copyBtn:        "Kopioi",
		copiedBtn:      "Kopioitu!",
		viewLiveBtn:    "Kokeile livenä",
		compatTitle:    "Yhteensopivuus",
		compatDesc:     "BarcodeDetector on Chromium-pohjainen API. Tällä hetkellä tuettu:",
		compatSupported: "Tuettu",
		compatPartial:  "Osittainen",
		compatNone:     "Ei tuettu",
		footerText:     "Avoin lähdekoodi \u00b7 MIT \u00b7",
		footerLink:     "BarcodeDetector MDN-dokumentaatio",
		installBtn:     "Lisää kotinäytölle",
	},
	en: {
		heroTitle:      "Web Barcode",
		heroTitleAccent:"Reader",
		heroSubtitle:   "Scan barcodes with your camera using the native <code>BarcodeDetector</code> API \u2014 runs entirely in your browser.",
		startCamera:    "Start Camera",
		stopCamera:     "Stop Camera",
		scanning:       "Scanning\u2026",
		tapToScan:      "Tap Start to scan",
		notSupported:   "BarcodeDetector API not supported in this browser. Try Chrome or Edge.",
		samplesTitle:   "Try scanning these",
		samplesDesc:    "Point your camera at any of these \u2014 they work with the scanner above.",
		codeTitle:      "Minimal Setup",
		codeDesc:       "Everything you need to read barcodes with a camera \u2014 under 25 lines.",
		codeLang:       "HTML",
		copyBtn:        "Copy",
		copiedBtn:      "Copied!",
		viewLiveBtn:    "View live",
		compatTitle:    "Browser Compatibility",
		compatDesc:     "BarcodeDetector is a Chromium-based API. Currently supported in:",
		compatSupported: "Supported",
		compatPartial:  "Partial",
		compatNone:     "Not supported",
		footerText:     "Open source \u00b7 MIT \u00b7",
		footerLink:     "BarcodeDetector MDN docs",
		installBtn:     "Add to Home Screen",
	}
};

function t(key) {
	return (i18n[LANG] || i18n["en"])[key] || key;
}

// ── BarcodeDetector ──────────────────────────────────────────
var FORMATS = [
	"code_128", "code_93", "code_39", "codabar",
	"data_matrix", "ean_8", "ean_13", "itf",
	"pdf417", "qr_code", "upc_e",
];

var FORMAT_LABELS = {
	qr_code: "QR Code", ean_13: "EAN-13", ean_8: "EAN-8",
	code_128: "Code 128", code_39: "Code 39", code_93: "Code 93",
	upc_e: "UPC-E", itf: "ITF", pdf417: "PDF417",
	codabar: "Codabar", data_matrix: "Data Matrix",
};

var detector = null;
if ("BarcodeDetector" in window) {
	try {
		// Try with all desired formats first
		detector = new BarcodeDetector({ formats: FORMATS });
	} catch (e) {
		// Some platforms (e.g. Windows/macOS desktop Chrome) don't support every
		// format in the list and throw TypeError for unsupported ones.
		// Fall back to the platform's own default supported set.
		try {
			detector = new BarcodeDetector();
		} catch (e2) {
			detector = null;
		}
	}
}

// ── DOM refs ─────────────────────────────────────────────────
var video        = document.getElementById("barcodecamera");
var startBtn     = document.getElementById("startBtn");
var scanOverlay  = document.getElementById("scanOverlay");
var videoWrapper = document.getElementById("videoWrapper");
var statusBadge  = document.getElementById("statusBadge");
var compatWarn   = document.getElementById("compatWarn");
var snackbar     = document.getElementById("snackbar");
var snackBadge   = document.getElementById("snackBadge");
var snackValue   = document.getElementById("snackValue");
var snackProgress = document.getElementById("snackProgress");
var copyBtn      = document.getElementById("copyBtn");
var codeExample  = document.getElementById("codeExample");
var installBtn   = document.getElementById("installBtn");
var langToggle   = document.getElementById("langToggle");
var langFiEl     = document.getElementById("langFi");
var langEnEl     = document.getElementById("langEn");

// ── State ────────────────────────────────────────────────────
var detecting = false;
var lastSnackValue = null;
var snackTimer = null;
var deferredInstallPrompt = null;

// ── Apply translations ────────────────────────────────────────
function applyTranslations() {
	document.documentElement.lang = LANG;
	// Elements with data-i18n attribute
	var els = document.querySelectorAll("[data-i18n]");
	for (var i = 0; i < els.length; i++) {
		var el = els[i];
		var key = el.getAttribute("data-i18n");
		var html = el.getAttribute("data-i18n-html");
		if (html) {
			el.innerHTML = t(key);
		} else {
			el.textContent = t(key);
		}
	}
	// Special: topbar subtitle uses innerHTML for <code> tag
	var subtitle = document.querySelector(".topbar__subtitle");
	if (subtitle) subtitle.innerHTML = t("heroSubtitle");
}

// ── Camera ───────────────────────────────────────────────────
startBtn.addEventListener("click", toggleCamera);

function toggleCamera() {
	if (video.srcObject) {
		stopCamera();
	} else {
		startCamera();
	}
}

function startCamera() {
	if (!detector) {
		compatWarn.hidden = false;
		return;
	}
	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: { facingMode: "environment" },
	}).then(function(stream) {
		video.srcObject = stream;
		startBtn.innerHTML = svgPause() + " " + t("stopCamera");
		setStatus(t("scanning"));
	}).catch(function() {
		setStatus(LANG === "fi" ? "Kameran käyttö estetty" : "Camera access denied");
	});
}

function stopCamera() {
	if (video.srcObject) {
		video.srcObject.getTracks().forEach(function(t) { t.stop(); });
		video.srcObject = null;
	}
	detecting = false;
	scanOverlay.classList.remove("is-active");
	startBtn.innerHTML = svgCamera() + " " + t("startCamera");
	setStatus(t("tapToScan"));
}

function setStatus(text) {
	statusBadge.textContent = text;
}

function svgCamera() {
	return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
}

function svgPause() {
	return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
}

// ── Detection loop ────────────────────────────────────────────
video.addEventListener("play", function() {
	detecting = true;
	scanOverlay.classList.add("is-active");
	requestAnimationFrame(detect);
});

video.addEventListener("pause", function() {
	scanOverlay.classList.remove("is-active");
});

function detect() {
	if (!detecting || video.paused || video.ended) return;
	detector.detect(video).then(function(barcodes) {
		if (barcodes.length > 0 && barcodes[0].rawValue !== lastSnackValue) {
			var bc = barcodes[0];
			lastSnackValue = bc.rawValue;
			playDetectSound();
			showSnackbar(bc.rawValue, bc.format);
			videoWrapper.classList.remove("detected");
			videoWrapper.offsetWidth; // force reflow so animation re-triggers
			videoWrapper.classList.add("detected");
			video.pause();
			setTimeout(function() {
				videoWrapper.classList.remove("detected");
				video.play();
				lastSnackValue = null;
			}, 2000);
			return;
		}
		requestAnimationFrame(detect);
	}).catch(function() {
		requestAnimationFrame(detect);
	});
}

// ── Detection sound (Web Audio API) ──────────────────────────
var audioCtx = null;

function playDetectSound() {
	try {
		if (!audioCtx) {
			audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		}
		// Two-tone pleasant "ping": high note then a softer harmonic
		var now = audioCtx.currentTime;

		function tone(freq, startTime, duration, gain) {
			var osc = audioCtx.createOscillator();
			var gainNode = audioCtx.createGain();
			osc.connect(gainNode);
			gainNode.connect(audioCtx.destination);
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq, startTime);
			gainNode.gain.setValueAtTime(0, startTime);
			gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
			gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
			osc.start(startTime);
			osc.stop(startTime + duration);
		}

		tone(1047, now,        0.18, 0.30); // C6 — main ping
		tone(1319, now + 0.09, 0.14, 0.18); // E6 — harmonic follow
	} catch (e) {
		// AudioContext blocked or unavailable — silently ignore
	}
}

// ── Snackbar ─────────────────────────────────────────────────
function showSnackbar(value, format) {
	clearTimeout(snackTimer);
	snackBadge.textContent = FORMAT_LABELS[format] || format.replace(/_/g, " ");
	snackValue.textContent = value;

	snackbar.classList.remove("is-visible");
	snackProgress.style.animation = "none";
	snackbar.hidden = false;
	snackbar.offsetHeight; // eslint-disable-line no-unused-expressions
	snackProgress.style.animation = "";
	snackbar.classList.add("is-visible");

	snackTimer = setTimeout(hideSnackbar, 4000);
}

function hideSnackbar() {
	snackbar.classList.remove("is-visible");
	snackbar.addEventListener("transitionend", function handler() {
		snackbar.hidden = true;
		snackbar.removeEventListener("transitionend", handler);
	});
}

// ── Copy button ───────────────────────────────────────────────
var CODE_RAW = [
	'<!DOCTYPE html>',
	'<html>',
	'<head>',
	'  <meta charset="utf-8" />',
	'  <title>Barcode Scanner</title>',
	'</head>',
	'<body>',
	'  <video id="v" autoplay muted playsinline style="width:100%"></video>',
	'',
	'  <script>',
	"    const video = document.getElementById('v');",
	'',
	'    navigator.mediaDevices',
	"      .getUserMedia({ video: { facingMode: 'environment' } })",
	'      .then(stream => (video.srcObject = stream));',
	'',
	'    const detector = new BarcodeDetector({',
	"      formats: ['qr_code', 'ean_13', 'code_128']",
	'    });',
	'',
	'    function scan() {',
	'      if (video.paused) return;',
	'      detector.detect(video).then(codes => {',
	'        if (codes.length > 0) {',
	"          alert(codes[0].format + ': ' + codes[0].rawValue);",
	'          video.pause();',
	'          setTimeout(() => video.play(), 2000);',
	'        }',
	'      });',
	'      requestAnimationFrame(scan);',
	'    }',
	'',
	"    video.addEventListener('play', () => setTimeout(scan, 500));",
	'  </script>',
	'</body>',
	'</html>',
].join('\n');

function highlightCode(code) {
	function esc(s) {
		return s
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;");
	}
	function sp(cls, s) {
		return '<span class="hl-' + cls + '">' + esc(s) + "</span>";
	}

	var JS_KEYWORDS = ["const", "let", "var", "function", "return", "if",
		"else", "new", "for", "while", "of", "in", "typeof"];
	var JS_BUILTINS = ["document", "navigator", "window", "console",
		"setTimeout", "requestAnimationFrame", "BarcodeDetector",
		"alert", "mediaDevices", "serviceWorker", "Promise"];

	var out = "";
	var pos = 0;
	var inScript = false;
	var n = code.length;

	while (pos < n) {
		// Script end tag
		if (inScript && code.slice(pos, pos + 9) === "</script>") {
			out += sp("tag-bracket", "</") + sp("tag-name", "script") + sp("tag-bracket", ">");
			pos += 9;
			inScript = false;
			continue;
		}

		if (inScript) {
			var ch = code[pos];

			// Line comment
			if (code.slice(pos, pos + 2) === "//") {
				var end = code.indexOf("\n", pos);
				if (end === -1) end = n;
				out += sp("comment", code.slice(pos, end));
				pos = end;
				continue;
			}

			// Single-quoted string
			if (ch === "'") {
				var j = pos + 1;
				while (j < n && code[j] !== "'" && code[j] !== "\n") {
					if (code[j] === "\\") j++;
					j++;
				}
				if (j < n && code[j] === "'") j++;
				out += sp("string", code.slice(pos, j));
				pos = j;
				continue;
			}

			// Backtick string
			if (ch === "`") {
				var j = pos + 1;
				while (j < n && code[j] !== "`") {
					if (code[j] === "\\") j++;
					j++;
				}
				if (j < n) j++;
				out += sp("string", code.slice(pos, j));
				pos = j;
				continue;
			}

			// Arrow =>
			if (code.slice(pos, pos + 2) === "=>") {
				out += sp("keyword", "=>");
				pos += 2;
				continue;
			}

			// Identifier / keyword / builtin
			if (/[a-zA-Z_$]/.test(ch)) {
				var j = pos;
				while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
				var word = code.slice(pos, j);
				if (JS_KEYWORDS.indexOf(word) !== -1) {
					out += sp("keyword", word);
				} else if (JS_BUILTINS.indexOf(word) !== -1) {
					out += sp("builtin", word);
				} else {
					out += esc(word);
				}
				pos = j;
				continue;
			}

			// Number
			if (/[0-9]/.test(ch)) {
				var j = pos;
				while (j < n && /[0-9.]/.test(code[j])) j++;
				out += sp("number", code.slice(pos, j));
				pos = j;
				continue;
			}

			// Dot accessor — don't colour, but parse so identifiers after . aren't matched as builtins
			out += esc(ch);
			pos++;

		} else {
			// HTML mode
			var ch = code[pos];

			// DOCTYPE
			if (code.slice(pos, pos + 9).toUpperCase() === "<!DOCTYPE") {
				var end = code.indexOf(">", pos);
				if (end === -1) end = n - 1;
				out += sp("doctype", code.slice(pos, end + 1));
				pos = end + 1;
				continue;
			}

			// Opening / closing tag
			if (ch === "<") {
				var isClose = code[pos + 1] === "/";
				var nameStart = pos + (isClose ? 2 : 1);
				var j = nameStart;
				while (j < n && /[a-zA-Z0-9-]/.test(code[j])) j++;
				var tagName = code.slice(nameStart, j);

				if (tagName === "script") inScript = !isClose;

				out += sp("tag-bracket", isClose ? "</" : "<");
				out += sp("tag-name", tagName);
				pos = j;

				// Attributes
				while (pos < n && code[pos] !== ">") {
					// Self-close
					if (code.slice(pos, pos + 2) === "/>") {
						out += sp("tag-bracket", "/>");
						pos += 2;
						break;
					}
					// Attribute name
					if (/[a-zA-Z_:@*#.]/.test(code[pos])) {
						var k = pos;
						while (k < n && /[a-zA-Z0-9_:.-]/.test(code[k])) k++;
						out += sp("attr-name", code.slice(pos, k));
						pos = k;
						continue;
					}
					// = sign
					if (code[pos] === "=") {
						out += sp("tag-bracket", "=");
						pos++;
						continue;
					}
					// Attribute value (double-quoted)
					if (code[pos] === '"') {
						var k = code.indexOf('"', pos + 1);
						if (k === -1) k = n - 1;
						out += sp("attr-value", code.slice(pos, k + 1));
						pos = k + 1;
						continue;
					}
					out += esc(code[pos]);
					pos++;
				}

				// Closing >
				if (pos < n && code[pos] === ">") {
					out += sp("tag-bracket", ">");
					pos++;
				}
				continue;
			}

			out += esc(ch);
			pos++;
		}
	}

	return out;
}

copyBtn.addEventListener("click", function() {
	var ta = document.createElement("textarea");
	ta.value = CODE_RAW;
	document.body.appendChild(ta);
	ta.select();
	document.execCommand("copy");
	document.body.removeChild(ta);
	copyBtn.textContent = t("copiedBtn");
	copyBtn.classList.add("copied");
	setTimeout(function() {
		copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
		copyBtn.classList.remove("copied");
	}, 2000);
});

function svgCopy() {
	return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
}

// ── Language toggle ───────────────────────────────────────────
function updateLangToggle() {
	if (langFiEl) langFiEl.classList.toggle("is-active", LANG === "fi");
	if (langEnEl) langEnEl.classList.toggle("is-active", LANG === "en");
}

if (langToggle) {
	langToggle.addEventListener("click", function() {
		LANG = (LANG === "fi") ? "en" : "fi";
		localStorage.setItem("lang", LANG);
		applyTranslations();
		updateLangToggle();
		// Refresh dynamic labels
		if (video.srcObject) {
			startBtn.innerHTML = svgPause() + " " + t("stopCamera");
			setStatus(t("scanning"));
		} else {
			startBtn.innerHTML = svgCamera() + " " + t("startCamera");
			setStatus(t("tapToScan"));
		}
		copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
		var liveBtn = document.getElementById("liveBtn");
		if (liveBtn) liveBtn.textContent = t("viewLiveBtn");
	});
}

// ── PWA install prompt ────────────────────────────────────────
window.addEventListener("beforeinstallprompt", function(e) {
	e.preventDefault();
	deferredInstallPrompt = e;
	if (installBtn) installBtn.hidden = false;
});

window.addEventListener("appinstalled", function() {
	if (installBtn) installBtn.hidden = true;
	deferredInstallPrompt = null;
});

if (installBtn) {
	installBtn.addEventListener("click", function() {
		if (!deferredInstallPrompt) return;
		deferredInstallPrompt.prompt();
		deferredInstallPrompt.userChoice.then(function() {
			deferredInstallPrompt = null;
			if (installBtn) installBtn.hidden = true;
		});
	});
}

// ── Sample barcode generation ─────────────────────────────────
function generateSamples() {
	var opts = {
		lineColor: "#e2e8f0",
		background: "transparent",
		displayValue: true,
		fontSize: 11,
		fontOptions: "bold",
		textMargin: 4,
		margin: 4,
		width: 1.4,
		height: 52,
	};
	function o(extra) {
		return Object.assign({}, opts, extra);
	}

	QRCode.toCanvas(
		document.getElementById("qr-canvas"),
		"https://web-viivakoodi.vercel.app/",
		{ width: 160, margin: 1, color: { dark: "#e2e8f0", light: "#00000000" } }
	).catch(function() {});

	JsBarcode("#ean13-svg",  "5901234123457", o({ format: "EAN13" }));
	JsBarcode("#code128-svg","WEB-BARCODE",   o({ format: "CODE128" }));
	JsBarcode("#code39-svg", "CODE39",        o({ format: "CODE39" }));
	JsBarcode("#ean8-svg",   "96385074",      o({ format: "EAN8" }));
}

// ── Init ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", function() {
	applyTranslations();
	updateLangToggle();
	generateSamples();

	// Render syntax-highlighted code example
	codeExample.innerHTML = highlightCode(CODE_RAW);

	// Set initial button state with SVG
	startBtn.innerHTML = svgCamera() + " " + t("startCamera");
	copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
	var liveBtn = document.getElementById("liveBtn");
	if (liveBtn) liveBtn.textContent = t("viewLiveBtn");
	setStatus(t("tapToScan"));

	if (!detector) {
		compatWarn.hidden = false;
		startBtn.disabled = true;
	} else if (BarcodeDetector.getSupportedFormats) {
		// Rebuild detector with only the formats this platform actually supports
		BarcodeDetector.getSupportedFormats().then(function(supported) {
			var filtered = FORMATS.filter(function(f) { return supported.indexOf(f) !== -1; });
			if (filtered.length > 0) {
				try { detector = new BarcodeDetector({ formats: filtered }); } catch (e) { /* keep existing */ }
			}
		}).catch(function() { /* ignore */ });
	}

	// Check if URL has ?action=scan shortcut (PWA shortcut)
	if (window.location.search.indexOf("action=scan") !== -1 && detector) {
		startCamera();
	}
});
