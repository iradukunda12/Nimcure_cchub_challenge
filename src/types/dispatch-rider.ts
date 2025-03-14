type StepProps = {
  step: 1 | 2 | 3;
};

export interface DispatchRiderCardProps {
  dispatch_rider_name: string;
  delivery_area: string;
  number_of_delivery: string;
  selected?: boolean;
  step?: StepProps;
  onSelect?: (dispatch_rider_name: string) => void;
}