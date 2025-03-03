"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const API_URL = process.env.PUBLIC_API_URL;

export async function getTodo() {
  const data = await fetch(`${API_URL}/api/recipes`, {
    next: { revalidate: 3600 },
  });
  const response = await data.json();
  return response;
}

export async function createTodo(formDataValue: FormData) {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  const title = formDataValue.get("title")?.toString() || "";
  const description = formDataValue.get("description")?.toString() || "";

  await fetch(`${API_URL}/api/recipes`, {
    method: "POST",
    body: JSON.stringify({ title, description, ownerId: user?.user?.id }),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/");
}
