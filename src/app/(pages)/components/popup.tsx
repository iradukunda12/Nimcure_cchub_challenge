import React from "react";
import Image from "next/image";

function PopupComponent({
  isSuccess,
  onClick,
  showPopup,
}: {
  isSuccess: boolean;
  onClick: () => void;
  showPopup: boolean;
}) {
  return (
    <div
      className={` absolute left-2 right-3 top-2 h-16 w-full text-white flex justify-between px-8 py-4 ${
        isSuccess ? "bg-green-2" : "bg-red-1"
      } ${showPopup ? "block" : "hidden"}`}
    >
      <div className="flex gap-10 items-center">
        <Image
          src={
            isSuccess === true ? "/images/done-white.svg" : "/images/wait.svg"
          }
          alt={"image"}
          width={20}
          height={20}
        />
        {isSuccess
          ? "Package has been successfully assigned to Oluwaseun Aregbesola"
          : "The request failed, please go back and try again."}
      </div>
      <Image
        src={"/images/cross.svg"}
        alt={"image"}
        width={20}
        height={20}
        onClick={onClick}
      />
    </div>
  );
}

export default PopupComponent;