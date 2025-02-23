"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTodo() {
  const data = await fetch("/api/recipes", {
    next: { revalidate: 3600 },
  });
  const response = await data.json();
  return response;
}

export async function createTodo(formDataValue: FormData) {
  const title = formDataValue.get("title")?.toString() || "";
  const description = formDataValue.get("description")?.toString() || "";

  await fetch("/api/recipes", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/");
}
