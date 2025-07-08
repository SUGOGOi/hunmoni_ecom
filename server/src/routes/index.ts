import express from "express";
import { adminRoutes } from "./admin/index.js";

export const routes = express.Router();

routes.use("/admin", adminRoutes);
