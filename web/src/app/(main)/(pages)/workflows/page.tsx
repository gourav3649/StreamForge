"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createVideo } from "@/actions/video-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Upload,
  RefreshCw,
  Play,
  Pause,
  Video,
} from "lucide-react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isDropping, setIsDropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;

    try {
      // 0. Validate file size
      if (file.size === 0) {
        throw new Error("File is empty. Please select a valid video file.");
      }

      // 1. Get Presigned URL from Next.js API
      const presignRes = await fetch("/api/video/presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, fileType: file.type }),
      });

      if (!presignRes.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl, publicUrl } = await presignRes.json();

      // 2. Upload file directly to S3 using axios
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      const s3Url = publicUrl;

      await createVideo({
        title: file.name,
        originalUrl: s3Url,
      });

      toast.success("Video uploaded and queued for processing");
      getAllVideos();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
      setFile(null);
    }

  };

  const getAllVideos = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const res = await fetch("/api/video/redis-video");
      const json = await res.json();
      setVideos(json?.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const startPolling = () => {
    if (intervalId) return;
    const id = setInterval(() => getAllVideos(true), 3000);
    setIntervalId(id);
  };

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  // Auto-start polling if there are pending videos
  useEffect(() => {
    const hasPending = videos?.some(
      (v: any) => v.status === "QUEUE" || v.status === "PROCESSING"
    );

    if (hasPending && !intervalId) {
      startPolling();
    } else if (!hasPending && intervalId) {
      stopPolling();
    }
  }, [videos, intervalId]);

  const statusColor = (status: string) => {
    switch (status) {
      case "QUEUE":
        return "text-amber-400 bg-amber-400/10";
      case "PROCESSING":
        return "text-blue-400 bg-blue-400/10";
      case "PROCESSED":
        return "text-emerald-400 bg-emerald-400/10";
      default:
        return "text-red-400 bg-red-400/10";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-white/[0.06] bg-background/50 p-6 text-4xl font-bold backdrop-blur-lg">
        Video Transcoding
      </h1>

      <div className="max-w-5xl mx-auto w-full px-6 py-6 space-y-8">
        {/* Upload Area */}
        <div>
          <label htmlFor="video" className="cursor-pointer block">
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-3 py-14 px-8 rounded-xl border border-dashed transition-all duration-300",
                isDropping
                  ? "border-[var(--accent)] bg-[var(--accent-subtle)] scale-[1.02]"
                  : "border-[var(--accent)]/50 bg-[var(--bg-surface)] hover:bg-[var(--accent-subtle)]"
              )}
              onDragOver={(e) => {
                if (isUploading) return;
                e.preventDefault();
                setIsDropping(true);
              }}
              onDragLeave={() => setIsDropping(false)}
              onDrop={(e) => {
                e.preventDefault();
                if (isUploading) {
                  toast.warning("Upload already in progress");
                  return;
                }
                setIsDropping(false);
                const files = e.dataTransfer.files;
                if (files.length) {
                  const f = files[0];
                  if (f.type.includes("video/")) {
                    setFile(f);
                  } else {
                    toast.error("Only video files are supported");
                  }
                }
              }}
            >
              <div className="flex items-center justify-center mb-1">
                <Upload size={24} className="text-[var(--accent)]" />
              </div>
              <div className="text-center">
                <p className="text-[15px] text-[var(--text-primary)] font-medium mb-1">
                  {isDropping
                    ? "Drop your video here..."
                    : "Drag and drop your video, or click to browse"}
                </p>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Accepted: MP4, MOV, AVI, MKV, WebM • Max size: 2GB
                </p>
                {file && (
                  <p className="text-sm text-[var(--text-primary)] font-medium mt-3">
                    {file.name}
                  </p>
                )}
              </div>
              <input
                className="hidden"
                id="video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
          </label>

          {file && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-[var(--accent)] hover:opacity-90 text-white px-8"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Videos Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[var(--text-primary)]" />
              <h2 className="text-[15px] font-medium text-[var(--text-primary)]">Uploaded Videos</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={!!intervalId}
                onClick={getAllVideos}
                className="px-3 py-1.5 text-[13px] font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md transition-colors"
              >
                Refresh
              </button>
              {intervalId ? (
                <button
                  onClick={stopPolling}
                  className="px-3 py-1.5 text-[13px] font-medium bg-[var(--accent)] text-white hover:opacity-90 rounded-md transition-colors"
                >
                  Stop Polling
                </button>
              ) : (
                <button
                  onClick={startPolling}
                  className="px-3 py-1.5 text-[13px] font-medium bg-[var(--accent)] text-white hover:opacity-90 rounded-md transition-colors"
                >
                  Auto Refresh
                </button>
              )}
            </div>
          </div>

          <div className="w-full">
            {loading ? (
              <div className="w-full flex justify-center items-center h-24">
                <Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" />
              </div>
            ) : videos?.length > 0 ? (
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow className="bg-[var(--bg-elevated)] border-none hover:bg-[var(--bg-elevated)]">
                    <TableHead className="font-medium text-[var(--text-secondary)] h-10 w-[150px]">Video ID</TableHead>
                    <TableHead className="font-medium text-[var(--text-secondary)] h-10">Created</TableHead>
                    <TableHead className="font-medium text-[var(--text-secondary)] h-10">Source</TableHead>
                    <TableHead className="font-medium text-[var(--text-secondary)] h-10 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos?.map((video: any) => (
                    <TableRow
                      key={video.key}
                      className="border-b border-[var(--bg-border)] hover:bg-[var(--bg-elevated)]"
                    >
                      <TableCell className="font-mono text-xs text-[var(--text-primary)]">
                        {video.key
                          ?.replace("video:", "")
                          ?.replace(":status", "")
                          ?.substring(0, 12)}
                        ...
                      </TableCell>
                      <TableCell className="text-[13px] text-[var(--text-secondary)]">
                        {new Date(
                          video?.video?.createdAt
                        )?.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <a
                          href={video?.video?.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[var(--accent)] hover:opacity-80 underline underline-offset-2"
                        >
                          View original
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "text-[11px] font-semibold uppercase px-2 py-1 rounded-sm",
                            statusColor(video.status)
                          )}
                        >
                          {video.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-transparent">
                <div className="flex items-center justify-center w-5 h-5 bg-[var(--bg-border)] mb-4" />
                <h3 className="text-[15px] font-medium text-[var(--text-primary)] font-sans mb-1">
                  No videos yet
                </h3>
                <p className="text-[13px] text-[var(--text-secondary)] text-center mb-4">
                  Upload a file to begin transcoding
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
