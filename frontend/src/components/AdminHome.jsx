import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";  // Import js-cookie

const AdminHome = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken"); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Get token from cookies
        const adminToken = Cookies.get("adminToken"); // Use Cookies.get to get the token from cookies
        
        if (!adminToken) {
          alert("Admin not authenticated. Please log in.");
          navigate("/login");  // Redirect if no token found
          return;
        }
        const res = await axios.get("http://localhost:8000/admin/employees", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setEmployees(res.data.data.employees);
      } catch (error) {
        console.error(error);
        alert("Error fetching employees");
      }
    };

    fetchEmployees();
  }, [navigate]); // Add navigate to the dependency array

  const handleDelete = async (id) => {
    console.log(id)
    try {
      if (!adminToken) {
        alert("Admin not authenticated. Please log in.");
        navigate("/login");
        return;
      }
  
      await axios.delete(`http://localhost:8000/admin/delete-employee/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting employee");
    }
  };
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Employee List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border border-gray-300 px-4 py-2">{emp.EmpName}</td>
              <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => navigate(`/edit/${emp._id}`)}
                  className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
