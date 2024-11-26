import { Admin } from "../models/admin.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken
    || req.header("Authorization")?.replace("Bearer ","")
    //  console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken?._id)
    const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
    // console.log(admin)
  
    if (!admin) {
      throw new ApiError(401, "invalid access token");
    }
  
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid token")
  }
});
