"use client";

import Button from "@/app/_components/button/buttonComponent";
import { toast } from "sonner";
import { register } from "../../_actions/register";
import { useFormStatus } from "react-dom";

export default function RegisterButton() {
  const { pending } = useFormStatus();

  const handleRegister = async (formData: FormData) => {
    try {
      await register(formData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Button
      disabled={pending}
      formAction={handleRegister}
      uppercase={true}
      filled={true}
      fullWidth
    >
      {pending ? "Registrando" : "Registrarme"}
    </Button>
  );
}
