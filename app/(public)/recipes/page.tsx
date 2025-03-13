import { getRecipe } from "@/app/actions/recipes";
import RecipeList from "@/app/_components/RecipeList";

export default async function RecipesListingPage() {
  const data = await getRecipe();

  return (
    <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
      <RecipeList title="Список усіх рецептів" recipes={data} />
    </main>
  );
}
