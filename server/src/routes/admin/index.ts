import express from "express";

import { authRoutes } from "./authRoutes.js";
import { profileRoutes } from "./profileRoutes.js";
import { categoryManagementRoutes } from "./categoryManagementRoutes.js";
import { brandRoutes } from "./brandManagementRoutes.js";

export const adminRoutes = express.Router();

adminRoutes.use("/auth", authRoutes);
adminRoutes.use("/profile", profileRoutes);
adminRoutes.use("/category", categoryManagementRoutes);
adminRoutes.use("/brand", brandRoutes);
