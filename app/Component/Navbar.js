"use client";
import { deleteCookie, getCookie } from "cookies-next/client";
import Link from "next/link";
import { useCurrentUser } from "@/app/contexts/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Monitor token changes and update local login state
  useEffect(() => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  }, [currentUser]);

  const handleLogout = () => {
    deleteCookie("token");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Next.js
          </span>
        </Link>
        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div className={`w-full md:block md:w-auto ${menuOpen ? "block" : "hidden"}`} id="navbar-default">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/addjobs"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                  >
                    Add Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 focus:outline-none"
                  >
                    {currentUser && currentUser.name
                      ? `Hi ${currentUser.name}`
                      : "User"}
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-20">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sinup"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
