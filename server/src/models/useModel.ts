import mongoose, { Document, Schema } from "mongoose";
import { IUser, UserRole } from "../types/types.js";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // for social auth users
    },
    role: {
      type: String,
      enum: Object.values(UserRole), // Allow only enum values
      default: UserRole.CUSTOMER, // Set a default role
    },
    is_email_verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    is_phone_verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    googoleId: {
      type: String,
      required: false,
    },
    githubId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("user", UserSchema);
