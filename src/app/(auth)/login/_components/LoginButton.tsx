"use client";

import Button from "@/app/_components/Button/ButtonComponent";
import { useFormStatus } from "react-dom";

export default function LoginButton(props: any) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" uppercase={true} filled={true}>
      {pending ? "Ingresando" : "Inicia sesión"}
    </Button>
  );
}
