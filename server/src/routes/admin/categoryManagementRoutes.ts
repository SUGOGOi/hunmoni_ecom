import express from "express";
import { isLogin } from "../../middlewares/auth/adminAuthMiddleware.js";
import {
  addCategory,
  getAllCategory,
  getSubcatgories,
} from "../../controllers/admin/catalog/categoryManagementController.js";
import {
  adminRateLimiter,
  generalRateLimiter,
} from "../../middlewares/security/rateLimitMiddleware.js";

export const categoryManagementRoutes = express.Router();

categoryManagementRoutes.post("/add", adminRateLimiter, isLogin, addCategory);
categoryManagementRoutes.get("/get-all", generalRateLimiter, getAllCategory);
categoryManagementRoutes.get(
  "/get-subcategpries",
  generalRateLimiter,
  getSubcatgories
);
