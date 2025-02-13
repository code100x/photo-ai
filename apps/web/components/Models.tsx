"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { BACKEND_URL } from "@/app/config";
import { ModalCard } from "./ModalCard";

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
  const [modelLoading, setModalLoading] = useState(false);
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
  }, []);

  return (
    <div className="w-full">
      <div className="text-2xl font-semibold">Choose Your Model</div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-2 py-4">
        {models
          .filter((model) => model.trainingStatus === "Generated")
          .map((model) => (
            <ModalCard
              backgroundImage={model.thumbnail}
              content={{ description: model.name }}
              className={`${selectedModel === model.id ? "border-red-300" : ""} cursor-pointer transition-colors duration-300 rounded-md border w-full relative`}
              onclick={() => {
                setSelectedModel(model.id);
              }}
            />
          ))}
      </div>

      {models.find((x) => x.trainingStatus !== "Generated") &&
        "More models are being trained..."}

      {modelLoading && (
        <div className="flex gap-2 p-4">
          <Skeleton className="h-60 w-full rounded" />
          <Skeleton className="h-60 w-full rounded" />
          <Skeleton className="h-60 w-full rounded" />
        </div>
      )}
    </div>
  );
}
