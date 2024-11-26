import mongoose, {Schema} from "mongoose";

const employeeSchema = new mongoose.Schema({
  EmpName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  empImg: {
    type: String,    
  },
}, { timestamps: true });

export const Employee = mongoose.model("Employee", employeeSchema);
