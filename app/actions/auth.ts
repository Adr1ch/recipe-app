"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addOrCreateUser } from "@/app/actions/profile";
import { createClient } from "@/utils/supabase/server";

// export async function login(formData: FormData) {
//   const supabase = await createClient();

//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { data: signInData, error } = await supabase.auth.signInWithPassword(
//     data
//   );

//   if (error || !signInData.user) {
//     return redirect("/error");
//   }

//   if (!error && signInData.user) {
//     await addOrCreateUser();
//   }

//   revalidatePath("/", "layout");
//   return redirect("/");
// }

// export async function signup(formData: FormData) {
//   const supabase = await createClient();

//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { data: signUpData, error } = await supabase.auth.signUp(data);

//   if (error || !signUpData.user) {
//     console.error("Signup error:", error);
//     return redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   return redirect("/instruction");
// }

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error: signInWithPasswordError, ...signInWithPasswordData } =
    await supabase.auth.signInWithPassword(data);

  console.log("MSG: server action login", {
    signInWithPasswordError,
    signInWithPasswordData,
  });

  if (signInWithPasswordError) {
    redirect("/error");
  }

  if (!signInWithPasswordError) {
    await addOrCreateUser();
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error: signUpError, ...signUpData } = await supabase.auth.signUp(
    data
  );

  console.log("MSG: server action signup", {
    signUpError,
    signUpData,
  });

  if (signUpError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
