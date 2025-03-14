export interface DeliveryPackage {
  package_code: string;
  delivery_date: string;
  phone_number: string;
  patient_name: string;
  location: string;
  hospital_id: string;
}

export type DeliveryState = "done" | "pending" | "wait";
export type DrugRoutineState = "same" | "new";

export interface DeliveryProps {
  step1: DeliveryState;
  step2: DeliveryState;
  step3: DeliveryState;
}