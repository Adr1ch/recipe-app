"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getUser() {
  try {
    const supabase = await createClient();
    const { data: supabaseUserData, error } = await supabase.auth.getUser();

    if (error || !supabaseUserData?.user?.id) {
      console.error("Supabase user not found or error:", error);
      throw new Error("User not found in Supabase");
    }

    const prismaUserData = await prisma.user.findUnique({
      where: { id: supabaseUserData.user.id },
    });

    if (!prismaUserData) {
      console.error(
        `User with ID ${supabaseUserData.user.id} not found in database`
      );
      throw new Error("User not found in database");
    }

    return {
      prismaUserData,
      supabaseUserData,
    };
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error("Failed to get user");
  }
}

export async function updateUser(formDataValue: FormData) {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user?.user?.id) {
    throw new Error("User not found");
  }

  const firstName = formDataValue.get("firstName")?.toString() || "";
  const lastName = formDataValue.get("lastName")?.toString() || "";
  const ownerId = user.user.id;

  try {
    await prisma.user.update({
      where: { id: ownerId },
      data: { firstName, lastName },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }

  revalidatePath("/");
}
