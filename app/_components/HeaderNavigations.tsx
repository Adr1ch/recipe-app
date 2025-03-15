import Link from "next/link";
import { signout } from "@/app/actions/signout";
import { createClient } from "@/utils/supabase/server";

export default async function HeaderNavigations() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full bg-white shadow-md dark:bg-gray-900">
      <nav className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-indigo-600 dark:text-white"
        >
          Рецепти
        </Link>

        <div className="flex flex-wrap items-center space-x-4">
          <Link
            href="/recipes"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500"
          >
            Усі рецепти
          </Link>
          {user && (
            <>
              <Link
                href="/my-recipes"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500"
              >
                Мої рецепти
              </Link>
              <Link
                href="/create-recipe"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500"
              >
                Створити рецепт
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-500"
              >
                Мій профіль
              </Link>
            </>
          )}
        </div>

        <div>
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Логін / Реєстрація
            </Link>
          ) : (
            <form action={signout}>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Вийти
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
