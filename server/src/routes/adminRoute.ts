import express from "express";
import {
  adminLogin,
  adminLogout,
  editAdminInfo,
  getAdminProfileDetails,
  registerAdmin,
} from "../controllers/adminController.js";
import { isLogin, isTokenPresent } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/admin-login", adminLogin);
router.post("/admin-logout", adminLogout);

//edit admin details
router.post("/edit-details", isLogin, editAdminInfo);

router.get("/login-check", isTokenPresent);
router.get("/get-profile-data", isLogin, getAdminProfileDetails);

export default router;
