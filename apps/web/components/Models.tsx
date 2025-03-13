import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TModel {
  id: string;
  thumbnail: string;
  name: string;
  trainingStatus: "Generated" | "Pending";
}

export function SelectModel({
  setSelectedModel,
  selectedModel,
  height,
  heading = true
}: {
  height: number,
  heading?: boolean;
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {heading && <h2 className="text-lg pb-4 font-bold">
         Select Model
        </h2>
      }
      {models.length > 0 && <div className="flex pt-4 items-center justify-between">
        {models.find((x) => x.trainingStatus !== "Generated") && (
          <Badge variant="secondary" className="animate-pulse">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Training in progress
          </Badge>
        )}
      </div>}

      {modelLoading ? (
        <div className="grid grid-cols-3 md:grid-cols-3 pt-4 gap-4">
          {[1, 2, 3].map((_, i) => (
            <Card key={i} className="animate-pulse bg-muted/50" style={{ height }} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-3 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {models
            .filter((model) => model.trainingStatus === "Generated")
            .map((model) => (
              <motion.div key={model.id} variants={item}>
                <Card
                  className={cn(
                    "group relative max-w-96 overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer",
                    selectedModel === model.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={model.thumbnail}
                      alt={`Thumbnail for ${model.name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          {model.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      )}

      {!modelLoading && models.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed"
        >
          <Sparkles className="h-8 w-8 text-muted-foreground/50" />
          <h3 className="mt-4 font-medium">No models available</h3>
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Start by training a new model
          </p>
        </motion.div>
      )}
    </div>
  );
}
