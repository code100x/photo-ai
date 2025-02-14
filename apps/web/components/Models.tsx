"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs"
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { BACKEND_URL } from "@/app/config";
import Image from "next/image";
import { motion } from "framer-motion";

interface TModel {
    id: string;
    thumbnail: string;
    name: string;
    trainingStatus: "Generated" | "Pending";
}

export function SelectModel({setSelectedModel, selectedModel}: {
    setSelectedModel: (model: string) => void;
    selectedModel?: string;
}) {
    const { getToken } = useAuth()
    const [modelLoading, setModalLoading] = useState(true);
    const [models, setModels] = useState<TModel[]>([]);

    useEffect(() => {
        (async() => {
            const token = await getToken();
            const response = await axios.get(`${BACKEND_URL}/models`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setModels(response.data.models);
            setSelectedModel(response.data.models[0]?.id)
            setModalLoading(false)
        })()
    }, [])

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="space-y-4">
                {modelLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Skeleton className="h-40" />
                        <Skeleton className="h-40" />
                        <Skeleton className="h-40" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {models.map((model) => (
                                <motion.div
                                    key={model.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                    className={`
                                        group cursor-pointer rounded-xl overflow-hidden
                                        bg-gradient-to-b from-gray-900/50 to-gray-900/30
                                        backdrop-blur-sm
                                        ${selectedModel === model.id 
                                            ? 'ring-2 ring-blue-500 border-transparent' 
                                            : 'border border-gray-700/50 hover:border-blue-500/50'}
                                        hover:shadow-2xl hover:shadow-blue-500/10
                                        transition-all duration-300
                                    `}
                                    onClick={() => setSelectedModel(model.id)}
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <Image
                                            src={model.thumbnail}
                                            alt={model.name}
                                            fill
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4 relative z-20">
                                        <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                                            {model.name}
                                        </h3>
                                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 transition-all duration-300" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {models.find(x => x.trainingStatus !== "Generated") && (
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                                    <span className="text-gray-300">More models are being trained...</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
