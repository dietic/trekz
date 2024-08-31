import { InputProps } from "./inputInterface";

export default function Input(props: InputProps) {
  const { className, fullWidth, ...rest } = props;
  return (
    <input
      className={`border-2 border-green bg-transparent h-12 rounded-xl text-base px-5 text-white placeholder:text-gray focus-visible:outline-none focus-visible:border-blue ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...rest}
    />
  );
}
