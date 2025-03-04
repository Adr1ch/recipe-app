import LogoutButton from "./_components/LogoutBtn";
import RecipeList from "./_components/RecipeList";
import UpdateUser from "./_components/UpdateUser";
import UserClient from "./_components/UserClient";
import CreateRecipe from "./_components/CreateItemRecipe";
import { getRecipe } from "./actions/recipes";
import { getUser } from "./actions/profile";

export default async function Home() {
  const userData = await getUser();
  const recipeData = await getRecipe();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
        <LogoutButton />
        <h1>Home page</h1>
        <UserClient user={userData} />
        <UpdateUser />
        <CreateRecipe />
        <RecipeList recipes={recipeData} />
      </main>
    </div>
  );
}
