import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const setupVpRequestScanner = (exchange: (vp: any) => void) => {
  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    exchange(JSON.parse(decodedText));
  }
  
  const onScanFailure = (error: string) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 250, height: 250}, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] },
    /* verbose= */ false);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  // return <div id="reader"></div>;
}

export default setupVpRequestScanner;