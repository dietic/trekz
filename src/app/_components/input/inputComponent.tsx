import { FieldValues } from "react-hook-form";
import { InputProps } from "./InputInterface";

export default function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    className,
    fullWidth,
    darkMode = true,
    name,
    register,
    error,
    ...rest
  } = props;
  const commonStyle = `border-green border-2 bg-transparent h-12 rounded-xl text-base px-5 placeholder:text-gray focus-visible:outline-none ${
    fullWidth ? "w-full" : ""
  }`;
  const darkStyle = `text-white focus-visible:border-white text-white`;
  const lightStyle = `text-blue focus-visible:border-blue text-blue`;
  return (
    <div className="mb-3">
      <input
        className={`${commonStyle} ${
          darkMode ? darkStyle : lightStyle
        } ${className}`}
        {...register(name)}
        {...rest}
      />
      <span className="text-sm text-red">{error?.message}</span>
    </div>
  );
}
