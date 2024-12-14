"use client";

import Button from "@/app/_components/button/buttonComponent";
import { useFormStatus } from "react-dom";

export default function LoginButton(props: any) {
  const { pending } = useFormStatus();
  console.log("pending", pending);

  return (
    <Button disabled={pending} type="submit" uppercase={true} filled={true}>
      {pending ? (
        <>
          <span className="loader mr-2"></span> Ingresando...
        </>
      ) : (
        "Inicia sesión"
      )}
    </Button>
  );
}
