const ViewPatient = ({
  infoField,
  value,
}: {
  infoField: string;
  value: string;
}) => {
  return (
    <div className="grid grid-cols-2 px-2 w-full mb-3">
      <p className="font-light text-gray-2 text-[15px]">{infoField}</p>
      <p className="font-semibold text-gray-5 text-right text-[16px]">
        {value}
      </p>
    </div>
  );
};

export default ViewPatient;