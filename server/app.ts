import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import pool from "./src/config/db.js";
import * as UserQueries from "./src/queries/useQueries.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await UserQueries.getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default app;
