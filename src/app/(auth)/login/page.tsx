import logo from "../../../../public/images/logo-trekz-5.png";
import Image from "next/image";
import LoginForm from "./_components/LoginForm";

export default async function Login() {
  return (
    <main className="h-full w-full flex flex-col justify-between items-center pt-56 pb-24 z-20 relative">
      <Image src={logo} alt="Trekz logo" width={280} />
      <LoginForm />
    </main>
  );
}
