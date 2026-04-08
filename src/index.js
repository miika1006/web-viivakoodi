import "./styles/main.css";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

// ── i18n ─────────────────────────────────────────────────────
var LANG = (navigator.language || "en").startsWith("fi") ? "fi" : "en";

var i18n = {
	fi: {
		heroBadge:      "Natiivi selain-API",
		heroTitle:      "Web",
		heroTitleAccent:"Viivakoodinlukija",
		heroSubtitle:   "Lue viivakoodeja kameralla natiivilla <code>BarcodeDetector</code>-rajapinnalla. Ei lisäosia, ei palvelinta – toimii kokonaan selaimessa.",
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
		aboutTitle:     "Tietoa rajapinnasta",
		about1Title:    "Natiivi suorituskyky",
		about1Desc:     "Toimii laitteistokiihdytetyllä kuvaenkäsittelyllä suoraan selaimessa – ei JavaScript-viivakoodikirjastoja tarvita.",
		about2Title:    "Yksityisyys ensin",
		about2Desc:     "Kamerakuvat eivät poistu laitteeltasi. Kaikki tunnistus tapahtuu paikallisesti ilman verkkoyhteyksiä.",
		about3Title:    "Ei riippuvuuksia",
		about3Desc:     "Yksi natiivi API-kutsu. Ei kirjastoja, ei WebAssembly-paketteja, ei polyfilleja. Toimii Chromessa ja Edgessä.",
		about4Title:    "11 formaattia",
		about4Desc:     "QR-koodi, EAN-13, EAN-8, Code 128, Code 39, Code 93, Codabar, ITF, PDF417, UPC-E, Data Matrix.",
		compatTitle:    "Yhteensopivuus",
		compatDesc:     "BarcodeDetector on Chromium-pohjainen API. Tällä hetkellä tuettu:",
		compatSupported: "Tuettu",
		compatPartial:  "Osittainen",
		compatNone:     "Ei tuettu",
		footerText:     "Avoin lähdekoodi \u00b7 MIT \u00b7",
		footerLink:     "BarcodeDetector MDN-dokumentaatio",
		installTitle:   "Lisää kotinäytölle",
		installDesc:    "Lisää kotinäytölle saadaksesi sovelluksen kaltaisen käyttökokemuksen.",
		installBtn:     "Lisää kotinäytölle",
	},
	en: {
		heroBadge:      "Native Browser API",
		heroTitle:      "Web Barcode",
		heroTitleAccent:"Reader",
		heroSubtitle:   "Scan barcodes with your camera using the native <code>BarcodeDetector</code> API. No plugins, no uploads \u2014 runs entirely in your browser.",
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
		aboutTitle:     "About the API",
		about1Title:    "Native Performance",
		about1Desc:     "Runs in the browser using hardware-accelerated image processing \u2014 no JavaScript barcode libraries needed.",
		about2Title:    "Privacy First",
		about2Desc:     "Camera frames never leave your device. All detection happens locally with zero network requests.",
		about3Title:    "Zero Dependencies",
		about3Desc:     "One native API call. No libraries, no WebAssembly bundles, no polyfills. Works in Chrome and Edge.",
		about4Title:    "11 Formats",
		about4Desc:     "QR Code, EAN-13, EAN-8, Code 128, Code 39, Code 93, Codabar, ITF, PDF417, UPC-E, Data Matrix.",
		compatTitle:    "Browser Compatibility",
		compatDesc:     "BarcodeDetector is a Chromium-based API. Currently supported in:",
		compatSupported: "Supported",
		compatPartial:  "Partial",
		compatNone:     "Not supported",
		footerText:     "Open source \u00b7 MIT \u00b7",
		footerLink:     "BarcodeDetector MDN docs",
		installTitle:   "Add to Home Screen",
		installDesc:    "Add it to your home screen for an app-like experience.",
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

var detector = ("BarcodeDetector" in window)
	? new BarcodeDetector({ formats: FORMATS })
	: null;

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
var installBanner = document.getElementById("installBanner");
var installBtn   = document.getElementById("installBtn");

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
	// Special: hero subtitle uses innerHTML for <code> tag
	var subtitle = document.querySelector(".hero__subtitle");
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
copyBtn.addEventListener("click", function() {
	var ta = document.createElement("textarea");
	ta.value = codeExample.textContent;
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

// ── PWA install prompt ────────────────────────────────────────
window.addEventListener("beforeinstallprompt", function(e) {
	e.preventDefault();
	deferredInstallPrompt = e;
	if (installBanner) installBanner.hidden = false;
});

window.addEventListener("appinstalled", function() {
	if (installBanner) installBanner.hidden = true;
	deferredInstallPrompt = null;
});

if (installBtn) {
	installBtn.addEventListener("click", function() {
		if (!deferredInstallPrompt) return;
		deferredInstallPrompt.prompt();
		deferredInstallPrompt.userChoice.then(function() {
			deferredInstallPrompt = null;
			if (installBanner) installBanner.hidden = true;
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

// ── Service worker registration ───────────────────────────────
function registerSW() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("/sw.js").catch(function() {});
	}
}

// ── Init ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", function() {
	applyTranslations();
	generateSamples();
	registerSW();

	// Set initial button state with SVG
	startBtn.innerHTML = svgCamera() + " " + t("startCamera");
	copyBtn.innerHTML = svgCopy() + " " + t("copyBtn");
	setStatus(t("tapToScan"));

	if (!detector) {
		compatWarn.hidden = false;
		startBtn.disabled = true;
	}

	// Check if URL has ?action=scan shortcut (PWA shortcut)
	if (window.location.search.indexOf("action=scan") !== -1 && detector) {
		startCamera();
	}
});
