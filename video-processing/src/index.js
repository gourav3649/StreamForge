import { processVideo } from "./utils/videoProcessor.js";
import { shutdownECSTask } from "./lib/ecs.js";
import { markVideoAsProcessed, redis } from "./lib/redis.js";
import { downloadFromS3 } from "./lib/s3.js";
import { config } from "./config/config.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import dotenv from "dotenv";
import { existsSync, mkdirSync, statSync } from "fs";
import db from "./lib/db.js";

dotenv.config({});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
  const bucketName = config.VIDEO_BUCKET;
  const inputKey = config.VIDEO_KEY;
  let videoId = config.VIDEO_ID;

  const isVideo = await db.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!isVideo) {
    throw new Error("Video Not Found");
  }

  videoId = isVideo.id;

  const resolutions = ["360", "480", "720"];

  const tmpFolderPath = path.join(__dirname, "../tmp");
  const inputFilePath = path.join(tmpFolderPath, "input.mp4");
  const outputDir = path.join(__dirname, "../tmp/output");

  const targetBucket = config.TARGET_BUCKET_NAME;

  if (!existsSync(tmpFolderPath)) {
    mkdirSync(tmpFolderPath, { recursive: true });
    console.log("Temporary folder created at:", tmpFolderPath);
  }

  let success = false;
  try {
    console.log(`[video-processing] Downloading from S3: bucket=${bucketName} key=${inputKey}`);
    await downloadFromS3(bucketName, inputKey, inputFilePath);
    
    const stats = fs.statSync(inputFilePath);
    console.log(`[video-processing] Downloaded file size: ${stats.size} bytes`);
    
    await processVideo(
      inputKey,
      inputFilePath,
      outputDir,
      targetBucket,
      resolutions
    );
    await markVideoAsProcessed(
      `video:${videoId}:status`,
      {
        status: "PROCESSED",
        userId: isVideo.userId,
        video: isVideo,
      },
      600
    );
    await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        status: "PROCESSED",
      },
    });

    console.log("All Processes Done ✅✅");
    success = true;
  } catch (error) {
    console.error("Error in main process:", error);
    await markVideoAsProcessed(
      `video:${videoId}:status`,
      {
        status: "FAILED",
        userId: isVideo.userId,
        video: isVideo,
      },
      600
    );
    await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        status: "FAILED",
      },
    });
  } finally {
    // Exit 0 = success, Exit 1 = failure (used by redis-server to track job result)
    process.exit(success ? 0 : 1);
  }
};

main();
