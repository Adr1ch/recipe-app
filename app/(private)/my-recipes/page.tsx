import { getUserRecipes } from "@/app/actions/recipes";
import RecipeList from "@/app/_components/RecipeList";

export default async function MyRecepiesPage() {
  const data = await getUserRecipes();

  return (
    <main>
      <RecipeList title="Список моїх рецептів" recipes={data} />
    </main>
  );
}
