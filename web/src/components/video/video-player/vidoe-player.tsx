"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import VideoJS from "../video-js";
import { Video } from "@/lib/types";
import { Download, Link, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type VideoPlayerProps = {
  video: Video;
};

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const playerRef = useRef(null);
  const transcodedplayerRef = useRef(null);

  const [resolution, setResolution] = useState(360);
  const [copied, setCopied] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  // Fetch a presigned GET URL for the private original video
  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        // Extract the S3 key from the original URL
        const urlObj = new URL(video.originalUrl);
        const key = decodeURIComponent(urlObj.pathname.slice(1)); // strip leading '/'
        const res = await fetch(`/api/video/presigned-get?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        if (data.url) setOriginalUrl(data.url);
      } catch (e) {
        console.error("Failed to fetch presigned URL", e);
      }
    };
    fetchPresignedUrl();
  }, [video.originalUrl]);

  // Build the HLS stream URL directly from S3 bucket + video ID
  const hlsUrl = `https://${process.env.NEXT_PUBLIC_TARGET_VIDEO_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/_transcoding_video_outptut/${video.id}/output_${resolution}p/hls_${resolution}p.m3u8`;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: originalUrl ? [{ src: originalUrl, type: "video/mp4" }] : [],
  };

  const transcodedvideoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{ src: hlsUrl, type: "application/x-mpegURL" }],
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(hlsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  const handleTranscodedPlayerReady = (player: any) => {
    transcodedplayerRef.current = player;

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div className="grid auto-rows-min gap-4 lg:grid-cols-2">
      {/* Transcoded HLS Video */}
      <div className="aspect-video rounded-xl bg-muted/50">
        <div className="container p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-bold">Transcoded HLS</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="gap-1"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy HLS URL"}
              </Button>
              <Select onValueChange={(v) => setResolution(+v)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Resolution</SelectLabel>
                    <SelectItem value="360">360p</SelectItem>
                    <SelectItem value="480">480p</SelectItem>
                    <SelectItem value="720">720p</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="max-w-screen-md mx-auto mt-6 rounded-lg overflow-hidden">
            <VideoJS options={transcodedvideoJsOptions} onReady={handleTranscodedPlayerReady} />
          </div>
        </div>
      </div>

      {/* Original Video */}
      <div className="aspect-video rounded-xl bg-muted/50">
        <div className="container p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-bold">Original</h3>
            <a href={originalUrl || "#"} download target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1" disabled={!originalUrl}>
                <Download className="w-4 h-4" />
                {originalUrl ? "Download" : "Loading..."}
              </Button>
            </a>
          </div>
          <div className="max-w-screen-md mx-auto mt-6 rounded-lg overflow-hidden">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
