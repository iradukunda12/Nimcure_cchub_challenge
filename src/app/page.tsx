"use client";
import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "./(pages)/components/buttton";
import InputComponent from "./(pages)/components/input";


function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const errors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    } else {
      errors.email = "";
      isValid = true;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (
      !/a-z/.test(password) &&
      !/A-Z/.test(password) &&
      !/0-9/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password) &&
      !/[!@#$%^&*]/.test(password)
    ) {
      setFormErrors({ ...formErrors, password: "" });
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed to login if form is valid
      router.push("/patients");
    } else {
      console.log("Form is invalid");
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="w-full h-screen grid grid-cols-2 max-lg:grid-cols-1">
      <div className="p-4">
        <div className="flex justify-center items-center mt-20">
          <Image
            className=""
            src="/images/loginLogo.svg"
            alt="Login Logo"
            width={50}
            height={50}
          />
        </div>

        <div className="max-w-sm mx-auto w-full mt-20">
          <h2 className="text-[20px] text-gray-2 ">Sign in to continue</h2>

          <form className="flex flex-col space-y-4 mt-6" onSubmit={handleLogin}>
            <InputComponent
              type="email"
              name="email"
              value={email}
              onChange={setEmail}
              required={true}
              placeholder="Enter your email"
              error={formErrors.email}
            />

            <InputComponent
              type="password"
              name="password"
              value={password}
              onChange={setPassword}
              required
              minLength={8}
              placeholder="Enter your password"
              error={formErrors.password}
            />

            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
              <div
                className="flex items-center cursor-pointer p-2 transition-all duration-300"
                onClick={handleCheck}
              >
                <div className="w-5 h-5 border border-gray-5 grid place-content-center rounded-sm">
                  <div
                    className={`w-4 h-4  rounded-sm ${
                      isChecked ? "bg-gray-5" : ""
                    }`}
                  />
                </div>
                <span className="ml-4 text-sm text-[#2A2A2A] font-bold font-gilroy">
                  Remember Me
                </span>
              </div>

              <Link
                href="#"
                className="text-sm text-blue-1 hover:underline font-bold"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
        <div className="mt-16 flex justify-center  items-center max-w-sm mx-auto w-full">
          <CustomButton
            type="button"
            text="Login"
            customstyle="bg-blue-1 text-white py-3 text-lg font-bold text-center flex justify-center w-full"
            onClick={(event) => handleLogin(event)}
          />
        </div>
        <div className="mt-44 text-center text-[12px] font-500 text-[#2A2A2A] flex items-center justify-center gap-2">
          Powered by
          <Image
            src="/images/company-logo.svg"
            alt="Footer Logo"
            width={120}
            height={20}
            priority
          />
        </div>
      </div>
      <div className="relative w-full h-full flex justify-center items-center bg-blue-1 max-lg:hidden">
        <Image
          src="/images/loginImage.svg"
          alt="Login Image"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
        <Image
          src="/images/bird.svg"
          alt="Login Image"
          width={400}
          height={400}
          className=" absolute bottom-44 -left-20"
        />
        <div className="w-full absolute bottom-20">
          <div className="max-w-7xl mx-auto text-center  flex flex-col justify-center">
            <h1 className="text-lg text-white mb-3 font-bold">
              Serving Patients During a Pandemic
            </h1>
            <p className="text-white text-[14px]">
              Delivering essential medication to NIMR patients with adherence to
            </p>
            <p className="text-white text-[14px]">
              quality of service, care and confidentiality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;