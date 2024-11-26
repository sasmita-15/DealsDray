import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const EditEmployee = () => {
  const { id } = useParams(); // Ensure this matches your route param (e.g., `/edit-employee/:id`)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: id,
    EmpName: "",
    email: "",
    mobileNo: "",
    designation: "",
    course: "",
  });
  const adminToken = Cookies.get("adminToken");
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        
        if (!adminToken) {
          alert("Unauthorized access. Please log in again.");
          navigate("/login");
          return;
        }
        console.log(id);
        console.log(adminToken)
        const res = await axios.post("http://localhost:8000/admin/employee", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          id: id
        });
        
        setFormData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching employee details. Please try again.");
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminToken = Cookies.get("adminToken");
      if (!adminToken) {
        alert("Unauthorized access. Please log in again.");
        navigate("/login");
        return;
      }

      await axios.post(
        `http://localhost:8000/admin/update-employee`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      alert("Employee updated successfully");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Error updating employee");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
        <input
          type="text"
          name="EmpName"
          value={formData.EmpName}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Mobile Number"
        />
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Designation"
        />
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Course"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
