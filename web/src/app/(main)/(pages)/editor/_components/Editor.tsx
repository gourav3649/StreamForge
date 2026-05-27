"use client";
import ActiveImage from "@/components/editor/active-image";
import EditorLoadingScreen from "@/components/editor/editor-lodaing";
import Layers from "@/components/editor/layers";
import LayersSideBar from "@/components/editor/layers/layers-sidebar";
import ExportAsset from "@/components/editor/toolbar/export-media";
import ImageTools from "@/components/editor/toolbar/image-tools";
import VideoTools from "@/components/editor/toolbar/video-tool";
import UploadForm from "@/components/editor/upload/upload-form";
import { useLayerStore } from "@/store/layer-store";
import React from "react";

export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* AI Toolbar (Left) */}
      <div className="w-16 glass-panel flex flex-col items-center py-6 gap-6 z-30 flex-shrink-0 border-r border-border-subtle">
        {activeLayer.resourceType === "image" && <ImageTools />}
        {activeLayer.resourceType === "video" && <VideoTools />}
        {activeLayer.resourceType && (
          <ExportAsset resource={activeLayer.resourceType} />
        )}
      </div>

      {/* Central Working Area */}
      <section className="flex-1 canvas-container flex items-center justify-center p-4 sm:p-gutter relative overflow-hidden">
        {/* We place existing components here so their absolute positioning logic still works */}
        <EditorLoadingScreen />
        <UploadForm />
        
        {/* The actual canvas content */}
        <div className="relative w-full h-full flex items-center justify-center">
          <ActiveImage />
        </div>
      </section>

      {/* Right Panel (Layers & Attributes) */}
      <aside className="w-72 glass-panel flex-col z-30 hidden md:flex flex-shrink-0 border-l border-border-subtle">
        <div className="flex border-b border-border-subtle">
          <button className="flex-1 py-4 text-label-md font-bold text-primary border-b-2 border-primary">Layers</button>
          <button className="flex-1 py-4 text-label-md font-medium text-on-surface-variant hover:text-on-surface">Properties</button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <Layers />
        </div>
      </aside>

      {/* Mobile layers sheet */}
      <div className="md:hidden absolute top-4 right-4 z-40">
        <LayersSideBar />
      </div>
    </div>
  );
}
