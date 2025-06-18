import express from "express";
import { registerAdmin } from "../../controllers/admin/auth/adminRegistrationController.js";
import {
  adminLogin,
  adminLogout,
} from "../../controllers/admin/auth/adminAuthController.js";
import { isLoginCheck } from "../../middlewares/auth/adminAuthMiddleware.js";
import {
  authRateLimiter,
  generalRateLimiter,
} from "../../middlewares/security/rateLimitMiddleware.js";

export const authRoutes = express.Router();

authRoutes.post("/register", registerAdmin);
authRoutes.post("/login", authRateLimiter, adminLogin);
authRoutes.post("/logout", adminLogout);

// //edit admin details

authRoutes.get("/login-check", generalRateLimiter, isLoginCheck);
