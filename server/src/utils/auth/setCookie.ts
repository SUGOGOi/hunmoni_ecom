import { CookieOptions, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: false, // client needs to read this for API calls
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 1000, // 1 hour
  path: "/",
};

const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/", // or restrict as needed
};

export const setAccessToken = async (
  res: Response,
  accessToken: string
): Promise<any> => {
  await res.cookie("accessToken", accessToken, accessTokenCookieOptions);
};

export const setRefreshToken = async (
  res: Response,
  refreshToken: string
): Promise<any> => {
  await res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
};
