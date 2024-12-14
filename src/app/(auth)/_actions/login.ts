"use server";
import { parseErrors } from "@/app/_utils/parse/errors";
import { createClient } from "@/app/_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(data: { email: string; password: string }) {
  if (!data.email || !data.password)
    throw new Error(parseErrors("invalid_credentials", "login"));
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.signInWithPassword(data);
  if (userError) {
    throw new Error(parseErrors(userError.code, "login"));
  }
  if (user && !user.user_metadata?.email_verified) {
    throw new Error(parseErrors("email_not_verified", "login"));
  }
  if (user) {
    const { data: userProfile, error: userProfileError } = await supabase
      .from("user_profiles")
      .select("*")
      .match({ id: user.id })
      .single();
    if (userProfileError) {
      throw new Error(parseErrors("error_getting_profile", "login"));
    }
    return userProfile.onboarded;
  }
  return;
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
