export default async function RecipeList(data: {
  recipes: Array<{
    id: string;
    title: string;
    description: string;
    createdAt: Date;
  }>;
}) {
  return (
    <div className="bg-gray-900 w-full min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-indigo-500 mb-8">
          Список Рецептів
        </h1>
        <div className="space-y-6">
          {data?.recipes?.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200"
            >
              <h2 className="text-xl font-semibold text-indigo-400">
                {recipe.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2">{recipe.description}</p>
              <p className="text-xs text-gray-500 mt-4">
                Додано: {new Date(recipe.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
