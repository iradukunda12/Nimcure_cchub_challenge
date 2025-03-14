"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrResult, setQrResult] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const videoElement = videoRef.current;

    // Start scanning
    if (videoElement) {
      codeReader
        .decodeFromVideoDevice(undefined, videoElement, (result, error) => {
          if (result) {
            setQrResult(result.getText());
          }
          if (error) {
            console.error(error.message);
          }
        })
        .catch((error) => {
          console.error("Error starting video stream:", error);
        });
    }

 
    return () => {
      if (videoElement) {
        const stream = videoElement.srcObject as MediaStream;
        const tracks = stream?.getTracks();
        tracks?.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h2>QR Scanner</h2>
      <video ref={videoRef} style={{ width: "100%", maxWidth: "400px" }} />
      {qrResult && <p>Scanned Result: {qrResult}</p>}
    </div>
  );
};

export default Scan;