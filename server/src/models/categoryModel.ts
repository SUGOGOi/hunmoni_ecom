import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "../types/types.js";

const categorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<ICategory>("category", categorySchema);
