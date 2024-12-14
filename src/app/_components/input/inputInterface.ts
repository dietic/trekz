import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type InputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    fullWidth?: boolean;
    darkMode?: boolean;
    name: Path<T>;
    error: FieldError | undefined;
    register: UseFormRegister<T>;
    variant?: "primary" | "secondary";
  };
