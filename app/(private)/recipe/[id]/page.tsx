import { getRecipeById } from "@/app/actions/recipes";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  return (
    <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        {recipe.photo ? (
          <img
            src={recipe.photo}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">Фото відсутнє</span>
          </div>
        )}

        <h1 className="text-2xltext-gray-500 sm:text-3xl font-bold mt-4">
          {recipe.title}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Дата створення:{" "}
          {new Date(recipe.createdAt).toLocaleDateString("uk-UA")}
        </p>

        <p className="mt-4text-gray-500 leading-relaxed">
          {recipe.description}
        </p>
      </div>
    </main>
  );
}
