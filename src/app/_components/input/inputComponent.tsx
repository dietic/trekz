import { FieldValues } from "react-hook-form";
import { InputProps } from "./inputInterface";

export default function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    className,
    fullWidth,
    darkMode = true,
    name,
    register,
    error,
    variant = "primary",
    ...rest
  } = props;
  const commonStyle = `border-green border-2 bg-transparent h-12 rounded-xl text-base px-5 placeholder:text-gray focus-visible:outline-none ${fullWidth ? "w-full" : ""
    }`;
  const darkStyle = `text-white focus-visible:border-white text-white`;
  const lightStyle = `text-blue focus-visible:border-blue text-blue`;
  const renderButton = () => {
    switch (variant) {
      case "primary":
        return (
          <div className="mb-3">
            <input
              className={`${commonStyle} ${darkMode ? darkStyle : lightStyle
                } ${className}`}
              {...register(name)}
              {...rest}
            />
            <span className="text-sm text-red">{error?.message}</span>
          </div>
        );
      case "secondary":
        return (
          <div className="mb-7 relative">
            <input
              className={`text-blue border-blue border-b-2 border-x-transparent border-t-transparent bg-transparent h-12 text-base px-5 focus-visible:outline-none focus-visible:border-b-green ${fullWidth ? "w-full" : ""}`}
              {...register(name)}
              {...rest}
            />
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return renderButton();
}
