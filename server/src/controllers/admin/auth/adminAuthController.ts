import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import admin from "../../../config/firebaseAdminConfig.js";
import {
  setAccessToken,
  setCookies,
  setRefreshToken,
} from "../../../utils/auth/setCookie.js";

const db = new PrismaClient();

//<=================================================ADMIN LOGIN===================================================>
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { idToken, refreshToken } = req.body;
    // console.log(idToken);

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture, email_verified, firebase } =
      decodedToken;
    const provider = firebase.sign_in_provider;
    await db.user.upsert({
      where: { firebaseUid: uid },
      update: {
        email,
        name,
        photoUrl: picture,
        isEmailVerified: email_verified,
      },
      create: {
        firebaseUid: uid,
        email: email!,
        name: name,
        photoUrl: picture,
        isEmailVerified: email_verified,
        provider: provider,
      },
    });

    if (!email_verified) {
      return res
        .status(404)
        .json({ success: false, error: "Verify your email!" });
    }

    await setRefreshToken(res, refreshToken);
    await setAccessToken(res, accessToken);

    return res.status(200).json({ success: true, error: `Welcome ${name}` });
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
