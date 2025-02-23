"use client";

import { createTodo } from "../actions/recipes";

export default function CreateRecipe() {
  return (
    <div className="bg-gray-900 w-full text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-indigo-500 mb-8">
          Створити рецепт
        </h1>
        <form
          action={createTodo}
          className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Назва рецепту
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Назва рецепту"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Опис
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Опис"
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Створити
          </button>
        </form>
      </div>
    </div>
  );
}
