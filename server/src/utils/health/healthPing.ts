// src/utils/healthPing.ts
import axios from "axios";

/**
 * Pings the given URL every `intervalMs` milliseconds
 */
export const startHealthPing = (url: string, intervalMs: number = 60000) => {
  console.log(
    `[HealthPing] Will ping ${url} every ${intervalMs / 1000} seconds`
  );

  setInterval(async () => {
    try {
      const res = await axios.get(url);
      console.log(`[${new Date().toISOString()}] Health check:`, res.data);
    } catch (err: any) {
      console.error(`[HealthPing] Failed to ping ${url}:`, err.message);
    }
  }, intervalMs);
};
