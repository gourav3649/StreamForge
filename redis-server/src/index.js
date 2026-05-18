import { Worker } from "bullmq";
import { markVideoAsProcessing, redis } from "./lib/redis.js";
import { config } from "./config/config.js";
import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Wait = () => new Promise((res, rej) => setTimeout(() => res(), 5000));

const worker = new Worker(
  "VIDEO_QUEUE",
  async (job) => {
    try {
      const videoDetails = job.data.data;

      const currentData = await redis.get(`video:${videoDetails.id}:status`);

      if (currentData) {
        const data = JSON.parse(currentData);
        data.status = "PROCESSING";
        await markVideoAsProcessing(`video:${videoDetails.id}:status`, data);
        console.log("Status updated successfully.");
      } else {
        throw new Error("Video data not found in Redis.");
      }

      // Extract the S3 key from the video's originalUrl and decode %20 etc.
      // e.g. https://bucket.s3.region.amazonaws.com/_videos_output/timestamp_file.mp4
      //   → _videos_output/timestamp_file.mp4
      const originalUrl = videoDetails.originalUrl || "";
      const urlObj = new URL(originalUrl);
      const videoKey = decodeURIComponent(
        urlObj.pathname.startsWith("/") ? urlObj.pathname.slice(1) : urlObj.pathname
      );

      console.log(`[Worker] Resolved video key: ${videoKey}`);

      const scriptPath = path.resolve(__dirname, "../../video-processing/src/index.js");
      
      const childEnv = {
        ...process.env,
        REDIS_URL: config.REDIS_URL,
        AWS_ACCESS_KEY: config.AWS_ACCESS_KEY,
        AWS_SECRET_ACCESS_KEY: config.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: config.AWS_REGION,
        VIDEO_BUCKET: config.VIDEO_BUCKET,
        VIDEO_KEY: videoKey,           // ← actual key, not hardcoded
        TARGET_BUCKET_NAME: config.TARGET_BUCKET_NAME,
        TARGET_BUCKET_KEY: config.TARGET_BUCKET_KEY,
        DATABASE_URL: config.DATABASE_URL,
        VIDEO_ID: videoDetails.id,
      };

      console.log(`Starting local video processing for VIDEO_ID: ${videoDetails.id}`);

      await new Promise((resolve, reject) => {
        const child = fork(scriptPath, [], {
          env: childEnv,
          cwd: path.resolve(__dirname, "../../video-processing")
        });

        child.on("exit", (code) => {
          if (code === 0) {
            console.log(`Video processing completed successfully for VIDEO_ID: ${videoDetails.id}`);
            resolve();
          } else {
            const errorMsg = `Video processing failed with exit code ${code} for VIDEO_ID: ${videoDetails.id}`;
            console.error(errorMsg);
            reject(new Error(errorMsg));
          }
        });

        child.on("error", (err) => {
          console.error("Failed to start child process:", err);
          reject(err);
        });
      });
    } catch (error) {
      console.error("Error processing message:", error);
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL,
      tls: {
        rejectUnauthorized: false,
      },
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    },
  }
);

worker.on("ready", () => console.log("[Worker] BullMQ Worker ready, listening for jobs on VIDEO_QUEUE..."));
worker.on("completed", (job) => console.log(`[Worker] Job completed: ${job.id}`));
worker.on("failed", (job, err) => console.error(`[Worker] Job failed: ${job?.id}`, err.message));
worker.on("error", (err) => console.error("[Worker] Worker error:", err.message));
