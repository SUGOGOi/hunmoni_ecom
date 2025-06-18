import mongoose, { Schema } from "mongoose";
import { IBannedIP } from "../types/types.js";

const bannedIPSchema = new Schema<IBannedIP>(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    bannedUntil: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const BannedIP = mongoose.model<IBannedIP>("bannedIP", bannedIPSchema);
