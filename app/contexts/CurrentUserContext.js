"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user from the API
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/current-user");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();

        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);

        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loading , setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return context;
};
