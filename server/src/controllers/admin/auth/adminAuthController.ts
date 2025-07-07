import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import admin from "../../../config/firebaseAdminConfig.js";
import {
  setAccessToken,
  setRefreshToken,
} from "../../../utils/auth/setCookie.js";

const db = new PrismaClient();

//<=================================================ADMIN LOGIN===================================================>
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { accessToken, refreshToken } = req.body;
    // console.log(idToken);

    const decodedToken = await admin.auth().verifyIdToken(accessToken);
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
        .status(400)
        .json({ success: false, error: "Verify your email!" });
    }

    const adminFound = await db.user.findUnique({
      where: { email: email },
    });

    if (adminFound?.role !== "ADMIN") {
      return res.status(400).json({
        success: false,
        error: "Unauthorized, wait for admin approval",
      });
    }

    await setRefreshToken(res, refreshToken);
    await setAccessToken(res, accessToken);

    return res
      .status(200)
      .json({ success: true, message: `Welcome ${name}`, admin: adminFound });
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
    // 1. Get the user's UID from the access token (ID token)
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);
    if (accessToken) {
      const decoded = await admin.auth().verifyIdToken(accessToken);
      const uid = decoded.uid;
      console.log(uid);

      // 2. Revoke the user's refresh tokens in Firebase
      await admin.auth().revokeRefreshTokens(uid); // This invalidates all refresh tokens for the user
    }

    // 3. Clear cookies
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    // Even if something fails, always clear cookies for security
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });
    //view error for dev environment
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to logout, try again later",
    });
  }
};
