import logo from "../../../../public/images/logo-trekz-5.png";
import Image from "next/image";
import RegisterForm from "./_components/RegisterForm";

export default function Register() {
  return (
    <main className="h-full w-full flex flex-col items-center pt-32 px-5 z-20 relative ">
      <Image className="mb-14" src={logo} alt="Trekz logo" width={150} />
      <RegisterForm />
    </main>
  );
}
