import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { setAccessToken } from "../../utils/auth/setCookie.js";
import dotenv from "dotenv";
import admin from "../../config/firebaseAdminConfig.js";
import { getAccessToken } from "../../utils/auth/getAccessToken.js";
import { UserRole } from "../../types/types.js";

dotenv.config();

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

    const data = await response.data;

    if (!data.id_token) {
      return res.status(400).json({
        success: false,
        error: `Invalid refresh token`,
      });
    }

    // Now decode id_token to get user info (email)
    const decodedToken = await admin.auth().verifyIdToken(data.id_token);
    const email = decodedToken.email;

    const userFound = await db.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      return res.status(500).json({
        success: false,
        error: `Internal server error`,
      });
    }

    await setAccessToken(res, data.id_token);

    return res
      .status(200)
      .json({ success: true, isLogin: true, user: userFound });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<=============================================LOGIN CHECK WITH GET USER ================================================>
export const isLoginForwardUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    // console.log(token);

    let accessTokenGot: any;
    if (!accessToken && !refreshToken) {
      return res
        .status(400)
        .json({ success: false, error: `Please login first` });
    } else if (refreshToken && !accessToken) {
      accessTokenGot = await getAccessToken(refreshToken);
    }

    console.log(accessToken);

    // Now decode accessTokenGot to get user info (email)
    let decodedToken;
    if (accessToken) {
      decodedToken = await admin.auth().verifyIdToken(accessToken);
    } else {
      decodedToken = await admin.auth().verifyIdToken(accessTokenGot);
    }
    const email = decodedToken.email;

    const userFound = await db.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      console.log("user not found");
      return res.status(500).json({
        success: false,
        error: `Internal server error`,
      });
    }

    // console.log(userFound);

    req.user = {
      ...userFound,
      role: userFound.role as UserRole,
    };

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
