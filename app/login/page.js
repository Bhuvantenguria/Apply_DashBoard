"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/app/contexts/CurrentUserContext";
import { useRouter } from "next/navigation";

const login = () => {
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

      const response = await fetch("http://localhost:3000/api/auth/login", {
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
        setTimeout(() => {
          setErrorMsg("");
        }, 4000);
      } else {
        setSuccessMsg("You signed in successfully!");
        setTimeout(() => {
          router.push("/");
        }, 4000);
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Sign In</h1>

      {errorMsg ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">Error:</span> {errorMsg}
        </div>
      ) : null}

      {successMsg ? (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {successMsg}
        </div>
      ) : null}

      <div className="grid gap-6 mb-6 mt-8">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Password"
            required
          />
        </div>

        <button
          disabled={loading}
          onClick={handleSignIn}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
            loading ? "bg-gray-700 hover:bg-gray-800" : ""
          }`}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default login;
