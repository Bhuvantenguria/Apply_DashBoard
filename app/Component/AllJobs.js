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
      const response = await fetch("http://localhost:3000/api/post/getAll");

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
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Jobs ({jobs.length})</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-600">Loading jobs...</p>}

      {!loading && jobs.length === 0 && <p className="text-gray-500">No jobs available.</p>}

      {jobs.map((job) => (
        <div key={job.id} className="bg-blue-50 p-4 rounded-md shadow">
          <p className="font-semibold text-lg">{job.position} at {job.companyName}</p>
          <p className="text-gray-700">Location: {job.location}</p>
          <p className="text-gray-600">Status: {job.status}</p>
          <p className="text-gray-600">Candidate: {job.user.name}</p>
          
        </div>
      ))}
    </div>
  );
};

export default Jobs;
