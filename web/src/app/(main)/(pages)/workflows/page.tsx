"use client";

import { Button } from "@/components/ui/button";
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
      // 1. Get Presigned URL from Next.js API
      const presignRes = await fetch("/api/video/presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, fileType: file.type }),
      });

      if (!presignRes.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl, publicUrl } = await presignRes.json();

      // 2. Upload file directly to S3 (bypasses Vercel's 4.5MB limit)
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) throw new Error("S3 Upload failed");

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

  const getAllVideos = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetch("/api/video/redis-video");
    const json = await res.json();
    setVideos(json?.videos);
    setLoading(false);
  };

  const startPolling = () => {
    const id = setInterval(() => getAllVideos(), 5000);
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

      <div className="max-w-5xl mx-auto w-full px-4 py-6 space-y-8">
        {/* Upload Area */}
        <div>
          <label htmlFor="video" className="cursor-pointer block">
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-xl border-2 border-dashed transition-all duration-300",
                isDropping
                  ? "border-violet-500 bg-violet-500/5"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
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
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Upload size={24} className="text-violet-400" />
              </div>
              <div className="text-center">
                <p className="text-sm text-neutral-400">
                  {isDropping
                    ? "Drop your video here..."
                    : "Drag and drop your video, or click to browse"}
                </p>
                {file && (
                  <p className="text-sm text-white font-medium mt-2">
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
                className="bg-violet-500 hover:bg-violet-600 text-white px-8"
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
            <div className="flex items-center gap-2">
              <Video size={20} className="text-violet-400" />
              <h2 className="text-xl font-semibold">Uploaded Videos</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!!intervalId}
                onClick={getAllVideos}
                className="border-white/10 hover:bg-white/5"
              >
                <RefreshCw size={14} className="mr-1" />
                Refresh
              </Button>
              {intervalId ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={stopPolling}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Pause size={14} className="mr-1" />
                  Stop Polling
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={startPolling}
                  className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
                >
                  <Play size={14} className="mr-1" />
                  Auto Refresh
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            {loading ? (
              <div className="w-full flex justify-center items-center h-24">
                <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
              </div>
            ) : videos?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/[0.06] hover:bg-transparent">
                    <TableHead className="text-neutral-500">Video ID</TableHead>
                    <TableHead className="text-neutral-500">Created</TableHead>
                    <TableHead className="text-neutral-500">Source</TableHead>
                    <TableHead className="text-neutral-500">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos?.map((video: any) => (
                    <TableRow
                      key={video.key}
                      className="border-white/[0.06] hover:bg-white/[0.02]"
                    >
                      <TableCell className="font-mono text-xs text-neutral-400">
                        {video.key
                          ?.replace("video:", "")
                          ?.replace(":status", "")
                          ?.substring(0, 12)}
                        ...
                      </TableCell>
                      <TableCell className="text-sm text-neutral-400">
                        {new Date(
                          video?.video?.createdAt
                        )?.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <a
                          href={video?.video?.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
                        >
                          View original
                        </a>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase px-2 py-1 rounded-md",
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
              <div className="flex flex-col items-center justify-center py-16 text-neutral-500">
                <Video size={32} className="mb-3 text-neutral-600" />
                <p className="text-sm">No videos uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
