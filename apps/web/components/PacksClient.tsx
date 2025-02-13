"use client";

import { useState } from "react";
import { SelectModel } from "./Models";
import { PackCard, TPack } from "./PackCard";

export function PacksClient({ packs }: { packs: TPack[] }) {
  const [selectedModelId, setSelectedModelId] = useState<string>();

  return (
    <div>
      <SelectModel
        selectedModel={selectedModelId}
        setSelectedModel={setSelectedModelId}
      />
      <div className="text-xl font-semibold pt-4">Select Pack for Model</div>
      <div className="grid md:grid-cols-3 gap-4 pt-2 pb-4 grid-cols-1">
        {packs.map((p) => (
          <PackCard selectedModelId={selectedModelId!} {...p} />
        ))}
      </div>
    </div>
  );
}
