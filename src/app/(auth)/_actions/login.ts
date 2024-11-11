"use server";
import { parseErrors } from "@/app/_utils/parse/errors";
import { createClient } from "@/app/_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(data: { email: string; password: string }) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(parseErrors(error.code, "login"));
  }
  // if (user && !user.user_metadata?.email_verified) {
  //   throw new Error(parseErrors("email_not_verified", "login"));
  // }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function logout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
