import Button from "@/app/_components/Button/ButtonComponent";
import { logout } from "@/app/(auth)/_actions/login";
export default async function Trips() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      page trips
      <form>
        <Button formAction={logout}>logout</Button>
      </form>
    </main>
  );
}
