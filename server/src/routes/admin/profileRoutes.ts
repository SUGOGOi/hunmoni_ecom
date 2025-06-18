import express from "express";
import { isLogin } from "../../middlewares/auth/adminAuthMiddleware.js";
import {
  editAdminInfo,
  getAdminProfileDetails,
} from "../../controllers/admin/profile/adminProfileController.js";
import { adminRateLimiter } from "../../middlewares/security/rateLimitMiddleware.js";

export const profileRoutes = express.Router();

profileRoutes.get("/get", adminRateLimiter, isLogin, getAdminProfileDetails);
profileRoutes.post("/edit-details", adminRateLimiter, isLogin, editAdminInfo);
