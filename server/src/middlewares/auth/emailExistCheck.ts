import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const db = new PrismaClient();

// when someone already register with email/password they should not allowed to login with another provider(google)====================implementing here
//if someone already reg with google(provider) account, they can not reg again with same google(email) for email/password =======================by default in firebase
export const emailExistCheck = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const emailFound = await db.user.findUnique({
      where: { email: email },
      select: {
        provider: true,
      },
    });

    if (emailFound?.provider === "password") {
      return res.status(400).json({
        success: false,
        error: "Email already in use",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email not found",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
