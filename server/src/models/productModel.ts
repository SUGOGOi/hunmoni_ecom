import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/types.js";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "brand",
  },
  primaryCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
});

export const Product = mongoose.model<IProduct>("product", productSchema);
