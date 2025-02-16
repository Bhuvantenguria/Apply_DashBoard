"use client";
import { useEffect, useState } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/post/getAll");

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-900 to-gray-800 transition-colors duration-300">
      <header className="flex justify-center items-center p-4 bg-gray-800 shadow-lg">
        <h1 className="text-xl font-bold text-white">Job Applications</h1>
      </header>

      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Jobs ({jobs.length})
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        
        {loading && (
          <div className="flex justify-center items-center h-32">
            <svg
              className="animate-spin h-12 w-12 text-white"
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
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-gray-400">No jobs available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <p className="font-bold text-lg text-white">
                  {job.position} at {job.companyName}
                </p>
                <p className="text-gray-300 mt-2">Location: {job.location}</p>
                <p className="text-gray-300 mt-1">Status: {job.status}</p>
                <p className="text-gray-300 mt-1">Candidate: {job.user.name}</p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Jobs;
