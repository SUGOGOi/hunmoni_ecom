import { Request, Response } from "express";
import admin from "../../../config/firebaseAdminConfig.js";
import sendEmailVerification from "../../../utils/email/sendEmailVerification.js";
import { db } from "../../../config/dbConfig.js";
import dotenv from "dotenv";

dotenv.config();

//<===========================================REG ADMIN=======================================================>
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { idToken, name } = req.body;

    console.log(idToken, name);

    if (!name || !idToken) {
      return res.status(400).json({
        success: true,
        error: "Require all fields",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, picture, email_verified, firebase } = decodedToken;

    const emailExists = await db.user.findUnique({
      where: { email: email },
    });
    if (emailExists) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exist" });
    }

    // const phoneExists = await db.user.findUnique({
    //   where: { phone: phone },
    // });
    // if (phoneExists) {
    //   return res
    //     .status(409)
    //     .json({ success: false, error: "Phone number already exist" });
    // }

    const provider = firebase.sign_in_provider;
    const userName = name || decodedToken.name || null;

    await db.user.upsert({
      where: { firebaseUid: uid },
      update: {
        email,
        name: userName,
        photoUrl: picture,
        isEmailVerified: email_verified,
      },
      create: {
        firebaseUid: uid,
        email: email!,
        name: userName,
        photoUrl: picture,
        isEmailVerified: email_verified,
        provider: provider,
      },
    });

    const verificationLink = await admin
      .auth()
      //@ts-ignore
      .generateEmailVerificationLink(email, {
        url: `${process.env.ADMIN_ORIGIN_DEV}/`,
      });

    await sendEmailVerification(email, userName, verificationLink);
    return res.status(201).json({
      success: true,
      message: `Verification link sent to ${email}`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
