import Link from "next/link";
import { signout } from "@/app/actions/signout";
import { createClient } from "@/utils/supabase/server";

export default async function HeaderNavigations() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex gap-4">
      {!user ? (
        <>
          <Link
            href="/login"
            className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Логін / Реєстрація
          </Link>
        </>
      ) : null}
      {user ? (
        <Link
          href="/"
          className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Домашня
        </Link>
      ) : null}
      <Link
        href="/recipes"
        className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Усі рецепти
      </Link>
      {user ? (
        <>
          <Link
            href="/my-recipes"
            className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Мої рецепти
          </Link>
          <Link
            href="/profile"
            className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Мій профайл
          </Link>
          <Link
            href="/create-recipe"
            className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Створити рецепт
          </Link>
          <form className="w-max" action={signout}>
            <button
              type="submit"
              className="w-max py-1 px-2 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Розлогін
            </button>
          </form>
        </>
      ) : null}
    </nav>
  );
}
