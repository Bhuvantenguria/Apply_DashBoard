"use client";
import Jobs from "@/app/Component/AllJobs";
import { useCurrentUser } from "@/app/contexts/CurrentUserContext";

export default function Home() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="max-w-3xl container mx-auto flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Full Stack Next Js App</h1>

        {currentUser ? (
          <h2 className="text-lg font-medium">Welcome, {currentUser.name}</h2>
        ) : undefined}


        <Jobs />
      </div>
    </div>
  );
}
