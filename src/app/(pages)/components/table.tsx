import React from "react";

import { useRouter } from "next/navigation";
import { TableProps } from "@/types/table";
import CustomButton from "./buttton";



function Table<T extends { [key: string]: any; hospital_id: string }>({
  columns,
  data,
}: TableProps<T>) {
  const router = useRouter();

  const handleViewSinglePatient = (hospital_id: string) => {
    if (hospital_id) {
      router.push(`/patients/${hospital_id}`);
    }
  };

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="px-4">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`border-b border-b-300 px-4 text-left font-semibold py-5 text-gray-2 text-[16px] ${
                column.key === "phone_number"
                  ? "max-lg:hidden"
                  : column.key === "next_delivery_date"
                  ? "max-md:hidden"
                  : column.key === "hospital_id"
                  ? "max-sm:hidden"
                  : ""
              }`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[14px]">
        {data.map((item, index) => (
          <tr key={index} className="border-b font-normal text-gray-2 px-4">
            {columns.map((column) => (
              <td
                key={column.key}
                className={`border-b border-b-gray-300 px-4 py-5 ${
                  column.key === "phone_number"
                    ? "max-lg:hidden"
                    : column.key === "next_delivery_date"
                    ? "max-md:hidden"
                    : column.key === "hospital_id"
                    ? "max-sm:hidden"
                    : ""
                }
                  `}
              >
                {(() => {
                  if (column.key === "actions") {
                    return (
                      <CustomButton
                        type="button"
                        text="View"
                        customstyle="hover:bg-blue-1 hover:text-white transition-all duration-300 ease-in-out"
                        onClick={() =>
                          handleViewSinglePatient(item.hospital_id!)
                        }
                      />
                    );
                  } else if (column.key === "status") {
                    return renderStatus(item, column.key as keyof T);
                  } else {
                    return item[column.key as keyof T] as React.ReactNode;
                  }
                })()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const renderStatus = <T,>(item: T, columnKey: keyof T) => {
  const status = String(item[columnKey]);
  if (status === "completed") {
    return (
      <span className="text-green-1 px-3 py-2 bg-green-1 bg-opacity-30 font-bold text-[14px]">
        Completed
      </span>
    );
  } else if (status === "assigned") {
    return (
      <span className="text-blue-1 px-3 py-2 bg bg-blue-1 bg-opacity-30 font-bold text-[14px]">
        Assigned
      </span>
    );
  } else if (status === "due&paid") {
    return (
      <span className="text-orange-1 px-3 py-2 bg bg-orange-1 bg-opacity-30 font-bold text-[14px]">
        Due & Paid
      </span>
    );
  } else {
    return (
      <span className="text-red-1 px-3 py-2 bg bg-red-1 bg-opacity-30 font-bold text-[14px]">
        Due & Unpaid
      </span>
    );
  }
};

export default Table;