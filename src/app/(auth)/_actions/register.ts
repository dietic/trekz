"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/_utils/supabase/server";
import { parseErrors } from "@/app/_utils/parse/errors";
import { generateVerificationCode } from "@/app/_utils/verification/generation";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const randomVerificationCode = generateVerificationCode();

  const { data: _, error: signUpError } = await supabase.auth.signUp(data);

  if (signUpError) {
    throw new Error(parseErrors(signUpError.code, "register"));
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const payload = {
      user_id: user.id,
      code: randomVerificationCode,
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
    await supabase.from("user_verification_codes").insert(payload);
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}
