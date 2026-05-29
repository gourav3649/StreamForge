import { getVideos } from "@/actions/video-actions";
import VideoTable from "@/components/video/video-table";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";

const DashboardPage = async () => {
  const videos = await getVideos();
  const user = await currentUser();
  let credits = 10;
  let tier = "Free";

  if (user) {
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });
    if (dbUser) {
      credits = dbUser.credits;
      tier = dbUser.tier;
    }
  }

  const isUnlimited = tier === "Unlimited" || credits >= 99999;
  const creditsDisplay = isUnlimited ? "Unlimited" : credits;

  return (
    <div className="space-y-6 px-4 sm:px-margin-desktop py-8">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Overview</h2>
          <p className="text-on-surface-variant font-body-lg">Forging your digital masterpiece.</p>
        </div>
        <Link 
          href="/workflows"
          className="px-6 py-3 rounded-xl kinetic-gradient text-white font-bold kinetic-glow flex items-center gap-2 hover:brightness-110 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          New Project
        </Link>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Metric Card 1: Videos */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl">movie</span>
          </div>
          <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">Videos Processed</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-headline-md text-headline-md text-primary">{videos.length}</h3>
          </div>
          <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full kinetic-gradient w-full"></div>
          </div>
        </div>

        {/* Metric Card 2: Credits */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl">token</span>
          </div>
          <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">Credits Remaining</p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-headline-md text-headline-md text-secondary-fixed-dim">{creditsDisplay}</h3>
            <span className="text-on-surface-variant font-medium text-sm">Tier: {tier}</span>
          </div>
          <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-full"></div>
          </div>
        </div>

        {/* Metric Card 3: Upgrade */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group bg-gradient-to-br from-surface-elevated to-surface">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">Subscription</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">{tier} <span className="text-body-md text-on-surface-variant"> Plan</span></h3>
            </div>
            <div className="p-3 rounded-full bg-tertiary-container/20 text-tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 space-y-1">
              <p className="text-sm text-on-surface-variant">Upgrade your plan to get access to 4K cinematic renders and AI generation tools.</p>
            </div>
            <Link href="/billing" className="px-4 py-2 border border-border-subtle rounded-lg text-xs font-bold hover:bg-surface-variant transition-colors">
              Upgrade
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="w-full">
        {/* Activity Table */}
        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-border-subtle flex justify-between items-center">
            <h4 className="font-headline-sm text-headline-sm">Recent Tasks</h4>
            <Link href="/workflows" className="text-primary font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="p-6 overflow-x-auto">
            {/* We embed our existing VideoTable here for now to keep functionality, but wrap it nicely */}
            <VideoTable videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
