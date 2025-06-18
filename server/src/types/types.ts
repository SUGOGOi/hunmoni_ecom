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
  name: string;
  parentId: mongoose.Schema.Types.ObjectId;
  description: string;
  isActive: boolean;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

//==========================================BRAND MODEL=======================
export interface IBrand extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  isActive: boolean;
  logoUrl: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

//<===================================PRODUCT MODEL=============================
export interface IProduct extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: string;
  brandId: mongoose.Schema.Types.ObjectId;
  primaryCategoryId: mongoose.Schema.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//<==================================================BANNED IP MODEL=========================
export interface IBannedIP extends Document {
  ip: string;
  bannedUntil: Date;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}
