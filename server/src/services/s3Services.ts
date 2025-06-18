import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { s3Client } from "../config/awsS3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Upload File to S3
export const uploadFileToS3 = async (
  file: Express.Multer.File,
  folder: string
) => {
  try {
    const key = `${folder}/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const response: PutObjectCommandOutput = await s3Client.send(
      new PutObjectCommand(params)
    );

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("File upload to S3 failed");
    }

    const publicUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

    return {
      key,
      etag: response.ETag,
      statusCode: response.$metadata.httpStatusCode,
      publicUrl,
    };
  } catch (error: any) {
    console.error("S3 Upload Error:", error);
    throw new Error(
      error.message || "Something went wrong while uploading to S3"
    );
  }
};

// Delete File from S3
export const deleteFileFromS3 = async (key: string) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    };

    const response = await s3Client.send(new DeleteObjectCommand(params));

    if (
      response.$metadata.httpStatusCode !== 204 &&
      response.$metadata.httpStatusCode !== 200
    ) {
      throw new Error("Failed to delete file from S3");
    }

    return {
      message: "File deleted successfully",
      statusCode: response.$metadata.httpStatusCode,
    };
  } catch (error: any) {
    console.error("S3 Delete Error:", error);
    throw new Error(
      error.message || "Something went wrong while deleting from S3"
    );
  }
};

// Generate Pre-signed URL from S3
export const getFileUrlFromS3 = async (key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hr expiry

    return url;
  } catch (error: any) {
    console.error("S3 Get URL Error:", error);
    throw new Error(error.message || "Failed to generate signed URL from S3");
  }
};

// Update File in S3 (delete old, upload new)
export const updateFileInS3 = async (
  oldKey: string,
  newFile: Express.Multer.File,
  folder: string
) => {
  try {
    const deleteResponse = await deleteFileFromS3(oldKey);

    if (
      deleteResponse.statusCode !== 204 &&
      deleteResponse.statusCode !== 200
    ) {
      throw new Error("Failed to delete old file during update");
    }

    const uploadResponse = await uploadFileToS3(newFile, folder);

    return {
      message: "File updated successfully",
      oldKey,
      newKey: uploadResponse.key,
      newPublicUrl: uploadResponse.publicUrl,
      statusCode: uploadResponse.statusCode,
    };
  } catch (error: any) {
    console.error("S3 Update Error:", error);
    throw new Error(error.message || "Failed to update file on S3");
  }
};
