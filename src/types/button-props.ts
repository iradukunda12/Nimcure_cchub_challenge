export interface ButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  customstyle?: string;
  icon?: string;
  isDisabled?: boolean;
  type: "button" | "submit" | "reset";
}