import { Request, Response } from "express";
import { User } from "../../../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmailVerificationOTP from "../../../utils/email/sendEmailVerificationOTP.js";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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

    const emailExists = await db.user.findUnique({
      where: { email: email },
    });

    if (emailExists) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exist" });
    }

    const phoneExists = await db.user.findUnique({
      where: { phone: phone },
    });
    if (phoneExists) {
      return res
        .status(409)
        .json({ success: false, error: "Phone number already exist" });
    }

    //generate salt and hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "ADMIN",
        createdAt: new Date(),
      },
    });

    const { error } = await sendEmailVerificationOTP(res, {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    if (error) {
      await db.user.delete({
        where: { id: newUser.id },
      });
      return res.status(error.statusCode).json({
        success: false,
        error: error.errorMessage,
      });
    }

    return res.status(201).json({
      success: true,
      message: `Verification link sent to ${email}`,
      user: {
        _id: newUser.id,
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
