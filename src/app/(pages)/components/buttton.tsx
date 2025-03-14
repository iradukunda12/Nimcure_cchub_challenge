import React from "react";
import Image from "next/image"; 
import { ButtonProps } from "@/types/button-props";



const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  customstyle,
  isDisabled,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` flex items-center gap-2 px-3 py-1 border border-blue-1 text-blue-1 transition-all duration-300 ease-in-out ${customstyle}`}
      disabled={isDisabled}
    >
      {icon && (
        <Image width={20} height={20} src={icon} alt="icon" className="mr-1" />
      )}{" "}
      {text}
    </button>
  );
};

export default CustomButton;