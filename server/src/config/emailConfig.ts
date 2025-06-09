import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, //true for 465, false for other ports
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
} as nodemailer.TransportOptions;

let transporter = nodemailer.createTransport(smtpOptions);

export default transporter;
