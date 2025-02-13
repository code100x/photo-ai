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
import { motion } from "framer-motion";

export function GenerateImage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>();
  const { getToken } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <motion.div
        className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Generate Image
        </h1>

        {/* Model Selection */}
        <div className="mb-8">
          <SelectModel
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>

        {/* Prompt Input */}
        <div className="mb-8">
          <Textarea
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image that you'd like to see here"
            className="w-full text-lg sm:text-xl p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-300"
            rows={4}
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={async () => {
              if (!prompt || !selectedModel) {
                toast.error("Please select a model and enter a prompt.");
                return;
              }
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
              toast.success("Image generation in progress!");
              setPrompt("");
            }}
            className="w-full sm:w-auto px-8 py-3 text-lg sm:text-xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
          >
            Create Image
          </Button>
        </div>
      </motion.div>
    </div>
  );
}