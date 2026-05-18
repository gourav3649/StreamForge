import { getVideos } from "@/actions/video-actions";
import VideoTable from "@/components/video/video-table";
import React from "react";

const DashboardPage = async () => {
  const videos = await getVideos();

  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-white/[0.06] bg-background/50 p-6 text-4xl font-bold backdrop-blur-lg">
        Dashboard
      </h1>
      <div className="p-4">
        <VideoTable videos={videos} />
      </div>
    </div>
  );
};

export default DashboardPage;
