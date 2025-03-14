import { InputComponentProps } from "@/types/inputs";
import React, { useState } from "react";
import CustomButton from "./buttton";



const InputComponent: React.FC<InputComponentProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  minLength,
  error,
  placeholder,
  customStyles,
}) => {
  const [inputType, setInputType] = useState(type);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);

    // Basic validation
    if (required && e.target.value.trim() === "") {
      setValidationError(`${name} is required`);
    } else if (minLength && e.target.value.length < minLength) {
      setValidationError(`${name} must be at least ${minLength} characters`);
    } else {
      setValidationError(null);
    }
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="mb-4">
      <label className="block font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          className={`w-full px-2 py-3 border outline-none ${customStyles} ${
            validationError ?? error
              ? "focus:border-red-1"
              : "focus:border-blue-1"
          }`}
          required={required}
          placeholder={placeholder}
        />
        {type === "password" && (
          <CustomButton
            type="button"
            customstyle="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 border-none bg-white z-10"
            onClick={togglePasswordVisibility}
            text={inputType === "password" ? "Show" : "Hide"}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputComponent;