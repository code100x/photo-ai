"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { BACKEND_URL } from "@/app/config";
import { motion } from "framer-motion";

interface TModel {
  id: string;
  thumbnail: string;
  name: string;
  trainingStatus: "Generated" | "Pending";
}

export function SelectModel({
  setSelectedModel,
  selectedModel,
}: {
  setSelectedModel: (model: string) => void;
  selectedModel?: string;
}) {
  const { getToken } = useAuth();
  const [modelLoading, setModalLoading] = useState(true);
  const [models, setModels] = useState<TModel[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModels(response.data.models);
      setSelectedModel(response.data.models[0]?.id);
      setModalLoading(false);
    })();
  }, [getToken, setSelectedModel]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Select Model
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {modelLoading ? (
         
          Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Skeleton className="h-60 w-full rounded-lg" />
            </motion.div>
          ))
        ) : (
          
          models
            .filter((model) => model.trainingStatus === "Generated")
            .map((model) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  selectedModel === model.id
                    ? "border-2 border-blue-500 dark:border-blue-600"
                    : "border border-gray-200 dark:border-gray-700"
                } cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex flex-col h-full">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={model.thumbnail}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-end">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {model.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))
        )}
      </div>

      {models.some((x) => x.trainingStatus !== "Generated") && (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
          More models are being trained...
        </div>
      )}
    </div>
  );
}