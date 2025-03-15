import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0a192f] text-gray-300">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        Ласкаво просимо до Книги Рецептів
      </h1>
      <p className="text-center max-w-md mb-8">
        Досліджуйте та створюйте улюблені рецепти разом із нами!
      </p>
      <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
        <Link
          href="/recipes"
          className="block bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-indigo-500 hover:border-indigo-400"
        >
          <h2 className="text-xl font-semibold text-indigo-400">
            📖 Усі рецепти
          </h2>
          <p className="mt-2">Перегляньте всі доступні рецепти.</p>
        </Link>
        {user && (
          <>
            <Link
              href="/my-recipes"
              className="block bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-indigo-500 hover:border-indigo-400"
            >
              <h2 className="text-xl font-semibold text-indigo-400">
                🍳 Мої рецепти
              </h2>
              <p className="mt-2">
                Перегляньте або керуйте власними рецептами.
              </p>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
