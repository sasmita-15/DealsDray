import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminWelcome from "./components/AdminWelcome";
import AdminHome from "./components/AdminHome";
import EditEmployee from "./components/EditEmployee";
import Navbar from "./components/Navbar";
import AddEmployee from "./components/AddEmployee";
import { UserProvider } from "./context/auth";

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Navbar />
      <div className="container mx-auto p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/welcome" element={<AdminWelcome />} />
          <Route path="/home" element={<AdminHome />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;
