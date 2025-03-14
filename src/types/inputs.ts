export interface InputComponentProps {
  label?: string;
  type: "text" | "password" | "email";
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  error?: string;
  placeholder?: string;
  customStyles?: string;
}