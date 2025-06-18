import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const sendToken = async (
  res: Response,
  admin: { _id: mongoose.Schema.Types.ObjectId; name: string }
): Promise<any> => {
  try {
    const token = jwt.sign({ _id: admin!._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
        | "none"
        | "lax",
    };

    return res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: `Welcome back ${admin.name}`,
      });
  } catch (error) {
    console.log(error);
  }
};
