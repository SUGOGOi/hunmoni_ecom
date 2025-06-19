import app from "./app.js";
import { connectDB } from "./src/config/dbConfig.js";
import { connectRedis, getRedisClient } from "./src/config/redisConfig.js";

const initalizeServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initalizeServer();
