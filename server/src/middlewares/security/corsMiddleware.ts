import cors, { CorsOptions } from "cors";
import { Request } from "express";

// define allowed origin based on environment
const getAllowedOrigins = (): string[] => {
  if (process.env.NODE_ENV === "dev") {
    return [...(process.env.ALLOWED_OROGINS_DEV?.split(",") || [])];
  }

  if (process.env.NODE_ENV === "production") {
    return [...(process.env.ALLOWED_OROGINS_PRODUCTION?.split(",") || [])];
  }

  return [];
};

const originChecker = (
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void
) => {
  const allowOrigins = getAllowedOrigins();

  if (!origin) {
    return callback(null, true);
  }

  if (allowOrigins.includes(origin)) {
    callback(null, true);
  } else {
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error("Not allowed by CORS"), false);
  }
};

const corsOptions: CorsOptions = {
  origin: originChecker,
  methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
    "X-Access-Token",
    "X-Admin-Token",
    "X-User-Agent",
    "X-Forwarded-For",
  ],
  exposedHeaders: [
    "X-Total-Count",
    "X-Page-Count",
    "X-Current-Page",
    "X-Rate-Limit-Remaining",
    "X-Rate-Limit-Reset",
  ],
  credentials: true,
  maxAge: 86400,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
