"use server";

import { revalidatePath } from "next/cache";

// const API_URL = "http://localhost:3000/api/recipes";
const API_URL =
  "https://recipe-app-git-main-adr1chs-projects.vercel.app/api/recipes";

export async function getTodo() {
  const data = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });
  const response = await data.json();
  return response;
}

export async function createTodo(formDataValue: FormData) {
  const title = formDataValue.get("title")?.toString() || "";
  const description = formDataValue.get("description")?.toString() || "";

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ title, description }),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/");
}
