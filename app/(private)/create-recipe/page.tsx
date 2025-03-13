import CreateRecipe from "@/app/_components/CreateItemRecipe";

export default async function CreateRecepiPage() {
  return (
    <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
      <CreateRecipe />
    </main>
  );
}
