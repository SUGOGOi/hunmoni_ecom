import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.message === "Only image files are allowed!") {
    res.status(400).json({ success: false, message: err.message });
    return;
  }

  res.status(500).json({ success: false, message: err.message });
};
