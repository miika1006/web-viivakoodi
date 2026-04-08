import "./styles/main.css";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

// ── BarcodeDetector ──────────────────────────────────────────
const FORMATS = [
	"code_128", "code_93", "code_39", "codabar",
	"data_matrix", "ean_8", "ean_13", "itf",
	"pdf417", "qr_code", "upc_e",
];

const detector = ("BarcodeDetector" in window)
	? new BarcodeDetector({ formats: FORMATS })
	: null;

// ── DOM refs ─────────────────────────────────────────────────
const video      = document.getElementById("barcodecamera");
const startBtn   = document.getElementById("startBtn");
const scanOverlay  = document.getElementById("scanOverlay");
const videoWrapper = document.getElementById("videoWrapper");
const statusBadge  = document.getElementById("statusBadge");
const compatWarn   = document.getElementById("compatWarn");
const snackbar     = document.getElementById("snackbar");
const snackBadge   = document.getElementById("snackBadge");
const snackValue   = document.getElementById("snackValue");
const snackProgress = document.getElementById("snackProgress");
const copyBtn      = document.getElementById("copyBtn");
const codeExample  = document.getElementById("codeExample");

// ── State ────────────────────────────────────────────────────
let detecting = false;
let lastSnackValue = null;
let snackTimer = null;

// ── Camera ───────────────────────────────────────────────────
startBtn.addEventListener("click", toggleCamera);

async function toggleCamera() {
	if (video.srcObject) {
		stopCamera();
	} else {
		await startCamera();
	}
}

async function startCamera() {
	if (!detector) {
		compatWarn.hidden = false;
		return;
	}
	try {
		video.srcObject = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: { facingMode: "environment" },
		});
		startBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Stop Camera';
		setStatus("Scanning\u2026");
	} catch {
		setStatus("Camera access denied");
	}
}

function stopCamera() {
	video.srcObject && video.srcObject.getTracks().forEach(function(t) { t.stop(); });
	video.srcObject = null;
	detecting = false;
	scanOverlay.classList.remove("is-active");
	startBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> Start Camera';
	setStatus("Tap Start to scan");
}

function setStatus(text) {
	statusBadge.textContent = text;
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
			showSnackbar(bc.rawValue, bc.format);
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

// ── Snackbar ─────────────────────────────────────────────────
function showSnackbar(value, format) {
	clearTimeout(snackTimer);
	snackBadge.textContent = format.replace(/_/g, " ");
	snackValue.textContent = value;

	// Reset progress animation by toggling class
	snackbar.classList.remove("is-visible");
	snackProgress.style.animation = "none";
	snackbar.hidden = false;
	// Force reflow so the transition plays from the bottom
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
	var text = codeExample.textContent;
	// Decode HTML entities before copying
	var ta = document.createElement("textarea");
	ta.value = text;
	document.body.appendChild(ta);
	ta.select();
	document.execCommand("copy");
	document.body.removeChild(ta);

	copyBtn.textContent = "Copied!";
	copyBtn.classList.add("copied");
	setTimeout(function() {
		copyBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
		copyBtn.classList.remove("copied");
	}, 2000);
});

// ── Sample barcode generation ─────────────────────────────────
function generateSamples() {
	var barcodeOpts = {
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

	QRCode.toCanvas(
		document.getElementById("qr-canvas"),
		"https://web-viivakoodi.vercel.app/",
		{
			width: 160,
			margin: 1,
			color: { dark: "#e2e8f0", light: "#00000000" },
		}
	).catch(function() {});

	JsBarcode("#ean13-svg", "5901234123457",  Object.assign({}, barcodeOpts, { format: "EAN13" }));
	JsBarcode("#code128-svg", "WEB-BARCODE",  Object.assign({}, barcodeOpts, { format: "CODE128" }));
	JsBarcode("#code39-svg",  "CODE39",       Object.assign({}, barcodeOpts, { format: "CODE39" }));
	JsBarcode("#ean8-svg",    "96385074",     Object.assign({}, barcodeOpts, { format: "EAN8" }));
}

// ── Init ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", function() {
	generateSamples();
	if (!detector) {
		compatWarn.hidden = false;
		startBtn.disabled = true;
	}
});
