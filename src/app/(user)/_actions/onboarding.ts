"use server";
import { User } from "@supabase/auth-js";
import { createClient } from "@/app/_utils/supabase/server";

export async function saveBasicInformation(
  user: User,
  payload: { name: string; lastName: string },
) {
  const supabase = await createClient();
  const { name, lastName } = payload;
  await supabase
    .from("user_profiles")
    .update({ name: name, last_name: lastName, onboarding_step: 3 })
    .match({ id: user.id });
}
