import { getRecipe } from "@/app/actions/recipes";
import RecipeList from "@/app/_components/RecipeList";

export default async function RecipesListingPage() {
  const data = await getRecipe();

  return (
    <main>
      <RecipeList title="Список усіх рецептів" recipes={data} />
    </main>
  );
}
