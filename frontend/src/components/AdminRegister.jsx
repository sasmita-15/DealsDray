import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!adminName || !password) {
      setError("Both username and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/admin/register", {
        adminName,
        password,
      });

      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Registration</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-lg">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <a href="/login" className="text-blue-500">Login here</a>
      </div>
    </div>
  );
};

export default AdminRegister;
