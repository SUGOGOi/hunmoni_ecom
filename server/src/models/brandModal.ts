import mongoose, { Document, Schema } from "mongoose";
import { IBrand } from "../types/types.js";

const brandSchema = new Schema<IBrand>(
  {
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
    logo: {
      key: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Brand = mongoose.model<IBrand>("brand", brandSchema);
