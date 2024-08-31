import Button from "../_components/button/buttonComponent";
import Image from "next/image";
import googleLogo from "../../../public/images/google_logo.webp";

export default function Login() {
  return (
    <main className="h-full w-full flex flex-col justify-between items-center ">
      <h1 className="font-NAM text-white z-10 relative text-9xl mt-56">
        TREKZ
      </h1>
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
