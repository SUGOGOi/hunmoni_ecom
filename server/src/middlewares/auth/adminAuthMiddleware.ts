import { NextFunction, Request, Response } from "express";
import { JwtPayloadCustom } from "../../types/types.js";
import jwt from "jsonwebtoken";
import { User } from "../../models/userModel.js";

export const isLoginCheck = async (
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

    const user = await User.findById(decoded._id).select("_id");
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: `Invalid token`,
      });
    }

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
