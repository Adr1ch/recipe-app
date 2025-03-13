"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addOrCreateUser() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user?.id || !data?.user?.email) {
      console.error("Supabase user not found or error:", error);
      throw new Error("User not found in Supabase");
    }

    let prismaUserData = await prisma.user.findUnique({
      where: { id: data.user.id },
    });

    if (!prismaUserData) {
      prismaUserData = await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email,
          role: "User",
        },
      });
    }

    return prismaUserData;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error("Failed to get user");
  }
}

export async function getUser() {
  return await addOrCreateUser();
}

export async function updateUser(formDataValue: FormData) {
  try {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user?.user?.id) {
      throw new Error("User not found");
    }

    const firstName = formDataValue.get("firstName")?.toString() || "";
    const lastName = formDataValue.get("lastName")?.toString() || "";
    const ownerId = user.user.id;

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
