import express from "express";
import {
  adminLogin,
  adminLogout,
  registerAdmin,
} from "../controllers/adminController.js";
import { isTokenPresent } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/admin-login", adminLogin);
router.post("/admin-logout", adminLogout);

router.get("/login-check", isTokenPresent);

export default router;
