import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

// Define fields for multiple uploads
export const uploadBrandLogo = multer({ storage: storage }).fields([
  { name: "file", maxCount: 1 }, // For single file
]);

export const uploadProductImages = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5mb
  fileFilter: (req: Request, file, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // accept the file
    } else {
      const error = new Error("Only image files are allowed!");
      cb(error);
    }
  },
}).fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
  { name: "file3", maxCount: 1 },
  { name: "file4", maxCount: 1 },
  { name: "file5", maxCount: 1 },
  { name: "file6", maxCount: 1 },
]);
