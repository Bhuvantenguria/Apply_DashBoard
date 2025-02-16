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
    <div>
      <div className="p-4">
        <button
          onClick={handleAddJob}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Job
        </button>
      </div>
      <MyJobs />
    </div>
  );
}

export default DashBoard;
