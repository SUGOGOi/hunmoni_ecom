// import { Request, Response } from "express";
// import { Category } from "../../../models/categoryModel.js";
// import mongoose from "mongoose";

// //<======================ADD CATEGORY=============================>
// export const addCategory = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const { name, description, level, parentId } = req.body;

//     if (!name || !description) {
//       return res.status(400).json({
//         success: false,
//         error: `Provide required fields`,
//       });
//     }

//     const catgoryExist = await Category.findOne({ name });

//     if (catgoryExist) {
//       return res.status(400).json({
//         success: false,
//         error: `Category already exist`,
//       });
//     }

//     if (level && level > 0) {
//       if (!mongoose.Types.ObjectId.isValid(parentId)) {
//         return res.status(400).json({
//           success: false,
//           error: `Invalid parent category ID format`,
//         });
//       }

//       const parentCategoryExist = await Category.findById(parentId);

//       if (parentCategoryExist) {
//         const newSubCategory = await Category.create({
//           name,
//           description,
//           isActive: true,
//           level,
//           parentId,
//         });

//         return res.status(201).json({
//           success: true,
//           message: `${newSubCategory.name} added!`,
//           newSubCategory,
//         });
//       }
//     } else {
//       const newCategory = await Category.create({
//         name,
//         description,
//         isActive: true,
//         level: 0,
//       });

//       return res.status(201).json({
//         success: true,
//         message: `${newCategory.name} added!`,
//         newCategory,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };

// // //<================================================GET ALL CATEGORY============================================>
// export const getAllCategory = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const Categories = await Category.find({ level: 0 });

//     if (Categories.length <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: `No category exist`,
//         Categories,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Categories fetched`,
//       Categories,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };

// //<======================ADD CATEGORY=============================>
// export const addSubCategory = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const { name, description, level, parentId } = req.body;

//     if (!name || !description || !level || !parentId) {
//       return res.status(400).json({
//         success: false,
//         error: `Provide required fields`,
//       });
//     }

//     const catgoryExist = await Category.findOne({ name });

//     if (catgoryExist) {
//       return res.status(400).json({
//         success: false,
//         error: `Category already exist`,
//       });
//     }

//     if (level <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: `Level can't be '0'`,
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(parentId)) {
//       return res.status(400).json({
//         success: false,
//         error: `Invalid parent category ID format`,
//       });
//     }

//     const parentCategoryExist = await Category.findById(parentId);

//     if (parentCategoryExist) {
//       const newSubCategory = await Category.create({
//         name,
//         description,
//         isActive: true,
//         level,
//         parentId,
//       });

//       return res.status(201).json({
//         success: true,
//         message: `${newSubCategory.name} added!`,
//         newSubCategory,
//       });
//     }

//     const newCategory = await Category.create({
//       name,
//       description,
//       isActive: true,
//       level: 0,
//     });

//     return res.status(201).json({
//       success: true,
//       message: `${newCategory.name} added!`,
//       newCategory,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };

// // //<==================================GET SUB CATEGORIES OF PARTICULAR CATEGORY===========================================
// export const getSubcatgories = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const { parentId } = req.body;
//     if (!parentId) {
//       return res.status(400).json({
//         success: false,
//         message: `Parent category Id is required`,
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(parentId)) {
//       return res.status(400).json({
//         success: false,
//         error: `Invalid ID format`,
//       });
//     }

//     const subCategories = await Category.find({ parentId });

//     if (subCategories.length <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: `No sub caregories, for this category`,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `sub categories fetched`,
//       subCategories,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };
