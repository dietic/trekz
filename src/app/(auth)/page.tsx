import Button from "../_components/Button/ButtonComponent";
import Image from "next/image";
import googleLogo from "../../../public/images/google_logo.webp";
import logo from "../../../public/images/logo-trekz-5.png";

export default async function Home() {
  return (
    <main className="h-full w-full flex flex-col justify-between items-center z-20 pt-56 relative ">
      <Image src={logo} alt="Trekz logo" width={280} />
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
