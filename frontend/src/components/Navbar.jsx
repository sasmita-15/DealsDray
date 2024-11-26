import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/auth";

const Navbar = () => {
  const { admin, logout } = useUser(); // Ensure 'logout' is available from useUser
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between items-center">
        <div className="flex space-x-4">
          <li>
            <Link
              to="/home"
              className="text-white hover:bg-blue-700 px-4 py-2 rounded"
            >
              Home
            </Link>
          </li>
        </div>

        <div>
          {admin ? (
            <div className="flex items-center space-x-4 hover:bg-red-600 rounded-md px-4 py-2 cursor-pointer"
            onClick={handleLogout}>
              <span className="text-white font-semibold">
                Welcome, {admin.adminName}
              </span>
              
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:bg-blue-700 px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
