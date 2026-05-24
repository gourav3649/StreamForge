"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { genRemove } from "@/server/gen-remove-action";
import { useEditorStore } from "@/store/editor-store";
import { useLayerStore } from "@/store/layer-store";
import { Eraser } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function GenRemove() {
  const generating = useEditorStore((state) => state.generating);
  const setGenerating = useEditorStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const [activeTag, setActiveTag] = useState("");
  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Content Aware <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Smart AI Remove</h4>
            <p className="text-sm text-muted-foreground">
              Generative Remove any part of the image
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xs">Suggested selections</h3>
            <div className="flex gap-2"></div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Selection</Label>
              <Input
                className="col-span-2 h-8"
                value={activeTag}
                name="tag"
                onChange={(e) => {
                  setActiveTag(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-4"
          disabled={generating}
          onClick={async () => {
            setGenerating(true);
            try {
              const res = await genRemove({
                activeImage: activeLayer.url!,
                prompt: activeTag,
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
                      toast.error(`Cloudinary AI Error: ${response.statusText || response.status}.`);
                      return;
                    }
                  } catch (e) {}
                  await new Promise((resolve) => setTimeout(resolve, delay));
                }
                if (!isProcessed) {
                  toast.error("Image processing failed or timed out.");
                  return;
                }
                const newLayerId = crypto.randomUUID();
                addLayer({
                  id: newLayerId,
                  url: res.data.success,
                  format: activeLayer.format,
                  height: activeLayer.height,
                  width: activeLayer.width,
                  name: activeLayer.name,
                  publicId: activeLayer.publicId,
                  resourceType: "image",
                });
                setActiveLayer(newLayerId);
              }
              if (res?.serverError) toast.error(String(res.serverError));
              if (res?.fetchError) toast.error(String(res.fetchError));
              if (res?.data?.error) toast.error(String(res.data.error));
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
          Magic Remove 🎨
        </Button>
      </PopoverContent>
    </Popover>
  );
}
