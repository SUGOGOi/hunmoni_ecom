import { Request, Response } from "express";
import { User } from "../../../models/userModel.js";
import bcrypt from "bcrypt";
import { sendToken } from "../../../utils/auth/sendToken.js";

//<=================================================ADMIN LOGIN===================================================>
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    console.log(req.ip);

    console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const userFound = await User.findOne({ email: email }).select("+password");
    // console.log()

    if (!userFound) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid email or password" });
    }

    if (!userFound.is_email_verified) {
      return res
        .status(401)
        .json({ success: false, error: "Your acoount is not verified" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }

    sendToken(res, { _id: userFound._id, name: userFound.name });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<==========================================================ADMIN  LOGOUT==========================================================>
export const adminLogout = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Use the same options as when setting the cookie
    const options = {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
        | "none"
        | "lax",
    };

    res.clearCookie("token", options);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to logout, try again later",
    });
  }
};
