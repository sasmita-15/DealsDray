import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.models.js";
import { Employee } from "../models/employee.models.js"; // Assuming the Employee model is defined in `employee.models.js`
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { adminName, password } = req.body;
  if ([adminName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({ adminName });
  if (existedAdmin) {
    throw new ApiError(409, "Username already exists");
  }

  const admin = await Admin.create({
    adminName: adminName.toLowerCase(),
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");
  if (!createdAdmin) {
    throw new ApiError(500, "Error during registration");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "Admin registered successfully"));
});

// Login Admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { adminName,password } = req.body;
  // console.log(adminName+ "loged in")

  if (!adminName) {
    throw new ApiError(400, "admin is required");
  }

  const admin = await Admin.findOne({ adminName });
  if (!admin) {
    throw new ApiError(404, "Admin does not exist");
  }

  const isPasswordCorrect = await admin.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);
  const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { admin: loggedInAdmin, accessToken, refreshToken }, "Admin logged in successfully")
    );
});

// Logout Admin
const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    { $set: { refreshToken: null } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

// Add Employee
const addEmp = asyncHandler(async (req, res) => {
  const { EmpName, email, mobileNo, designation, course, empImg } = req.body;
  // console.log(req.body.EmpName)
  if ([EmpName, email, mobileNo, designation, course].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All required fields must be filled");
  }

  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    throw new ApiError(409, "Employee with this email already exists");
  }

  const newEmployee = await Employee.create({
    EmpName,
    email,
    mobileNo,
    designation,
    course,
    empImg,
  });

  if (!newEmployee) {
    throw new ApiError(500, "Error creating employee");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newEmployee, "Employee added successfully"));
});

//Show Employee
const employees = asyncHandler(async (req, res) => {
  try {
    // Fetch all employees from the database
    const employeeList = await Employee.find(); // Assuming you're using MongoDB and Mongoose

    if (!employeeList || employeeList.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    // Send the list of employees in the response
    res.status(200).json({
      message: "Employees fetched successfully",
      data: {
        employees: employeeList,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees",
      error: error.message,
    });
  }
})

const singleEmp= asyncHandler(async(req,res)=>{

  const {id} = req.body;
  const product = await Employee.findById(id)
  // console.log(product)
  return res.status(200)
  .json(new ApiResponse(200, product , "single employee shown successfully"))
})

// Update Employee
const updateEmp = asyncHandler(async (req, res) => {
  const { _id, EmpName, email, mobileNo, designation, course, profileImg } = req.body;
  // console.log(req.body._id)
  const updatedEmployee = await Employee.findByIdAndUpdate(
    _id,
    { EmpName, email, mobileNo, designation, course, profileImg },
    { new: true }
  );
  // console.log(updatedEmployee)
  if (!updatedEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEmployee, "Employee updated successfully"));
});

const removeEmp = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedEmployee = await Employee.findByIdAndDelete(id);

  if (!deletedEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Employee removed successfully"));
});


export { registerAdmin, loginAdmin, logoutAdmin, addEmp, updateEmp, removeEmp, employees, singleEmp  };
