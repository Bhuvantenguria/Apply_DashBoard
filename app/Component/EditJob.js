"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJob = ({ job, close, refresh }) => {
  const [position, setPosition] = useState(job.position);
  const [companyName, setCompanyName] = useState(job.companyName);
  const [location, setLocation] = useState(job.location);
  const [status, setStatus] = useState(job.status);
  const [loading, setLoading] = useState(false);

  const updateJob = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/post/edit/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position, companyName, location, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      toast.success("Job updated successfully!");
      close();
      refresh(); // Refresh job list
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Job</h2>
        
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <div className="flex gap-4">
          <button
            onClick={updateJob}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors duration-300 flex justify-center items-center disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
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
            {loading ? "Updating..." : "Save"}
          </button>
          <button
            onClick={close}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-md transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
