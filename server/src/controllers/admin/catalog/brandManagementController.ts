// import { Request, Response } from "express";
// import { Brand } from "../../../models/brandModal.js";
// import { uploadFileToS3 } from "../../../services/s3Services.js";
// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// //<==================================================ADD BRAND==================================================>
// export const addBrand = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { name, description } = req.body;

//     const file = req.file;

//     if (!name || !description || !file) {
//       return res.status(400).json({
//         success: false,
//         message: `All fields are required`,
//       });
//     }

//     // Clean brandName and website
//     const finalBrandName = name?.trim().toLowerCase();

//     const brandExist = await Brand.findOne({ name });

//     // console.log(brandExist);

//     if (brandExist) {
//       return res.status(400).json({
//         success: false,
//         error: `Brand already exist`,
//       });
//     }

//     const uploadResult = await uploadFileToS3(file, "brands");

//     const newBrand = await Brand.create({
//       name: finalBrandName,
//       description,
//       isActive: true,
//       logo: {
//         key: uploadResult.key,
//         url: uploadResult.publicUrl,
//       },
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
