"use client";
import { useEffect, useState } from "react";
import EditJob from "./EditJob";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/post/getbyId"); // Fetch only logged-in user's jobs
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Error fetching jobs");
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`/api/post/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete job: ${response.statusText}`);
      }
      // Remove the deleted job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.position} ${job.companyName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4 mt-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-white mb-6">
        My Jobs ({filteredJobs.length})
      </h2>

      <input
        type="text"
        placeholder="Search by position or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-800 p-6 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            <p className="font-semibold text-xl text-white">
              {job.position} at {job.companyName}
            </p>
            <p className="text-gray-300 mt-2">Location: {job.location}</p>
            <p className="text-gray-300 mt-1">Status: {job.status}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditJob(job)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteJob(job.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editJob && (
        <EditJob
          job={editJob}
          close={() => setEditJob(null)}
          refresh={fetchJobs}
          onUpdateSuccess={() => toast.success("Job updated successfully")}
        />
      )}
    </div>
  );
};

export default MyJobs;
