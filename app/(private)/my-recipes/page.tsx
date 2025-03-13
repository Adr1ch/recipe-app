import { getUserRecipes } from "@/app/actions/recipes";
import RecipeList from "@/app/_components/RecipeList";

export default async function MyRecepiesPage() {
  const data = await getUserRecipes();

  return (
    <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
      <RecipeList title="Список моїх рецептів" recipes={data} />
    </main>
  );
}
