import jwt from "jsonwebtoken";
import mongoose, { Document } from "mongoose";

// FOR USER MODEL
export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  role?: UserRole;
  googoleId?: string;
  githubId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOtp extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  otp: string;
  createdAt: Date;
}

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export interface UserTypeInEmail {
  email: string;
  _id: string | any;
  name: string;
}

export interface JwtPayloadCustom extends jwt.JwtPayload {
  _id: string;
  email: string;
}

// types/express.d.ts
import { Request } from "express";

interface User {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  role?: UserRole;
  googoleId?: string;
  githubId?: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

//==========================================CATEGORY MODEL=======================
export interface ICategory {
  _id: mongoose.Schema.Types.ObjectId;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

//==========================================BRAND MODEL=======================
export interface IBrand extends Document {
  brandName: string;
  logoUrl?: string;
  description?: string;
  country?: string;
  foundedYear?: number;
  website?: string;
  status?: "active" | "inactive";
}

//<===================================PRODUCT MODEL=============================
export interface IProduct extends Document {
  productName: string;
}
