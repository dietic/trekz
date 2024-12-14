"use server";
import { User } from "@supabase/auth-js";
import { createClient } from "@/app/_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function saveExtraInformation(
  user: User,
  payload: { dni?: string; phone?: string; dob?: Date },
) {
  const supabase = await createClient();
  await supabase
    .from("user_profiles")
    .update({
      ...(payload.dni && { document_id: payload.dni }),
      ...(payload.phone && { phone_number: payload.phone }),
      ...(payload.dob && { dob: payload.dob }),
      onboarding_step: 0,
      onboarded: true,
    })
    .match({ id: user.id });
  revalidatePath("/", "layout");
  redirect("/trips");
}
