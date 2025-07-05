import jwt from "jsonwebtoken";

export interface GoogleStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope?: string[];
}

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface GoogleProfile {
  id: string;
  emails: Array<{ value: string; verified: boolean }>;
  displayName: string;
  photos: Array<{ value: string }>;
}

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string | null;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  role: UserRole;
  provider?: string;
  googleId?: string | null;
  githubId?: string | null;
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

//<==================================================BANNED IP MODEL=========================
export interface IBannedIP extends Document {
  ip: string;
  bannedUntil: Date;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface S3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}
