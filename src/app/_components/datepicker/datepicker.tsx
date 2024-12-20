import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { UseFormSetValue, UseFormRegister, FieldError } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

type DatepickerProps = {
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error: FieldError | undefined;
};

export default function Datepicker({
  name,
  register,
  setValue,
  placeholder = "Fecha de nacimiento",
  error,
}: DatepickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
    >
      <mask id="ipSApplication0">
        <g fill="none" stroke="white" strokeLinejoin="round" strokeWidth="4">
          <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
          <path
            fill="white"
            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
          ></path>
        </g>
      </mask>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipSApplication0)"
      ></path>
    </svg>
  );

  useEffect(() => {
    register(name, {
      required: "Este campo es requerido",
    });
  }, [register, name]);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setValue(name, date, { shouldValidate: true }); // Actualizar el valor en react-hook-form
  };

  return (
    <div className="mb-3">
      <DatePicker
        selected={startDate}
        className="text-blue bg-transparent border-2 border-green h-12 rounded-xl text-base w-full !pl-10"
        onChange={handleDateChange}
        showIcon
        icon={icon}
        placeholderText={placeholder}
        maxDate={new Date()}
      />
      <span className="text-sm text-red">{error?.message}</span>
    </div>
  );
}
