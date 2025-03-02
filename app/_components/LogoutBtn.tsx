import { signout } from "../actions/signout";

export default async function LogoutButton() {
  return (
    <button
      onClick={signout}
      className="w-full py-3 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      Signout
    </button>
  );
}
