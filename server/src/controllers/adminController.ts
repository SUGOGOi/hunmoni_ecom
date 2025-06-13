import { Request, Response } from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";
import { sendToken } from "../utils/sendToken.js";

//<===========================================REG ADMIN=======================================================>
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, phone, password, confirm_password } = req.body;

    // console.log(name, email, phone, password, confirm_password);

    if (!name || !email || !phone || !password || !confirm_password) {
      return res.status(400).json({
        success: true,
        error: "Enter all fields",
      });
    }

    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ success: false, error: "Password not matched" });
    }

    let existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exist" });
    }

    existUser = await User.findOne({ phone });
    if (existUser) {
      return res
        .status(409)
        .json({ success: false, error: "Phone number already exist" });
    }

    //generate salt and hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const { error } = await sendEmailVerificationOTP(res, {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    if (error) {
      await newUser.deleteOne();
      return res.status(error.statusCode).json({
        success: false,
        error: error.errorMessage,
      });
    }

    return res.status(201).json({
      success: true,
      message: `Verification link sent to ${email}`,
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<=================================================ADMIN LOGIN===================================================>
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

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

//<========================================================================GET ADMIN PROFILE INFO======================================================>
export const getAdminProfileDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req.user;
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "user not provided",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Admin data fetched!`,
      admin: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to fetch profile data, try again later",
    });
  }
};

export const editAdminInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, phone } = req.body;
    const user = req.user;
    const editUser = await User.findById(user!._id);

    if (!editUser) {
      console.log("No edit user found");
      return res.status(500).json({
        success: false,
        error: "Unable to edit now, try again later",
      });
    }

    if (!name && !phone) {
      return res.status(400).json({
        success: false,
        error: "Atleast provide one field",
      });
    }

    if (name && editUser!.name !== name) {
      editUser.name = name;
    }

    if (phone && editUser.phone !== phone) {
      const isValidPhone = /^\d{10}$/.test(phone);

      if (!isValidPhone) {
        return res.status(400).json({
          success: false,
          error:
            "Phone number must be exactly 10 digits and contain only numbers.",
        });
      }
      editUser.phone = phone;
    }

    await editUser.save();

    return res.status(200).json({
      success: true,
      message: "Updated",
      admin: editUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to edit now, try again later",
    });
  }
};
