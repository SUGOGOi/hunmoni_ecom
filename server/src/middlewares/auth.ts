import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/useModel.js";
import { JwtPayloadCustom } from "../types/types.js";

export const isTokenPresent = async (
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

    const user = await User.findById(decoded._id);

    return res.status(200).json({ success: true, isLogin: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

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

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
