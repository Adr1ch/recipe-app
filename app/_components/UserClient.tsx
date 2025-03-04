"use client";

export default function UserClient({ user }: { user: any }) {
  return (
    <div className="bg-gray-900 w-full text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-indigo-500 mb-8">
          Профіль користувача
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">ID:</span> {user.id}
          </p>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">Email:</span> {user.email}
          </p>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">Ім'я:</span>{" "}
            {user.firstName || "Не вказано"}
          </p>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">Прізвище:</span>{" "}
            {user.lastName || "Не вказано"}
          </p>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">Про мене:</span>{" "}
            {user.aboutMe || "Не вказано"}
          </p>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">Алергени:</span>{" "}
            {user.allergens.length > 0 ? user.allergens.join(", ") : "Немає"}
          </p>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-indigo-400">Роль:</span> {user.role}
          </p>
          {user.profileImage && (
            <div className="mt-4">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-2 border-indigo-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
