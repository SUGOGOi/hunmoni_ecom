import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { routes } from "./src/routes/index.js";
import { corsMiddleware } from "./src/middlewares/security/corsMiddleware.js";
import { helmetMiddleware } from "./src/middlewares/security/helmetMiddleware.js";
import { errorHandler } from "./src/middlewares/security/errorMiddleware.js";
import { getRedisClient } from "./src/config/redisConfig.js";

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

//<=================================================REDIS TEST===================================>
app.get("/api/redis/health", async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const redisStatus = redisClient?.isOpen ? "connected" : "disconnected";

    res.json({
      success: true,
      redis: redisStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Redis operation failed" });
  }
});

app.get(
  "/api/redis/cache-test",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const redisClient = getRedisClient();

      if (!redisClient) {
        return res.status(500).json({ error: "Redis not available" });
      }

      // Set a test value
      await redisClient.set("test-key", "Hello Redis!", { EX: 60 });

      // Get the value
      const value = await redisClient.get("test-key");

      res.json({ success: true, message: value });
    } catch (error) {
      res.status(500).json({ success: false, error: "Redis operation failed" });
    }
  }
);

//use routes
app.use("/api", routes);

export default app;
