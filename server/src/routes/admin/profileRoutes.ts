import express from "express";
import {
  editAdminInfo,
  getAdminProfileDetails,
} from "../../controllers/admin/profile/adminProfileController.js";
import { isLogin } from "../../middlewares/auth/authMiddleware.js";
// import { adminRateLimiter } from "../../middlewares/security/rateLimitMiddleware.js";

export const profileRoutes = express.Router();

profileRoutes.get("/get", isLogin, getAdminProfileDetails); //adminRateLimiter, isLogin,
profileRoutes.post("/edit-details", isLogin, editAdminInfo); // adminRateLimiter, isLogin,
