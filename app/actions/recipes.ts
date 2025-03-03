"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const API_URL = process.env.PUBLIC_API_URL;

const prisma = new PrismaClient();

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

  if (!user?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const title = formDataValue.get("title")?.toString() || "";
  const description = formDataValue.get("description")?.toString() || "";
  const ownerId = user.user.id;

  const recipe = await prisma.recipe.create({
    data: { title, description, ownerId },
  });

  revalidatePath("/");
}
