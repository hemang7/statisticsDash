import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";

export default function Navbar({ user }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout(auth);
    } catch (e) {
      console.log("Error logging out: " + e.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900">
      <div className="container mx-auto p-3">
        <div className="flex items-center justify-between">
          {/* App Name */}
          <Link
            to="/main-app"
            className="text-lg font-bold leading-relaxed text-white"
          >
            QCS Statistics Dashboard
          </Link>
          <button
            className="lg:hidden text-white text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className={`fas ${navbarOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
          <div
            className={`lg:flex flex-grow items-center${
              navbarOpen ? "" : " hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row list-none ml-auto gap-10">
              <li className="nav-item">
                <Link
                  to="/main-app"
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/my-analysis"
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                >
                  My Analysis
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
