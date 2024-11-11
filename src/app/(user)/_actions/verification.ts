"use server";

import { parseErrors } from "@/app/_utils/parse/errors";
import { createClient } from "@/app/_utils/supabase/server";
import { generateVerificationCode } from "@/app/_utils/verification/generation";
import { renderVerificationTemplate } from "@/app/_templates/email-templates";
import { Resend } from "resend";
import { User } from "@supabase/auth-js";
import moment from "moment";

export async function verifyUser(code: number | undefined, user: User) {
  const supabase = await createClient();
  if (user) {
    const { data: verificationCode, error: verificationCodesError } =
      await supabase
        .from("user_verification_codes")
        .select("*")
        .eq("user_id", user.id)
        .single();
    if (verificationCodesError)
      throw new Error("Error fetching verification codes");
    if (verificationCode && verificationCode.code) {
      if (verificationCode.code === code) {
        await supabase.auth.updateUser({
          data: {
            email_verified: true,
          },
        });
        await supabase
          .from("user_profiles")
          .update({ onboarding_step: 2 })
          .match({ id: user.id });
        await supabase
          .from("user_verification_codes")
          .delete()
          .match({ user_id: user.id });
      } else {
        throw new Error("Ingresaste un código erróneo");
      }
    }
  }
}

export async function resendVerificationCode(user: User) {
  const supabase = await createClient();
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  const randomVerificationCode = generateVerificationCode();

  if (user && user.email) {
    const { data: verificationCode, error: resendVerificationCodeError } =
      await supabase
        .from("user_verification_codes")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (resendVerificationCodeError) throw new Error("Verification error");

    if (verificationCode) {
      const now = moment(new Date());
      const enableAt = moment(verificationCode.last_atempt).add(1.5, "minutes");
      if (!verificationCode.last_atempt || now.isAfter(enableAt)) {
        const { data: _, error: updateError } = await supabase
          .from("user_verification_codes")
          .update({
            code: randomVerificationCode,
            expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            last_atempt: now,
          })
          .match({ user_id: user.id });
        if (updateError) throw new Error(parseErrors("update_error", "update"));
      } else {
        throw new Error("Tienes que esperar");
      }
    }

    const html = await renderVerificationTemplate({
      code: randomVerificationCode,
      email: user.email,
    });

    await resend.emails.send({
      from: "no-reply@trekz.co",
      to: user.email,
      subject: "Trekz verification",
      html: html,
    });
  }
}
