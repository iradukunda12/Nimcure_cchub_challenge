import { DispatchRiderCardProps } from "@/types/dispatch-rider";
import Image from "next/image";
import React from "react";

type StepProps = {
  step: 1 | 2 | 3;
};


function DispatchRiderCard({
  dispatch_rider_name,
  delivery_area,
  number_of_delivery,
  selected,
  onSelect,
  step,
}: DispatchRiderCardProps) {
  return (
    <div
      className={`flex items-center justify-between gap-5 text-gray-2 border-2 px-8 py-4 ${
        selected ? "border-blue-1" : "border-gray-7"
      }`}
      onClick={() => onSelect && onSelect(dispatch_rider_name)}
    >
      <div className="flex gap-6">
        <div className="grid place-content-center">
          <Image
            src={selected ? "/images/pending.svg" : "/images/wait.svg"}
            alt={"image"}
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <p className="font-light">Dispatch Rider’s Name</p>
          <p className="font-semibold">{dispatch_rider_name}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <p className="font-light">Delivery Area</p>
        <p className="font-semibold">{delivery_area}</p>
      </div>
      <div className="flex flex-col space-y-3">
        <p className="font-light">Number of Deliveries</p>
        <p className="font-semibold">{number_of_delivery}</p>
      </div>
    </div>
  );
}

export default DispatchRiderCard;