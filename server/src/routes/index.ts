import express from "express";
import { adminRoutes } from "./admin/index.js";
import { emailExistCheck } from "../middlewares/auth/emailExistCheck.js";

export const routes = express.Router();

routes.use("/admin", adminRoutes);
routes.use("/check-email-exist", emailExistCheck);
