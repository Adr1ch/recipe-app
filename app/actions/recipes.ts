"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

export async function getRecipe() {
  const prisma = new PrismaClient();
  const recipeData = await prisma.recipe.findMany();
  return recipeData;
}

export async function createRecipe(formDataValue: FormData) {
  const prisma = new PrismaClient();
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (!user?.user?.id) {
    throw new Error("User is not authenticated");
  }

  const title = formDataValue.get("title")?.toString() || "";
  const description = formDataValue.get("description")?.toString() || "";
  const ownerId = user.user.id;

  await prisma.recipe.create({
    data: { title, description, ownerId },
  });

  revalidatePath("/");
}
