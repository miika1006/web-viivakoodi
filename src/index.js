import "./styles/main.css";

const start = async () => {
	// check compatibility
	if (!("BarcodeDetector" in window)) {
		log(
			"Barcode Detector is not supported by this browser, cannot read barcodes with camera."
		);
	} else {
		log("Barcode Detector supported!");
		if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			log(
				"Media devices is not supported by this browser, cannot start videostream."
			);
		} else {
			log("Media devices supported!");
			const video = createVideo();

			video.addEventListener("play", () => {
				log("Video started playing, starting to detect barcode");
				window.setTimeout(() => detectOnRender(video), 1000);
			});
			video.addEventListener("pause", () => {
				log("Video paused playing, stopping barcode detection");
			});
			startVideoStreaming(video);
		}
	}
};

const createVideo = () => {
	const newVideo = document.createElement("video");
	newVideo.id = "barcodecamera";
	newVideo.autoplay = true;
	newVideo.muted = true;
	document.body.prepend(newVideo);
	return newVideo;
};
const startVideoStreaming = async (video) => {
	const videoSettings = {
		audio: false,
		video: {
			facingMode: "environment",
		},
	};
	video.srcObject = await navigator.mediaDevices.getUserMedia(videoSettings);
};
const detectOnRender = (video) => {
	if (video.paused === true) {
		log("Stopping barcode detection");
		return;
	}
	detectBarcode(video);
	return window.requestAnimationFrame(() => detectOnRender(video));
};
const detectBarcode = async (video) => {
	try {
		// create new detector
		const barcodeDetector = new BarcodeDetector({
			formats: [
				"code_128",
				"code_93",
				"data_matrix",
				"ean_8",
				"itf",
				"pdf417",
				"code_39",
				"codabar",
				"ean_13",
				"qr_code",
				"upc_e",
			],
		});

		const barcodes = await barcodeDetector.detect(video);
		if (barcodes.length > 0) {
			const distinctBarcodes = [
				...new Map(barcodes.map((item) => [item["rawValue"], item])).values(),
			];
			for (let x = 0; x < distinctBarcodes.length; x++) {
				log("read barcode: " + distinctBarcodes[x].rawValue);
			}
			video.pause();
			window.setTimeout(() => video.play(), 1000);
		}
	} catch (error) {
		log(
			"Failed to detect barcode: code=" +
				error.code +
				", message=" +
				error.message +
				", name=" +
				error.name
		);
	}
};
const log = (data, obj) => {
	console.log(data, obj ? obj : "");
	const newLogRow = document.createElement("div");
	newLogRow.appendChild(document.createTextNode(new Date().toLocaleString()));
	newLogRow.appendChild(document.createElement("br"));
	newLogRow.appendChild(document.createTextNode(data));
	if (obj) {
		newLogRow.appendChild(document.createElement("br"));
		newLogRow.appendChild(document.createTextNode(window.JSON.stringify(obj)));
	}
	let logHolder = document.getElementById("logholder");
	if (logHolder === null) {
		logHolder = document.createElement("div");
		logHolder.id = "logholder";
		logHolder.style.width = "300px";
		logHolder.style.height = "300px";
		document.body.appendChild(logHolder);
	}
	logHolder.appendChild(newLogRow);
	logHolder.appendChild(document.createElement("hr"));
};

window.addEventListener("DOMContentLoaded", start);
