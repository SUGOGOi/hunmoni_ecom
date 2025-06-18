import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/types.js";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: false,
      unique: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
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

    level: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<ICategory>("category", categorySchema);
