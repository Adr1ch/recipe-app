"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addOrCreateUser } from "@/app/actions/profile";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signInData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error || !signInData.user) {
    redirect("/error");
  }

  if (!error && signInData.user) {
    await addOrCreateUser();
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signUpData, error } = await supabase.auth.signUp(data);

  if (error || !signUpData.user) {
    console.error("Signup error:", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/instruction");
}
