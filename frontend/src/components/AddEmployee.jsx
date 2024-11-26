import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUri = "http://localhost:8000"; // Replace with your backend API URI

const AddEmployee = () => {
  const [EmpName, setEmpName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [empImg, setEmpImg] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setEmpImg(e.target.files[0]); // Capture the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("EmpName", EmpName);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    if (empImg) {
      formData.append("empImg", empImg); // Append file to FormData
    }

    try {
      const res = await axios.post(`${apiUri}/admin/add-employee`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Employee added successfully");
        navigate("/home");
      } else {
        alert("Error adding employee");
      }
    } catch (error) {
      console.error(error);
      alert("Error while adding employee");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96"
      >
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>

        <input
          type="text"
          placeholder="Employee Name"
          value={EmpName}
          onChange={(e) => setEmpName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <input
          type="text"
          placeholder="Employee email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

<select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="sales">Sales</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        >
          
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>

        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
