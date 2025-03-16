"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { SelectModel } from "./Models";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCredits } from "@/hooks/use-credits";
import { useRouter } from "next/navigation";
import CustomLabel from "./ui/customLabel";
import { GlowEffect } from "./GlowEffect";

export function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();
  const { credits } = useCredits();
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt || !selectedModel) return;

    if (credits <= 0) {
      router.push("/pricing");
      return;
    }

    setIsGenerating(true);
    try {
      const token = await getToken();
      await axios.post(
        `${BACKEND_URL}/ai/generate`,
        {
          prompt,
          modelId: selectedModel,
          num: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Image generation started!");
      setPrompt("");
    } catch (error) {
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <SelectModel
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full"
        >
          <CustomLabel label="Enter your prompt here..." />
          <Textarea
            className="w-full min-h-24"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </motion.div>

        <div className="flex justify-end pt-4">
          <div className="relative">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !selectedModel}
              variant={"outline"}
              className="relative z-20 cursor-pointer"
            >
              Generate Image <Sparkles size={24} />
            </Button>
            {(prompt && selectedModel) && (
              <GlowEffect
                colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
                mode="colorShift"
                blur="soft"
                duration={3}
                scale={0.9}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
