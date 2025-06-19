import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { S3Config } from "../types/types.js";

dotenv.config();

const s3Config: S3Config = {
  region: process.env.AWS_S3_REGION!,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY!,
  bucketName: process.env.AWS_S3_BUCKET!,
};

const s3Client = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
});

export { s3Client, s3Config };
