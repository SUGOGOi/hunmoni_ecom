import express, { Response } from "express";
import { registerAdmin } from "../../controllers/admin/auth/adminRegistrationController.js";
import {
  adminLogin,
  adminLogout,
} from "../../controllers/admin/auth/adminAuthController.js";
import { isLoginCheck } from "../../middlewares/auth/authMiddleware.js";
// import {
//   authRateLimiter,
//   generalRateLimiter,
// } from "../../middlewares/security/rateLimitMiddleware.js";

export const authRoutes = express.Router();

authRoutes.post("/register", registerAdmin);
authRoutes.post("/login", adminLogin); //authRateLimiter
authRoutes.post("/logout", adminLogout);
// authRoutes.post("/verify", handleEmailVerification);

// //edit admin details
authRoutes.get("/login-check", isLoginCheck); //generalRateLimiter,
