import Button from "@/app/_components/button/buttonComponent";
import HorizontalDivider from "@/app/_components/horizontalDivider/horizontalDividerComponent";
import Input from "@/app/_components/input/inputComponent";
import { register } from "@/app/(auth)/_actions/register";

export default function Register() {
  return (
    <main className="h-full w-full flex flex-col items-center pt-32 px-5 z-20 relative ">
      <h1 className="font-NAM text-white text-7xl mb-14">TREKZ</h1>
      <div className="rounded-xl bg-white p-10 w-full">
        <h2 className="font-NAM text-4xl">ÚNETE</h2>
        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur. In sit tempor malesuada non
          ipsum odio est auctor.
        </p>
        <HorizontalDivider />
        <form>
          <Input
            name="email"
            className="mb-4"
            type="text"
            fullWidth
            placeholder="Email"
          />
          <Input
            name="password"
            className="mb-4"
            type="password"
            fullWidth
            placeholder="Password"
          />
          <Input
            className="mb-4"
            type="password"
            fullWidth
            placeholder="Confirm Password"
          />
          <Button formAction={register} fullWidth>
            Regístrate
          </Button>
        </form>
      </div>
    </main>
  );
}
