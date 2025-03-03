import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const recipes = await prisma.recipe.findMany();
    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, ownerId } = await req.json();

    if (!ownerId) {
      return new Response(JSON.stringify({ error: "ownerId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const recipe = await prisma.recipe.create({
      data: { title, description, ownerId },
    });

    return new Response(JSON.stringify(recipe), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
