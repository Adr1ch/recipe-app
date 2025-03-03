import LogoutButton from "./_components/LogoutBtn";
import CreateRecipe from "./_components/CreateItemRecipe";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { getTodo } from "./actions/recipes";

export default async function Home() {
  const prisma = new PrismaClient();
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();
  const userData = await prisma.user.findUnique({
    where: {
      id: user?.user?.id,
    },
  });

  const recipeData = await prisma.recipe.findMany();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
        <LogoutButton />
        <h1>Home page</h1>
        <div>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
        <CreateRecipe />
        <div>recipeData: {JSON.stringify(recipeData, null, 2)}</div>
      </main>
    </div>
  );
}
