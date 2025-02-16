"use client";
import Jobs from "@/app/Component/AllJobs";
import { useCurrentUser } from "@/app/contexts/CurrentUserContext";

export default function Home() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <main className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="mt-5 text-3xl font-bold text-gray-800 dark:text-white">
          </h1>
          {currentUser && (
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Welcome, {currentUser.name}
            </h2>
          )}
        </div>
        <Jobs />
      </main>
    </div>
  );
}
