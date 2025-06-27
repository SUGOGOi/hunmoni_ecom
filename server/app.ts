import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { routes } from "./src/routes/index.js";
import { corsMiddleware } from "./src/middlewares/security/corsMiddleware.js";
import { helmetMiddleware } from "./src/middlewares/security/helmetMiddleware.js";
import { errorHandler } from "./src/middlewares/security/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(helmetMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(corsMiddleware);
app.use(errorHandler);

//<===================================API CHECK=====================================>
app.get("/", async (req: Request, res: Response): Promise<any> => {
  res.json({ success: true, message: `API working` });
});

//use routes
app.use("/api", routes);

export default app;
