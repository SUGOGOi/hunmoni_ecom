import mongoose, { Document, Schema } from "mongoose";
import { IBrand } from "../types/types.js";

const brandSchema = new Schema<IBrand>(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    // logoUrl: {
    //   type: String,
    //   required: false,
    // },
    description: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    foundedYear: {
      type: Number,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Brand = mongoose.model<IBrand>("brand", brandSchema);
