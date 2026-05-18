"use client";

import React from "react";
import dynamic from "next/dynamic";
import { EditorStore } from "@/store/editor-store";
import { LayerStore } from "@/store/layer-store";

// Fix "document is not defined" by disabling Server-Side Rendering for the Editor
const Editor = dynamic(() => import("./_components/Editor"), { ssr: false });

export default function Page() {
  return (
    <EditorStore.Provider initialValue={{ generating: false }}>
      <LayerStore.Provider
        initialValue={{
          layers: [
            {
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
            },
          ],
          layerComparisonMode: false,
        }}
      >
        <Editor />
      </LayerStore.Provider>
    </EditorStore.Provider>
  );
}
