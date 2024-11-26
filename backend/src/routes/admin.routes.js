import { addEmp, employees, loginAdmin, logoutAdmin, registerAdmin, removeEmp, singleEmp, updateEmp } from "../controllers/admin.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post(
  "/add-employee",
  upload.single("empImg"),
  addEmp
);
router.post("/update-employee", verifyJWT, updateEmp);
router.delete("/delete-employee/:id",verifyJWT, removeEmp);
router.get("/employees", verifyJWT, employees);
router.post("/logout", verifyJWT, logoutAdmin);
router.post("/employee",singleEmp)

export default router;
