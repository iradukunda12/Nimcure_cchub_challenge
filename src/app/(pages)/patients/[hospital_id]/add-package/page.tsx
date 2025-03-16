"use client";

import CustomButton from "@/app/(pages)/components/buttton";
import DispatchRiderCard from "@/app/(pages)/components/dispatch-rider-card";
import Generate from "@/app/(pages)/components/generate";
import InputComponent from "@/app/(pages)/components/input";
import Spinner from "@/app/(pages)/components/spinner";
import ViewPatient from "@/app/(pages)/components/viewPatient";
import { Dialog, DialogContent } from "@/component/ui/dialog";
import { dispatchRiderData, patients } from "@/deliveries-data";
import { DeliveryProps, DrugRoutineState } from "@/types/delivery";
import { DispatchRiderCardProps } from "@/types/dispatch-rider";
import { Patient } from "@/types/patient";
import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";


const AddPackage = () => {
  const router = useRouter();
  const { hospital_id } = useParams();

  const [data, setData] = useState<Patient | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [deliveryInfoOpen, setDeliveryInfoOpen] = useState<DeliveryProps>({
    step1: "pending",
    step2: "wait",
    step3: "wait",
  });
  const [ridersInfo , setRidersInfo] = useState<DispatchRiderCardProps[]>([]);
  const [afterScanCode, setafterScanCode] = useState<boolean>(false);
  const [qrCodeValue, setqrCodeValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Track selected rider for each step
  const [selectedRiders, setSelectedRiders] = useState<{
    [key: string]: string | null;
  }>({
    step1: null,
    step2: null,
    step3: null,
  });
  const [selectedOption, setSelectedOption] = useState<"same" | "new" | null>(
    null
  ); 
  const handleQrCodeChange = (value: SetStateAction<string>) => {
    setqrCodeValue(value);
  };
  const handleClickAfterScan = () => {
    setafterScanCode(!afterScanCode);
  };

  // Function to handle option selection
  const handleOptionSelect = (option: "same" | "new") => {
    setSelectedOption(option); 
  };
//   const selectDrugs = (routine: string) => {
//     selectedRiders[`step${currentStep}`] === routine;
//     handleOptionSelect(routine as DrugRoutineState);
//     handleSelectRider(routine);
//   };

  useEffect(() => {
    if (hospital_id) {
      patients.find((patient) => {
        if (patient.hospital_id === hospital_id) {
          setData(patient as Patient);
        }
      });
    }
    setRidersInfo(dispatchRiderData);
  }, [hospital_id]);

  const handleStepChange = (step: number) => {
    const updatedState: DeliveryProps = {
      step1: step >= 1 ? "done" : "pending",
      step2: step > 2 ? "done" : step === 2 ? "pending" : "wait",
      step3: step === 3 ? "pending" : "wait",
    };

    if (
      selectedRiders.step1 == null ||
      (currentStep === 2 && selectedRiders.step2 == null)
    )
      return;
    setCurrentStep(step);
    setDeliveryInfoOpen(updatedState);
  };

  const handleSelectRider = (dispatch_rider_name: string) => {
    setSelectedRiders((prevState) => {
      const newState = {
        ...prevState,
        [`step${currentStep}`]: dispatch_rider_name,
      };
      return newState;
    });
  };

  return !data ? (
    <Spinner/>
  ) : (
    <div className="bg-gray-0 pb-8 min-h-screen pt-16">
      <div className=" flex justify-between items-center pt-8 max-w-7xl mx-auto max-lg:w-full max-lg:px-8 max-lg:mx-0 max-sm:px-2">
        <div className="max-sm:hidden">
          <span className="text-blue-1 text-[14px]">Patient</span>
          <span className="text-blue-1 text-[14px]">{` / View Patient`}</span>
          <span className={"text-[18px] text-gray-3"}>
            {` / Assign Package to Patient`}
          </span>
        </div>
      </div>
      <div className="my-4 h-[1px] w-full bg-gray-4 mt-5"></div>
      <div className="flex max-lg:flex-col gap-5 max-w-7xl mx-auto mt-5 max-lg:w-full max-lg:px-8 max-sm:px-3 max-lg:mx-0">
        {/* SIMPLE SIDEBAR */}

        <div className="w-[30%] max-lg:w-full grid  bg-white h-fit">
          <div className=" min-h-40 max-lg:grid max-lg:grid-cols-1 max-lg:min-h-32  max-lg:h-fit max-sm:grid-cols-1">
            <div className="h-14 flex items-center border-b-2 px-8">
              <p className="text-gray-2 font-bold">Patient Information</p>
            </div>
            {data && (
              <div className="mt-3 grid gap-4 max-lg:gap-2 px-3">
                <ViewPatient infoField="Hospital Id" value={data.hospital_id} />
                <ViewPatient infoField="Name" value={data.patient_name} />
                <ViewPatient
                  infoField="Phone Number"
                  value={data.phone_number}
                />
                <ViewPatient
                  infoField="Next Delivery Date"
                  value={data.next_delivery_date}
                />
                <ViewPatient
                  infoField="Location"
                  value={data.delivery_address}
                />
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-5 w-[70%] max-lg:w-full">
          <div className="flex justify-between w-full">
            <div className="flex gap-6 items-center">
              <CustomButton
                icon={`${
                  currentStep === 1 ? "/images/pending.svg" : "/images/done.svg"
                }`}
                text="Set Drug Cycle/Length"
                customstyle={`h-full border-0 border-b-[4px] transition-all duration-300 ease-in-out ${
                  currentStep === 1
                    ? "border-b-blue-1 text-bold text-blue-1 font-bold cursor-not-allowed"
                    : "text-green-1 border-b-transparent"
                }`}
                type={"button"}
                onClick={() => handleStepChange(1)}
              />
              <CustomButton
                icon={`${
                  currentStep === 2
                    ? "/images/pending.svg"
                    : deliveryInfoOpen.step2 === "done"
                    ? "/images/done.svg"
                    : "/images/wait.svg"
                }`}
                text="Assign Dispatch Rider"
                customstyle={`h-full border-0  transition-all duration-300 ease-in-out ${
                  currentStep === 2 && deliveryInfoOpen.step2 === "pending"
                    ? "border-b-[4px] border-b-blue-1 text-bold text-blue-1 font-bold cursor-not-allowed"
                    : deliveryInfoOpen.step2 === "done"
                    ? "text-green-1 border-b-transparent"
                    : "text-gray-2"
                }`}
                type={"button"}
                onClick={() => handleStepChange(2)}
              />

              <CustomButton
                text="Scan Package"
                icon={`${
                  currentStep === 3
                    ? "/images/pending.svg"
                    : deliveryInfoOpen.step3 === "done"
                    ? "/images/done.svg"
                    : "/images/wait.svg"
                }`}
                customstyle={`h-full border-0 transition-all duration-300 ease-in-out ${
                  deliveryInfoOpen.step3 === "pending"
                    ? "border-b-[4px] border-b-blue-1 text-bold text-blue-1 font-bold cursor-not-allowed"
                    : deliveryInfoOpen.step3 === "done"
                    ? "text-green-1 border-b-transparent"
                    : "text-gray-2"
                }`}
                type={"button"}
                onClick={() => handleStepChange(3)}
                              />
                            
            </div>
          </div>
          <div className="border border-gray-4 -mt-[1.5px] " />

          <div className="mt-10 flex justify-between">
            <CustomButton
              text="All(33)"
              type="button"
              customstyle=" font-bold w-fit bg-blue-2 cursor-default"
            />
            <CustomButton
              text="Yaba Riders (5)"
              type="button"
              customstyle=" w-fit bg-gray-6 text-gray-2 border-0 cursor-default"
            />
            <CustomButton
              text="Unassigned Riders (10)"
              type="button"
              customstyle=" w-fit bg-gray-6 text-gray-2 border-0 cursor-default"
            />
            <CustomButton
              text="Assigned Riders (23)"
              type="button"
              customstyle=" w-fit bg-gray-6 text-gray-2 border-0 cursor-default"
            />
          </div>
          <div className="mt-10 grid gap-5 max-h-[40vh] overflow-y-scroll p-4 custom-scroll ">
            {currentStep === 1 && (
              <div>
                <p className="text-gray-600 mb-6">
                  {`Patient has a drug cycle of two(2) months.`}
                </p>

                <div className="space-y-4">
                  {/* Option 1: Combined Drug Cycle Option */}
                  <div
                    className={` cursor-default border p-4 ${
                      selectedOption === "same"
                        ? "border-blue-1"
                        : "border-gray-7"
                    }`}
                    onClick={() => {
                      selectedRiders[`step${currentStep}`] === "same";
                      handleOptionSelect("same");
                      handleSelectRider("same");
                    }}
                  >
                    <div className="flex items-center space-x-3 border-b border-background pb-2">
                      <Image
                        src={
                          selectedOption === "same"
                            ? "/images/pending.svg"
                            : "/images/wait.svg"
                        }
                        alt={"image"}
                        width={20}
                        height={20}
                      />
                      <span className="text-gray-800">
                        Same as initial drug cycle
                      </span>
                    </div>
                    <p className="pt-4">
                      Deliver drug on <b>4th February 2020</b> & set next
                      delivery date to <b>20th March 2020</b>
                    </p>
                  </div>

                  {/* Option 2: Set New Drug Cycle */}
                  <div
                    className={`cursor-default border p-4 ${
                      selectedOption === "new"
                        ? "border-blue-1"
                        : "border-gray-7"
                    }`}
                    onClick={() => {
                      selectedRiders[`step${currentStep}`] === "new";
                      handleOptionSelect("new");
                      handleSelectRider("new");
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={
                          selectedOption === "new"
                            ? "/images/pending.svg"
                            : "/images/wait.svg"
                        }
                        alt={"image"}
                        width={20}
                        height={20}
                      />
                      <span className="text-gray-800">Set new drug cycle</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
             {dispatchRiderData &&
        currentStep === 2 &&
        dispatchRiderData.map((data) => (
          <DispatchRiderCard
            key={data.dispatch_rider_name}
            dispatch_rider_name={data.dispatch_rider_name}
            delivery_area={data.delivery_area}
            number_of_delivery={data.number_of_delivery}
            selected={
              selectedRiders[`step${currentStep}`] ===
              data.dispatch_rider_name
            }
            onSelect={handleSelectRider}
          />
        ))}
      
      {/* Step 3 - QR Code and Manual Input */}
      {currentStep === 3 && (
        <div className="flex gap-10 items-center justify-center">
          {!afterScanCode ? (
            <Generate patient_name={data?.patient_name} />
          ) : (
           ""
          )}
          
          <div className="w-[250px] py-[70px] flex flex-col justify-between">
            <div>
              <p className="py-[5px]">
                Trouble scanning QR Code?<br></br> Enter manually
              </p>
              
              <InputComponent
                name="manual_package_code"
                type="text"
                placeholder="Enter Package Code"
                value={qrCodeValue}
                onChange={handleQrCodeChange}
              />
            </div>
            
            <CustomButton
              text={"Submit Code"}
              type="button"
              customstyle="py-3 px-[75px] mt-[42px] bg-blue-2 font-bold hover:bg-blue-1 hover:text-white"
              onClick={handleClickAfterScan}
            />
          </div>
        </div>
      )}
    </div>

          <div
            className={`flex ${
              currentStep === 3 ? "justify-between" : "justify-end"
            } border-t-4 border-t-gray-0 shadow-sm z-20 py-3 px-6 1`}
          >
            {currentStep === 3 ? (
              <CustomButton
                text={"Back"}
                type="button"
                customstyle="py-2 px-6 font-bold hover:bg-blue-1 hover:text-white"
                onClick={() => {
                  handleStepChange(2);
                  setafterScanCode(false);
                }}
              />
            ) : (
              ""
            )}
                  <CustomButton
        text={
          currentStep === 3 && qrCodeValue === data.hospital_id
            ? "Assign Package"
            : "Next"
        }
        type="button"
        customstyle={`py-2 px-6 font-bold bg-blue-2 hover:bg-blue-1 hover:text-white ${
          currentStep === 3 && qrCodeValue === data.hospital_id
            ? "cursor-pointer"
            : "cursor-not-allowed"
        }`}
        onClick={() => {
          if (currentStep === 3 && qrCodeValue === data.hospital_id) {
            setIsDialogOpen(true); 
          } else {
            handleStepChange(currentStep === 1 ? 2 : 3);
          }
        }}
      />
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-lg max-h-screen overflow-y-auto">
          <div className="grid gap-4">
            <div className="flex justify-center items-center font-bold text-2xl">
              <h1>{`Assign Package ${qrCodeValue}`}</h1>
            </div>
            <div className="border-b border-gray-4" />
            <div className=" flex items-center justify-center p-4">
              <p className="text-lg">
                Are you sure you want to assign package{" "}
                <span className="font-bold">{qrCodeValue}</span> to{" "}
                <span className="font-bold">{data.patient_name}</span> to{" "}
                {data.patient_name}?
              </p>
            </div>
            <div className="border-b border-gray-4" />

            <div
              className={`flex justify-between border-t-4 border-t-gray-0 shadow-sm z-20 py-3 px-6 1`}
            >
              <CustomButton
                text={"Cancel"}
                type="button"
                customstyle="py-2 px-3 font-bold hover:bg-red-1 border-red-1 text-red-1 hover:text-white"
                onClick={() => setIsDialogOpen(false)}
              />

              <CustomButton
                text={"Add Package"}
                type="button"
                customstyle={`py-2 px-3 font-bold hover:bg-blue-1 hover:text-white `}
                onClick={() => {
                  router.push("/deliveries");
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPackage;