import { Request, Response } from "express";
import { uploadFileToS3 } from "../../../services/s3Services.js";
import { db } from "../../../config/dbConfig.js";
import redisClient from "../../../config/redisConfig.js";

//<==================================================ADD BRAND==================================================>
export const addBrand = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, status } = req.body;

    const file = req.file;

    if (!name || !description || !status || !file) {
      return res.status(400).json({
        success: false,
        message: `All fields are required`,
      });
    }

    // Clean brandName and description
    const finalBrandName = name?.trim().toLowerCase();
    const finalBrandDescription = name?.trim().toLowerCase();

    const brandExist = await db.brand.findUnique({
      where: { name },
    });

    // console.log(brandExist);

    if (brandExist) {
      return res.status(400).json({
        success: false,
        error: `Brand already exist`,
      });
    }

    const uploadResult = await uploadFileToS3(file, "brands");

    const newBrand = await db.brand.create({
      data: {
        name: finalBrandName,
        description: finalBrandDescription,
        logoKey: uploadResult.key,
        logoUrl: uploadResult.publicUrl,
        status: status,
      },
    });

    await redisClient.del("brand:all");

    return res.status(201).json({
      success: true,
      message: `${newBrand.name} added`,
      newBrand,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getBrands = async (req: Request, res: Response): Promise<any> => {
  try {
    const cacheKey = "brands:all";
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        message: `Brands fetched`,
        brands: JSON.parse(cached),
      });
    }

    const brands = await db.brand.findMany();
    await redisClient.setEx(cacheKey, 86400, JSON.stringify(brands)); // 1 day

    return res.status(200).json({
      success: true,
      message: `Brands fetched`,
      brands,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const updateBrand = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const updatedBrand = await db.brand.update({
      where: { id },
      data: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
