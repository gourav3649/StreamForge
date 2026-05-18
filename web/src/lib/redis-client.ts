import { Redis } from "ioredis";
import { Queue } from "bullmq";

// Upstash uses rediss:// (TLS). ioredis needs tls options explicitly set.
const redisClient = new Redis(process.env.REDIS_URL as string, {
  tls: {
    rejectUnauthorized: false,
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
});

export default redisClient;

export const VideoQueue = new Queue("VIDEO_QUEUE", {
  connection: {
    url: process.env.REDIS_URL,
    tls: {
      rejectUnauthorized: false,
    },
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnFail: {
      count: 100,
    },
  },
});
