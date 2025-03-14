import { InfoCardProps } from "@/types/infoCard";
import React from "react";


function InfoCard({ label, value, customStyles }: InfoCardProps) {
  return (
    <div
      className={`border-gray-1 border-2 px-1 py-1 w-full bg-gray-4 mb-4 ${customStyles}`}
    >
      <p className="text-[12px] font-light">{label}</p>
      <h1 className="text-[15px] font-bold mt-1">{value}</h1>
    </div>
  );
}

export default InfoCard;