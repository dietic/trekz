import Link from "next/link";
import { ButtonProps } from "./ButtonInterface";
export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    color = "green",
    uppercase = false,
    filled = true,
    fullWidth = false,
    href,
    ...rest
  } = props;

  const colorVariants = {
    green: "bg-green",
    blue: "bg-blue",
  };

  //TODO: customize button to make it available when used with color blue (change border color, etc.)
  return href ? (
    <Link
      className={`font-bold text-white py-4 rounded-xl flex justify-center items-center border-green border-2  ${
        filled ? colorVariants[color] : `bg-transparent`
      } ${uppercase ? "uppercase" : ""} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      href={href}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`disabled:bg-gray disabled:border-gray font-bold text-white py-4 rounded-xl flex justify-center items-center border-green border-2 ${
        filled ? colorVariants[color] : `bg-transparent`
      } ${uppercase ? "uppercase" : ""} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
