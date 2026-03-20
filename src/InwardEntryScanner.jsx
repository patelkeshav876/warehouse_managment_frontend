import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";

export default function InwardEntryScanner() {
  const [barcode, setBarcode] = useState("");

  const handleScan = (err, result) => {
    if (result) {
      setBarcode(result.text);
      // Send barcode data to backend
      axios.post("/api/inward-entry", { barcode: result.text })
        .then(res => alert("Inward entry recorded!"))
        .catch(err => alert("Error while saving entry"));
    }
  };

  return (
    <div>
      <h2>Scan Inward Box Barcode</h2>
      <BarcodeScannerComponent
        width={200}
        height={200}
        onUpdate={handleScan}
      />
      <p>Scanned Barcode: <b>{barcode}</b></p>
    </div>
  );
}
