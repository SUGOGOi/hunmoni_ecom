// import { Request, Response } from "express";
// import { Brand } from "../../../models/brandModal.js";

// //<==================================================ADD BRAND==================================================>
// export const addBrand = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { name, description } = req.body;

//     const { file } = req.files;

//     if (!name || !description || !file) {
//       return res.status(400).json({
//         success: false,
//         message: `All fields are required`,
//       });
//     }

//     // Clean brandName and website
//     const finalBrandName = brandName?.trim().toLowerCase();
//     const finalWebsite = website?.trim().toLowerCase();

//     const brandExist = await Brand.findOne({
//       brandName: finalBrandName,
//     });

//     // console.log(brandExist);

//     if (brandExist) {
//       return res.status(400).json({
//         success: false,
//         error: `Brand already exist`,
//       });
//     }

//     const websiteExist = await Brand.findOne({
//       website: finalWebsite,
//     });

//     if (websiteExist) {
//       return res.status(400).json({
//         success: false,
//         error: `website already exist`,
//       });
//     }

//     const newBrand = await Brand.create({
//       brandName: finalBrandName,
//       description,
//       country,
//       foundedYear,
//       website: finalWebsite,
//       status,
//     });

//     return res.status(201).json({
//       success: true,
//       message: `${newBrand.name} added`,
//       newBrand,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// };
