import UpdateUser from "./_components/UpdateUser";
import UserClient from "./_components/UserClient";
import CreateRecipe from "./_components/CreateItemRecipe";
import { getUser } from "./actions/profile";

export default async function Home() {
  const userData = await getUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Home page</h1>
        <UserClient user={userData?.prismaUserData} />
        <UpdateUser />
        <CreateRecipe />
      </main>
    </div>
  );
}
