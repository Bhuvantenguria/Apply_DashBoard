"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/contexts/CurrentUserContext";

const CreateJob = () => {
  const { currentUser, token } = useCurrentUser();
  const userId = currentUser?.id;

  const [position, setPosition] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  // Handle job creation
  const handleSubmit = async () => {
    if (!userId) {
      setErrorMsg("Unauthorized! Please log in.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    try {
      const jobData = {
        userId,
        position,
        companyName,
        location,
        status,
      };

      const response = await fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setErrorMsg(data.error || "Something went wrong!");
        setTimeout(() => setErrorMsg(""), 4000);
      } else {
        console.log("Job created successfully", data);
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      setErrorMsg("Server error! Try again later.");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {errorMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
          <span className="font-medium">Error:</span> {errorMsg}
        </div>
      )}

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">
            Position
          </label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Software Engineer"
            required
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Google, Microsoft..."
            required
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="New York, Remote..."
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto px-5 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
      >
        Add Job
      </button>
    </div>
  );
};

export default CreateJob;
