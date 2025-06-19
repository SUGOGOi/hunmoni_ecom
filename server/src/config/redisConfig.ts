import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

// Redis configuration options
const redisConfig = {
  url: process.env.REDIS_URL || "redis://localhost:6379",
  password: process.env.REDIS_PASSWORD || undefined,
  socket: {
    reconnectStrategy: (retries: number) => {
      if (retries > 10) {
        console.error("Redis: Max retries exceeded");
        return new Error("Max retries exceeded");
      }
      return Math.min(retries * 100, 3000);
    },
  },
};

// Connect to Redis
export const connectRedis = async (): Promise<RedisClientType | null> => {
  try {
    if (redisClient && redisClient.isOpen) {
      return redisClient;
    }

    redisClient = createClient(redisConfig);

    // Event handlers
    redisClient.on("error", (err) => {
      console.error("Redis Error:", err);
    });

    redisClient.on("connect", () => {
      console.log("✅ Redis connected successfully");
    });

    redisClient.on("reconnecting", () => {
      console.log("🔄 Redis reconnecting...");
    });

    redisClient.on("end", () => {
      console.log("❌ Redis connection closed");
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    return null;
  }
};

// Get Redis client instance
export const getRedisClient = (): RedisClientType | null => {
  return redisClient;
};

// Disconnect Redis
export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient && redisClient.isOpen) {
      await redisClient.disconnect();
      redisClient = null;
      console.log("Redis disconnected");
    }
  } catch (error) {
    console.error("Error disconnecting Redis:", error);
  }
};

// Health check
export const isRedisConnected = (): boolean => {
  return redisClient?.isOpen || false;
};
