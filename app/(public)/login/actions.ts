"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

async function getOrCreateUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    console.error("Supabase auth error:", error);
    throw new Error("User authentication failed");
  }

  console.log("MSG: ", user, error);

  let existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        firstName: "",
        lastName: "",
        aboutMe: null,
        allergens: [],
        profileImage: null,
        role: "user",
      },
    });
  }

  return existingUser;
}

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

  await getOrCreateUser();

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

  await getOrCreateUser();

  revalidatePath("/", "layout");
  redirect("/instruction");
}
