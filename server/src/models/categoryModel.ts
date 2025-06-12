import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "../types/types.js";

const categorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: true,
    },
    parentCategoryId: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<ICategory>("category", categorySchema);
