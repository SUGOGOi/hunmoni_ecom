import { Request, Response } from "express";
import { Category } from "../models/categoryModel.js";
import { Brand } from "../models/brandModal.js";
import mongoose from "mongoose";

//<======================CREATE CATEGORY=============================>
export const addCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        error: `Category is required`,
      });
    }

    const catgoryExist = await Category.findOne({ category });

    if (catgoryExist) {
      return res.status(400).json({
        success: false,
        error: `Category already exist`,
      });
    }

    const newCategory = await Category.create({
      category,
    });

    return res.status(201).json({
      success: true,
      message: `${newCategory.category} added!`,
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<================================================GET ALL CATEGORY============================================>
export const getAllCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const Categories = await Category.find({ category: { $ne: null } });

    if (Categories.length <= 0) {
      return res.status(400).json({
        success: false,
        error: `No category exist`,
        Categories,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Categories fetched`,
      Categories,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<=====================================================ADD SUB CATEGORY=================================================>
export const addSubCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { subCategory, categoryId } = req.body;
    if (!subCategory || !categoryId) {
      return res.status(400).json({
        success: false,
        error: `Sub-Category and Category are required`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        error: `Invalid Category ID format`,
      });
    }

    const subCategoryExist = await Category.findOne({ subCategory });

    if (subCategoryExist) {
      return res.status(400).json({
        success: false,
        error: `${subCategory} name already exist!`,
      });
    }

    const categoryExist = await Category.findById(categoryId);
    // console.log(categoryExist);
    if (!categoryExist) {
      return res.status(400).json({
        success: false,
        error: `Invalid category id or it does not exist`,
      });
    }

    const newSubCategory = await Category.create({
      subCategory,
      parentCategoryId: categoryId,
    });

    return res.status(201).json({
      success: true,
      message: `${newSubCategory.subCategory} added!`,
      newSubCategory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<==================================GET SUB CATEGORIES OF PARTICULAR CATEGORY===========================================
export const getSubcatgories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: `category is required`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        error: `Invalid Category ID format`,
      });
    }

    const subCategories = await Category.find({ parentCategoryId: categoryId });

    if (subCategories.length <= 0) {
      return res.status(400).json({
        success: false,
        error: `No sub caregories, for this category`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `sub categories fetched`,
      subCategories,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<==================================================ADD BRAND==================================================>
export const addBrand = async (req: Request, res: Response): Promise<any> => {
  try {
    const { brandName, description, country, foundedYear, website, status } =
      req.body;

    if (
      !brandName ||
      !description ||
      !country ||
      !foundedYear ||
      !website ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: `All fields are required`,
      });
    }

    // Clean brandName and website
    const finalBrandName = brandName?.trim().toLowerCase();
    const finalWebsite = website?.trim().toLowerCase();

    const brandExist = await Brand.findOne({
      brandName: finalBrandName,
    });

    // console.log(brandExist);

    if (brandExist) {
      return res.status(400).json({
        success: false,
        error: `Brand already exist`,
      });
    }

    const websiteExist = await Brand.findOne({
      website: finalWebsite,
    });

    if (websiteExist) {
      return res.status(400).json({
        success: false,
        error: `website already exist`,
      });
    }

    const newBrand = await Brand.create({
      brandName: finalBrandName,
      description,
      country,
      foundedYear,
      website: finalWebsite,
      status,
    });

    return res.status(201).json({
      success: true,
      message: `${newBrand.brandName} added`,
      newBrand,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
//<===================================================GET ALL BRANDS==========================================================
export const getAllBrands = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allBrands = await Brand.find();

    return res.status(200).json({
      success: true,
      message: `Bands fetched`,
      allBrands,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
