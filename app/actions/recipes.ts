"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getRecipe() {
  try {
    return await prisma.recipe.findMany();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
}

export async function getUserRecipes() {
  try {
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError || !data?.user) {
      throw new Error("User is not authenticated");
    }

    return await prisma.recipe.findMany({
      where: { ownerId: data.user.id },
    });
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    throw new Error("Failed to fetch user recipes");
  }
}

export async function createRecipe(formDataValue: FormData) {
  try {
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError || !data?.user) {
      throw new Error("User is not authenticated");
    }

    const title = formDataValue.get("title")?.toString().trim() || "";
    const description =
      formDataValue.get("description")?.toString().trim() || "";
    const ownerId = data.user.id;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    await prisma.recipe.create({
      data: { title, description, ownerId },
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw new Error("Failed to create recipe");
  }

  revalidatePath("/", "layout");
}
