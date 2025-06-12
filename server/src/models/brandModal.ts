import mongoose, { Document, mongo, Schema } from "mongoose";
import { IBrand } from "../types/types.js";
import { timeStamp } from "console";

const brandSchema = new Schema<IBrand>(
  {
    brandName: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },
  { timestamps: true }
);
