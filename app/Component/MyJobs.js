"use client";

import { useEffect, useState } from "react";
import EditJob from "./EditJob";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:3000//api/post/getbyId"); // Fetch only logged-in user's jobs
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/job/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete job: ${response.statusText}`);
      }
      // Remove the deleted job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.position} ${job.companyName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">My Jobs ({filteredJobs.length})</h2>

      <input
        type="text"
        placeholder="Search by position or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {filteredJobs.map((job) => (
        <div key={job.id} className="bg-gray-100 p-4 rounded-md">
          <p className="font-semibold text-lg">{job.position} at {job.companyName}</p>
          <p className="text-gray-700">Location: {job.location}</p>
          <p className="text-gray-600">Status: {job.status}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditJob(job)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteJob(job.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editJob && (
        <EditJob job={editJob} close={() => setEditJob(null)} refresh={fetchJobs} />
      )}
    </div>
  );
};

export default MyJobs;
