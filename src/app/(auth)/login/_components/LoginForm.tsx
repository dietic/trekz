"use client";
import Input from "@/app/_components/Input/InputComponent";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginUserSchema, loginUserSchema } from "@/app/_types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login } from "../../_actions/login";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;
  const onLogin = async (data: any) => {
    try {
      await login(data);
    } catch (error: any) {
      console.log("error login", error);
      toast.error(error.message);
    }
  };

  return (
    <form className="flex flex-col w-80" onSubmit={handleSubmit(onLogin)}>
      <Input
        name="email"
        fullWidth
        type="text"
        register={register}
        error={errors.email}
        placeholder="Email"
      />
      <div className="w-full mb-5">
        <Input
          name="password"
          fullWidth
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password}
        />
        <div className="flex justify-between text-white underline text-sm">
          <Link className="hover:text-white" href="/register">
            Regístrate
          </Link>
          <Link className="hover:text-white" href="/">
            Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
      <LoginButton />
    </form>
  );
}
