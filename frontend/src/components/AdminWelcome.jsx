import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/auth";

const AdminWelcome = () => {
  const navigate = useNavigate();
  const {admin } = useUser();
  console.log(admin)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, {admin.adminName}</h1>
      <button
        onClick={() => navigate("/home")}
        className="bg-blue-500 text-white py-2 px-6 rounded"
      >
        Go to Employee Dashboard
      </button>
    </div>
  );
};

export default AdminWelcome;
