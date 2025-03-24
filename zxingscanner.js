import { BrowserMultiFormatReader } from '@zxing/browser';

const codeReader = new BrowserMultiFormatReader();
const videoElement = document.getElementById('video');
const barcodeInput = document.getElementById('barcode');
const startScanButton = document.getElementById('startScan');
const stopScanButton = document.getElementById('stopScan');

let selectedDeviceId;
let isScanning = false;

// Function to start scanning
const startScanning = async () => {
    if (isScanning) return;
    isScanning = true;

    try {
        const devices = await codeReader.listVideoInputDevices();
        if (devices.length > 0) {
            selectedDeviceId = devices[0].deviceId;
        } else {
            alert("No camera found");
            return;
        }

        codeReader.decodeFromVideoDevice(selectedDeviceId, videoElement, (result, err) => {
            if (result) {
                barcodeInput.value = result.text;
                console.log("Scanned Code:", result.text);
            }
            if (err) {
                console.warn("Scanning Error:", err);
            }
        });
    } catch (error) {
        console.error("Error starting scanner:", error);
    }
};

// Function to stop scanning
const stopScanning = () => {
    if (!isScanning) return;
    isScanning = false;
    codeReader.reset();
    console.log("Scanner stopped.");
};

// Event Listeners
startScanButton.addEventListener('click', startScanning);
stopScanButton.addEventListener('click', stopScanning);