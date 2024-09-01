"use server";
import { createClient } from "@/app/_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // // type-casting here for convenience
  // // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect("/404");
  }
  revalidatePath("/", "layout");
  redirect("/trips");
}

export async function logout() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    console.log("user signed out");
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
