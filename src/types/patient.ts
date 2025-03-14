export interface Patient {
  hospital_id: string;
  patient_name: string;
  phone_number: string;
  next_delivery_date: string;
  status: "completed" | "assigned" | "due&paid" | "due&unpaid";
  delivery_area: string;
  delivery_address: string;
  gender: "Male" | "Female";
  email: string;
}