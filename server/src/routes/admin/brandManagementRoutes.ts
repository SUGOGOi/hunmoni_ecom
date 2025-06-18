import express from "express";
import { uploadBrandLogo } from "../../middlewares/file/multer.js";
import { addBrand } from "../../controllers/admin/catalog/brandManagementController.js";

export const brandRoutes = express.Router();

brandRoutes.post("/add", uploadBrandLogo.single("file"), addBrand);
