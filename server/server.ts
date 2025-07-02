import app from "./app.js";
import { connectDB } from "./src/config/dbConfig.js";
import redisClient from "./src/config/redisConfig.js";
import { startHealthPing } from "./src/utils/health/healthPing.js";

const initalizeServer = async () => {
  const BASE_URL = `http://localhost:${process.env.PORT}/`;
  try {
    // await connectDB();
    await redisClient.connect();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      // startHealthPing(`${BASE_URL}/`, 60_000); // Every 60 seconds
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initalizeServer();
