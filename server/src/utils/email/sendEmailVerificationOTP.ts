import { Response } from "express";
// import { UserTypeInEmail } from "../types/types.js";
// import { Otp } from "../models/otpModel.js";
import transporter from "../../config/emailConfig.js";
import { UserTypeInEmail } from "../../types/types.js";
import { Otp } from "../../models/otpModel.js";

const sendEmailVerificationOTP = async (
  res: Response,
  user: UserTypeInEmail
): Promise<any> => {
  try {
    //generate 4 digit no
    const otp = Math.floor(1000 + Math.random() * 9000);

    //otp verification link
    // const otpVrificationLink = `${process.env.FRONTEND_URL}/account/verify-email`;
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Verify Your Account",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #d87f37;
            color: white;
            text-align: center;
            padding: 20px 10px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
            font-size: 16px;
        }
        .email-body h2 {
            margin: 0 0 10px;
            font-size: 20px;
            color: #d87f37;
        }
        .otp-code {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #f9f9f9;
            border: 1px dashed #d87f37;
            border-radius: 5px;
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            text-align: center;
        }
        .email-footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            background-color: #f4f4f4;
            color: #666666;
        }
        .email-footer a {
            color: #d87f37;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1> Verify Your Account</h1>
        </div>
        <div class="email-body">
            <h2>Hi ${user.name},</h2>
            <p>Thank you for signing up! To complete your registration, please verify your account using the OTP below:</p>
            <div class="otp-code"> ${otp} </div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you didn’t create this account, you can safely ignore this email. </p>
            <p>Thank you,<br>The E-Shop Team 💼</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2025 [Your Company Name]. All rights reserved. </p>
            <p><a target="_blank" href="${process.env.FRONTEND_URL}/contact" >📞 Contact Support</a> | <a target="_blank" href="${process.env.FRONTEND_URL}/privacy-policy">🔒 Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`,
    });

    const findOTP = await Otp.findOne({ userId: user._id });

    if (!findOTP) {
      //save new otp
      await Otp.create({
        userId: user._id,
        otp,
      });
    } else {
      findOTP.otp = otp.toString();
      findOTP.createdAt = new Date();
      await findOTP.save();
    }

    return otp;
  } catch (error) {
    console.log(error);
    return {
      error: {
        statusCode: 500,
        errorMessage: "Error sending emails, Try again later",
      },
    };
  }
};

export default sendEmailVerificationOTP;
