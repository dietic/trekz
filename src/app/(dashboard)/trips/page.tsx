import { redirect } from "next/navigation";
import { createClient } from "@/app/_utils/supabase/server";
import Button from "@/app/_components/button/buttonComponent";
import { logout } from "@/app/(auth)/_actions/login";
export default async function Trips() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      page trips
      <form>
        <Button formAction={logout}>logout</Button>
      </form>
    </main>
  );
}
