"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Patient } from "@/types/patient";
import { patients } from "@/deliveries-data";
import Spinner from "../../components/spinner";
import CustomButton from "../../components/buttton";
import InfoCard from "../../components/InfoCard";

function SinglePatient() {
  const { hospital_id } = useParams();
  const router = useRouter();
  const [viewPatient, setViewPatient] = useState<string>("");
  const [isDeliveryInfoOpen, setIsDeliveryInfoOpen] = useState<boolean>(false);
  const [data, setData] = useState<Patient | null>(null);

  useEffect(() => {
    if (hospital_id) {
      setViewPatient(` / View Patient`);
      patients.find((patient) => {
        if (patient.hospital_id === hospital_id) {
          setData(patient as Patient);
        }
      });
    }
  }, [hospital_id]);

  const handlePackage = () => {
    router.push(`/patients/${hospital_id}/add-package`);
  };

  const handleSwitchInfo = () => {
    console.log(isDeliveryInfoOpen);
    setIsDeliveryInfoOpen(!isDeliveryInfoOpen);
  };

  return !data ? (
    <Spinner />
  ) : (
    <div className="bg-gray-0 pb-8 min-h-screen pt-16">
      <div className=" flex justify-between items-center pt-8 max-w-7xl mx-auto max-lg:w-full max-lg:px-8 max-lg:mx-0 max-sm:px-2">
        <div className="max-sm:hidden">
          <span className="text-blue-1 text-[14px]">Patient</span>
          <span
            className={`${
              hospital_id
                ? "text-[18px] text-gray-1"
                : "text-blue-1 text-[14px]"
            } `}
          >
            {viewPatient}
          </span>
        </div>
        <CustomButton
          type="button"
          text="Assign Package to Patient"
          customstyle="bg-blue-1 text-white text-lg hover:bg-opacity-80 transition-all duration-300 ease-in-out border-none py-3"
          onClick={handlePackage}
        />
      </div>
      <div className="my-4 h-[1px] w-full bg-gray-4"></div>
      {/* actual content here */}
      <div className="flex max-lg:flex-col gap-5 max-w-7xl mx-auto mt-5 max-lg:w-full max-lg:px-8 max-sm:px-3 max-lg:mx-0">
        {/* SIMPLE SIDEBAR */}

        <div className="w-1/4 max-lg:w-full grid  bg-white h-fit">
          <div className="h-60 max-lg:grid max-lg:grid-cols-3  max-lg:h-fit max-sm:h-44 max-sm:grid-cols-1">
            <p className="cursor-pointer  flex items-center px-9 text-lg text-gray-1 h-20 max-sm:h-14">
              Patient
            </p>
            <p className="cursor-pointer h-20 flex items-center px-9 text-lg  bg-blue-2 text-blue-1 font-extrabold border-r-4 border-r-blue-1 max-sm:h-14">
              Rider’s Profile
            </p>
            <p className="cursor-pointer flex items-center px-9 text-lg text-gray-1 h-20 max-sm:h-14">
              Delivery History
            </p>
          </div>
        </div>
        <div className="bg-white p-5 w-3/4 max-lg:w-full">
          <div className="flex justify-between w-full relative">
            <div className="flex gap-6 items-center max-md:hidden">
              <p>Payment Status</p>
              <p className="py-3 px-6 bg-green-1 bg-opacity-30 text-green-1 text-bold mb-3 border-b-blue-1">
                Paid
              </p>
            </div>
            <div className="flex gap-6 items-center">
              <CustomButton
                text="Patient Information"
                customstyle={`h-full border-0 border-b-[4px] transition-all duration-300 ease-in-out ${
                  !isDeliveryInfoOpen
                    ? "border-b-blue-1 text-bold text-blue-1 font-bold"
                    : "text-gray-2 border-b-transparent"
                }`}
                type={"button"}
                onClick={handleSwitchInfo}
              />
              <CustomButton
                text="Delivery Information"
                customstyle={`h-full border-0 border-b-[4px] transition-all duration-300 ease-in-out ${
                  isDeliveryInfoOpen
                    ? "border-b-blue-1 text-bold text-blue-1 font-bold"
                    : "text-gray-2 border-b-transparent"
                }`}
                type={"button"}
                onClick={handleSwitchInfo}
              />
            </div>
          </div>
          <div className="border border-gray-4 -mt-[1.5px] " />
          <div className="mt-14 grid grid-cols-2 max-md:grid-cols-1 gap-5">
            <div className=" max-md:grid max-md:grid-cols-2 max-md:col-span-2  max-md:w-full">
              <div className="max-md:col-span-1 max-md:flex max-md:flex-col ">
                <h1 className="text-[14px] font-bold mb-1">
                  Patient’s Information
                </h1>
                <p className="text-[14px] font-light mb-6">
                  Personal information about Patient.
                </p>
              </div>
              <div className="max-md:flex max-md:justify-end max-md:items-center max-sm:col-span-2 max-sm:justify-start">
                <CustomButton
                  text="Edit Patient’s Information"
                  type="button"
                  icon="/images/edit.svg"
                  customstyle="py-3 px-3"
                />
              </div>
            </div>
            {data && !isDeliveryInfoOpen && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                <InfoCard
                  label="Hospital Id"
                  value={data.hospital_id}
                  customStyles="col-span-2 w-full"
                />
                <InfoCard
                  label="First Name"
                  value={data.patient_name.split(" ")[0]}
                  customStyles=""
                />
                <InfoCard
                  label="Last Name"
                  value={data.patient_name.split(" ").slice(1).join(" ")}
                  customStyles=""
                />
                <InfoCard label="Gender" value={data.gender} customStyles="" />
                <InfoCard
                  label="Phone Number"
                  value={data.phone_number}
                  customStyles=""
                />
                <InfoCard
                  label="Email Address"
                  value={data.email}
                  customStyles="col-span-2"
                />
              </div>
            )}
            {data && isDeliveryInfoOpen && (
              <div
                className="grid grid-cols-2 gap-x-4 w-full
              "
              >
                <InfoCard
                  label="Delivery Area"
                  value={data.delivery_area}
                  customStyles="col-span-2"
                />
                <InfoCard
                  label="Delivery Area"
                  value={data.delivery_area}
                  customStyles="col-span-2"
                />
                <InfoCard
                  label="Delivery Address"
                  value={data.delivery_address}
                  customStyles="col-span-2"
                />
                <InfoCard
                  label="Payment Status"
                  value={data.status}
                  customStyles=""
                />
              </div>
            )}
          </div>
          <div className="flex justify-end mt-10">
            <CustomButton
              text="Save Changes"
              type="button"
              customstyle="py-2 px-3 font-bold bg-blue-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePatient;