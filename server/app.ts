import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

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
    origin: [
      `${process.env.FRONTEND_URL_ONE}`,
      `${process.env.FRONTEND_URL_TWO}`,
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.get("/", async (req: Request, res: Response): Promise<any> => {
  res.json({ success: true, message: `API working` });
});

//import routes
import adminRoutes from "./src/routes/adminRoute.js";
import categoryAndBrandRoutes from "./src/routes/categoryAndBrandRoute.js";

//use routes
app.use("/api/admin", adminRoutes);
app.use("/api/category-brand", categoryAndBrandRoutes);

export default app;
