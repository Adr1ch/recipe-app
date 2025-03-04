"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

export async function getUser() {
  const prisma = new PrismaClient();
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user?.user?.id) {
    throw new Error("User not found");
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user?.user?.id,
    },
  });

  return userData;
}

export async function updateUser(formDataValue: FormData) {
  const prisma = new PrismaClient();
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
