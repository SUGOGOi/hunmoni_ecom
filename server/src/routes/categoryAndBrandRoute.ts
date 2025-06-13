import express from "express";
import {
  addBrand,
  addCategory,
  addSubCategory,
  getAllCategory,
  getSubcatgories,
} from "../controllers/categoryAndBrandController.js";
import { isLogin } from "../middlewares/auth.js";

const router = express.Router();

//===============================CATEGORY=================
router.post("/add-category", isLogin, addCategory);
router.get("/all-categories", getAllCategory);

//===============================SUB CATEGORY============
router.post("/add-sub-category", isLogin, addSubCategory);
router.get("/sub-categories", getSubcatgories);

//=================================BRAND==================
router.post("/add-brand", isLogin, addBrand);

export default router;
