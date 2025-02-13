"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { SelectModel } from "./Models";
import toast from "react-hot-toast";
import { Label } from "./ui/label";
import { GlowEffect } from "./GlowEffect";
import { Sparkles } from "lucide-react";

export function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>();

  const { getToken } = useAuth();

  return (
    <div className="md:w-4xl">
      <SelectModel
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div className="group relative mt-4 min-w-[300px]">
        <Label className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-medium text-foreground group-has-[:disabled]:opacity-50">
          Describe your image here
        </Label>
        <Textarea onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div className="flex justify-end pt-4">
        <div className="relative">
          <GlowEffect
            colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
            mode="colorShift"
            blur="soft"
            duration={3}
            scale={0.9}
          />
          <Button
            onClick={async () => {
              const token = await getToken();
              await axios.post(
                `${BACKEND_URL}/ai/generate`,
                {
                  prompt,
                  modelId: selectedModel,
                  num: 1,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast("Image generation in progress");
              setPrompt("");
            }}
            variant={"outline"}
            className="relative z-10 cursor-pointer"
          >
            Generate Image <Sparkles size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
