import { NextFunction, Request, Response } from "express";
import { JwtPayloadCustom, UserRole } from "../../types/types.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { setAccessToken } from "../../utils/auth/setCookie.js";

const db = new PrismaClient();

export const isLoginCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { refreshToken } = req.cookies;
    // console.log(token);

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, error: "Please login first" });
    }

    const apiKey = process.env.FIREBASE_API_KEY;

    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.data.json();
    console.log(data);
    if (!data.id_token) {
      return res.status(400).json({
        success: false,
        error: `Invalid refresh token`,
      });
    }

    // const user = await User.findById(decoded._id).select("_id");  <=============================mongodb

    await setAccessToken(res, data.id_token);

    return res.status(200).json({ success: true, isLogin: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<=============================================LOGIN CHECK WITH GET USER ================================================>
export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Please login first" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayloadCustom;

    // const user = await User.findById(decoded._id);

    const user = await db.user.findUnique({
      where: { id: decoded._id },
    });

    if (!user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    req.user = {
      ...user,
      role: user.role as UserRole,
    };

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
