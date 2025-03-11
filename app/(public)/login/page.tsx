import { login, signup } from "./actions";

export default function SignupPage() {
  return (
    <form className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        className="w-full py-3 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        formAction={login}
      >
        Log in
      </button>
      <button
        className="w-full py-3 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        formAction={signup}
      >
        Sign up
      </button>
    </form>
  );
}
