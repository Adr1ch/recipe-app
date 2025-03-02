import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const prisma = new PrismaClient();
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();

    console.log("MESSAGE: ", user);

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: {
        id: user?.user?.id,
      },
    });

    if (!userData) {
      return new Response(JSON.stringify({ error: "User profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
