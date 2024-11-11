import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { LoginUser, RegisterUser } from "@/app/_types/user";

export type InputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    fullWidth?: boolean;
    darkMode?: boolean;
    name: Path<T>;
    error: FieldError | undefined;
    register: UseFormRegister<T>;
  };
