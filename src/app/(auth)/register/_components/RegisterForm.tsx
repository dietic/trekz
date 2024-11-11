"use client";
import Input from "@/app/_components/Input/InputComponent";
import { RegisterUser, RegisterUserSchema } from "@/app/_types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import RegisterButton from "./RegisterButton";
import HorizontalDivider from "@/app/_components/HorizontalDivider/HorizontalDividerComponent";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
  } = useForm<RegisterUser>({ resolver: zodResolver(RegisterUserSchema) });
  return (
    <div className="inside-container">
      <h2 className="font-NAM text-4xl">ÚNETE</h2>
      <p className="font-light">
        Lorem ipsum dolor sit amet consectetur. In sit tempor malesuada non
        ipsum odio est auctor.
      </p>
      <HorizontalDivider />
      <form>
        <div className="mb-4">
          <Input
            name="email"
            darkMode={false}
            type="text"
            fullWidth
            register={register}
            error={errors.email}
            placeholder="Email"
          />
          <Input
            name="password"
            darkMode={false}
            type="password"
            register={register}
            error={errors.password}
            fullWidth
            placeholder="Password"
          />
          <Input
            darkMode={false}
            type="password"
            name="confirmPassword"
            fullWidth
            register={register}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
          />
          <span className="block text-right w-full text-sm text-black">
            Ya tienes una cuenta?{" "}
            <Link className="font-bold hover:underline" href="/login">
              Ingresa
            </Link>
          </span>
        </div>
        <RegisterButton />
      </form>
    </div>
  );
}
