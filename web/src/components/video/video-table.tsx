"use client";
import { Video } from "@/lib/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Video as VideoIcon } from "lucide-react";

type VideoTableProps = {
  videos: Video[];
};

const VideoTable = ({ videos }: VideoTableProps) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const handleClick = (videoId: string) => {
    router.push(`/dashboard/video/${videoId}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 border border-dashed border-[var(--bg-border)] rounded-xl bg-transparent">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-elevated)] mb-4">
          <VideoIcon className="w-6 h-6 text-[var(--text-secondary)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--text-primary)] font-sans mb-2">
          No media found
        </h3>
        <p className="text-sm text-[var(--text-secondary)] text-center max-w-sm">
          Upload a video to start transcoding or generating AI edits.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your videos.</TableCaption>

      {/* Table Header */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[300px]">Original URL</TableHead>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {videos.map((video) => (
          <TableRow key={video.id}>
            {/* Video ID with clickable effect */}
            <TableCell
              onClick={() => handleClick(video.id)}
              className="font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer transition-all"
            >
              {video.id}
            </TableCell>

            {/* Video Title */}
            <TableCell>{video.title}</TableCell>

            {/* Video Description */}
            <TableCell>{video.description || "N/A"}</TableCell>

            {/* Video Original URL */}
            <TableCell>
              <a
                href={video.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-[var(--accent-hover)] truncate max-w-[280px] inline-block"
              >
                {video.originalUrl}
              </a>
            </TableCell>

            {/* Video Thumbnail */}
            <TableCell>
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ) : (
                <div className="w-20 h-20 flex justify-center items-center bg-[var(--bg-elevated)] rounded-md border border-[var(--bg-border)]">
                  <span className="text-[var(--text-muted)] text-xs">
                    No Thumb
                  </span>
                </div>
              )}
            </TableCell>

            {/* Video Status */}
            <TableCell>
              <span
                className={`font-semibold uppercase text-xs px-2 py-1 rounded-full ${
                  video.status === "QUEUE"
                    ? "bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20"
                    : video.status === "PROCESSING"
                    ? "bg-[var(--info)]/10 text-[var(--info)] border border-[var(--info)]/20"
                    : video.status === "PROCESSED"
                    ? "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20"
                    : "bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/20"
                }`}
              >
                {video.status}
              </span>
            </TableCell>

            {/* Video Creation Date */}
            <TableCell className="text-right text-[var(--text-secondary)]">
              {new Date(video.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Table Footer */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8} className="text-center text-[var(--text-secondary)]">
            Total Videos: {videos.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default VideoTable;
