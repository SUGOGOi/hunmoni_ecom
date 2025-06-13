import mongoose, { Document, Schema } from "mongoose";
import { ISubCategoryBrand } from "../types/types.js";

const subCategoryBrandSchema = new Schema<ISubCategoryBrand>(
  {
    subCategoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
      required: true,
    },
  },
  { timestamps: true }
);

export const SubCategoryBrand = mongoose.model<ISubCategoryBrand>(
  "subCategoryBrand",
  subCategoryBrandSchema
);
