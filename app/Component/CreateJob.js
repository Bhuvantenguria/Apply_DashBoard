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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle job creation
  const handleSubmit = async () => {
    if (!userId) {
      setErrorMsg("Unauthorized! Please log in.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    try {
      setLoading(true);
      const jobData = { userId, position, companyName, location, status };

      const response = await fetch("/api/post/create", {
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
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error submitting job:", error);
      setErrorMsg("Server error! Try again later.");
      setTimeout(() => setErrorMsg(""), 4000);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 transition-transform duration-300 hover:scale-105">
      {errorMsg && (
        <div className="p-4 mb-6 text-sm text-red-300 bg-red-700 rounded-md animate-pulse" role="alert">
          <span className="font-semibold">Error:</span> {errorMsg}
        </div>
      )}

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-300">
            Position
          </label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Software Engineer"
            required
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-300">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Google, Microsoft..."
            required
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-300">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="New York, Remote..."
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-300">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 rounded-md transition-all duration-300 flex justify-center items-center disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {loading && (
          <svg
            className="animate-spin mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        )}
        {loading ? "Adding Job..." : "Add Job"}
      </button>
    </div>
  );
};

export default CreateJob;
