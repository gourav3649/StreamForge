import Redis from "ioredis";
import { config } from "../config/config.js";

// Upstash requires TLS (rediss://) — must pass tls options explicitly
export const redis = new Redis(config.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
});

redis.on("connect", () => console.log("[Redis] Connected to Upstash"));
redis.on("error", (err) => console.error("[Redis] Connection error:", err.message));

export const markVideoAsProcessing = async (
  key,
  value,
  expireTimeInSeconds
) => {
  if (expireTimeInSeconds) {
    await redis.set(key, JSON.stringify(value), "EX", expireTimeInSeconds);
  } else {
    await redis.set(key, JSON.stringify(value));
  }
};
