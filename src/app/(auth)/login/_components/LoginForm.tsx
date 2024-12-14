"use client";
import Input from "@/app/_components/input/inputComponent";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginUserSchema, loginUserSchema } from "@/app/_types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login } from "../../_actions/login";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";
import { createActionHandler } from "@/app/_utils/form/handler";

export default function LoginForm() {
  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;
  const onLogin = async (data: any) => {
    try {
      const userOnboarded = await login(data);
      // await login(data);
      if (userOnboarded) {
        router.push("/trips");
      } else {
        router.push("/onboarding");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form
      className="flex flex-col w-80"
      action={createActionHandler(handleSubmit, onLogin)}
    >
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
