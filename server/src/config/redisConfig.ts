import { createClient } from "redis";

import dotenv from "dotenv";

dotenv.config();

// Create and export the client
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  password: process.env.REDIS_PASSWORD,
});

// Log connection events
redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redisClient.on("connect", () => {
  console.log(`✅ Redis connected port: ${process.env.REDIS_PORT}`);
});

export default redisClient;
