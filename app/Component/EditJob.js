"use client";

import { useState } from "react";

const EditJob = ({ job, close, refresh }) => {
  const [position, setPosition] = useState(job.position);
  const [companyName, setCompanyName] = useState(job.companyName);
  const [location, setLocation] = useState(job.location);
  const [status, setStatus] = useState(job.status);
  const [loading, setLoading] = useState(false);

  const updateJob = async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/post/edit/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position, companyName, location, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      close();
      refresh(); // Refresh job list
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Job</h2>

        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2 rounded w-full mb-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={updateJob}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save"}
          </button>
          <button onClick={close} className="bg-gray-500 text-white px-4 py-2 rounded-md w-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
