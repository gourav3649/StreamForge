"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Image, Paintbrush } from "lucide-react";

import { toast } from "sonner";
import { useEditorStore } from "@/store/editor-store";
import { useLayerStore } from "@/store/layer-store";
import { Button } from "@/components/ui/button";
import { bgRemoval } from "@/server/bg-remove-action";

export default function BgRemove() {
  const setGenerating = useEditorStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const layers = useLayerStore((state) => state.layers);
  const generating = useEditorStore((state) => state.generating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            BG Removal
            <Image size={18} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Background Removal</h4>
            <p className="text-sm max-w-xs text-muted-foreground">
              Remove the background of an image with one simple click.
            </p>
          </div>
        </div>

        <Button
          disabled={!activeLayer?.url || generating}
          className="w-full mt-4"
          onClick={async () => {
            setGenerating(true);
            try {
              const res = await bgRemoval({
                activeImage: activeLayer.url!,
                format: activeLayer.format!,
              });
              if (res?.data?.success) {
                let isProcessed = false;
                const maxAttempts = 120;
                const delay = 1000;
                for (let attempt = 0; attempt < maxAttempts; attempt++) {
                  try {
                    const response = await fetch(res.data.success);
                    if (response.ok) {
                      isProcessed = true;
                      break;
                    }
                    if (response.status === 400 || response.status === 500) {
                      toast.error(`Cloudinary AI Error: ${response.statusText || response.status}. The AI failed to process this image.`);
                      return;
                    }
                  } catch (e) {
                    // Ignore fetch errors
                  }
                  await new Promise((resolve) => setTimeout(resolve, delay));
                }

                if (!isProcessed) {
                  toast.error("Image processing failed or timed out.");
                  return;
                }
                const newLayerId = crypto.randomUUID();
                addLayer({
                  id: newLayerId,
                  name: "bg-removed" + activeLayer.name,
                  format: "png",
                  height: activeLayer.height,
                  width: activeLayer.width,
                  url: res.data.success,
                  publicId: activeLayer.publicId,
                  resourceType: "image",
                });
                setActiveLayer(newLayerId);
              }
              if (res?.serverError) {
                toast.error(String(res.serverError));
              }
              if (res?.fetchError) {
                toast.error(String(res.fetchError));
              }
              if (res?.data?.error) {
                toast.error(String(res.data.error));
              }
              if (!res?.data?.success && !res?.serverError && !res?.fetchError) {
                 toast.error("An unknown error occurred during generation.");
              }
            } catch (err) {
              console.error("Action caught error:", err);
              toast.error("A client error occurred");
            } finally {
              setGenerating(false);
            }
          }}
        >
          {generating ? "Removing..." : "Remove Background"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
