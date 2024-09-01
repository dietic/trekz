import Button from "@/app/_components/button/buttonComponent";
import Input from "@/app/_components/input/inputComponent";
import Link from "next/link";
import { login } from "@/app/(auth)/_actions/login";
import { createClient } from "@/app/_utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/trips");
  }
  return (
    <main className="h-full w-full flex flex-col justify-between items-center pt-56 pb-24 z-20 relative ">
      <h1 className="font-NAM text-white text-9xl">TREKZ</h1>
      <form className="flex flex-col w-80">
        <Input
          name="email"
          className="mb-5"
          fullWidth
          placeholder="Email"
          type="text"
        />
        <div className="w-full mb-5">
          <Input
            name="password"
            className="mb-1"
            fullWidth
            placeholder="Password"
            type="password"
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
        <Button formAction={login} uppercase={true} filled={true}>
          Inicia sesión
        </Button>
      </form>
    </main>
  );
}
