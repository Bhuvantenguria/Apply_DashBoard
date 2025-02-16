"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/app/contexts/CurrentUserContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setErrorMsg(data.error);
        setTimeout(() => setErrorMsg(""), 4000);
      } else {
        setSuccessMsg("You signed in successfully!");
        setTimeout(() => {
          router.push("/");
          window.location.reload();
        }, 4000);
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
      setErrorMsg("Something went wrong. Please try again.");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-lg w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Sign In</h1>

        {errorMsg && (
          <div className="p-4 mb-4 text-sm text-red-300 rounded-lg bg-red-700" role="alert">
            <span className="font-medium">Error: </span>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-4 mb-4 text-sm text-green-300 rounded-lg bg-green-700" role="alert">
            {successMsg}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Password"
              required
            />
          </div>

          <button
            disabled={loading}
            onClick={handleSignIn}
            className={`w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition-colors duration-300 ${
              loading ? "cursor-not-allowed opacity-75" : ""
            }`}
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
