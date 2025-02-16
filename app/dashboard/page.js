"use client";

import React from "react";
import MyJobs from "../Component/MyJobs";
import { useRouter } from "next/navigation";

function DashBoard() {
  const router = useRouter();

  const handleAddJob = () => {
    router.push("/addjobs");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">
          Dashboard
        </h1>
        <button
          onClick={handleAddJob}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow transition-all duration-300"
        >
          Add New Job
        </button>
      </header>
      <main>
        <MyJobs />
      </main>
    </div>
  );
}

export default DashBoard;
