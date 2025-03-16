"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function Generate({ patient_name }: { patient_name: string }) {
  const { hospital_id } = useParams();
  const [qrCodeValue] = useState("Kevin");
  const [hospitId, setHospitId] = useState<string>("");

  useEffect(() => {
    console.log(hospital_id);

    // Check if hospital_id exists
    if (hospital_id) {
      setHospitId(`${hospital_id}`);
    }
  }, []);

  return (
    <div className="grid place-content-center p-5">
      <h2 className="mb-10 -ml-9">{` Scan a package to assign it to ${patient_name}`}</h2>
          {qrCodeValue && <QRCode value={hospitId} width={40}  />}
          
    </div>
  );
}

export default Generate;