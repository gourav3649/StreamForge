import { getVideos } from "@/actions/video-actions";
import VideoTable from "@/components/video/video-table";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DashboardPage = async () => {
  const videos = await getVideos();
  const user = await currentUser();
  let credits = "0";

  if (user) {
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });
    credits = dbUser?.credits || "10";
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-[var(--bg-border)] bg-[var(--bg-base)]/80 p-6 text-[32px] font-bold font-serif backdrop-blur-lg">
        Dashboard
      </h1>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full bg-[var(--bg-base)] border border-[var(--bg-border)] rounded-lg p-4 flex flex-col justify-center h-[88px]">
            <span className="text-[13px] text-[var(--text-secondary)] font-medium mb-1">Total videos</span>
            <span className="text-2xl font-bold text-[var(--text-primary)]">{videos.length}</span>
          </div>
          <div className="flex-1 w-full bg-[var(--bg-base)] border border-[var(--bg-border)] rounded-lg p-4 flex flex-col justify-center h-[88px]">
            <span className="text-[13px] text-[var(--text-secondary)] font-medium mb-1">Credits left</span>
            <span className="text-2xl font-bold text-[var(--text-primary)]">{credits}</span>
          </div>
        </div>
        <VideoTable videos={videos} />
      </div>
    </div>
  );
};

export default DashboardPage;
