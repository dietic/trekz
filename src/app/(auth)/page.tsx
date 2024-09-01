import Button from "../_components/button/buttonComponent";
import Image from "next/image";
import googleLogo from "../../../public/images/google_logo.webp";
import { createClient } from "../_utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/");
  }
  return (
    <main className="h-full w-full flex flex-col justify-between items-center z-20 relative ">
      <h1 className="font-NAM text-white text-9xl mt-56">TREKZ</h1>
      <div className="mb-24 w-80">
        <Button className="mb-5" fullWidth href="/register" uppercase={true}>
          Regístrate
        </Button>
        <Button
          className="mb-5"
          fullWidth
          href="/login"
          uppercase={true}
          filled={false}
        >
          Inicia sesión
        </Button>
        <Button className="!bg-white !border-none !text-black" fullWidth>
          <Image
            className="mr-2"
            src={googleLogo}
            alt="Google logo"
            height={23}
          />{" "}
          Continuar con Google
        </Button>
      </div>
    </main>
  );
}
