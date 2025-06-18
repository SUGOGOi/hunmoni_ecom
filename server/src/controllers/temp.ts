// import { Request, Response } from "express";
// import { Category } from "../models/categoryModel.js";
// import { Brand } from "../models/brandModal.js";
// import mongoose from "mongoose";

// //<===================================================GET ALL BRANDS==========================================================
// export const getAllBrands = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const allBrands = await Brand.find();

//     return res.status(200).json({
//       success: true,
//       message: `Bands fetched`,
//       allBrands,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };
