import { Request, Response } from "express";
import admin from "../../../config/firebaseAdminConfig.js";
import sendEmailVerification from "../../../utils/email/sendEmailVerification.js";
import { db } from "../../../config/dbConfig.js";

//<===========================================REG ADMIN=======================================================>
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { idToken, name } = req.body;
    const fullUrl = req.protocol + "://" + req.get("host");

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
        role: "ADMIN",
      },
      create: {
        firebaseUid: uid,
        email: email!,
        name: userName,
        photoUrl: picture,
        isEmailVerified: email_verified,
        provider: provider,
        role: "ADMIN",
      },
    });

    const verificationLink = await admin
      .auth()
      //@ts-ignore
      .generateEmailVerificationLink(email, {
        url: `${fullUrl}/account/verify-email`,
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

// export const handleEmailVerification = async (req: Request, res: Response) => {

//  const
//   res.redirect("https://yourfrontend.com/login?verified=true");
// };
