import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link

import { useUser } from "../context/auth.jsx";

const Login = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, access } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/admin/login", {
        adminName,
        password,
      });

      login(res.data.data.admin);
      access(res.data.data.accessToken);

      alert("Login successful");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="text"
          placeholder="Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Login
        </button>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
