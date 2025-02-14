"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs"
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { BACKEND_URL } from "@/app/config";
import Image from "next/image";

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

    return <>
        <div className="text-4xl text-blue-500 text-center max-w-4xl font-sans font-bold">
            Select Model
        </div>

        <div className="max-w-2xl">
            <div className="grid grid-cols-3 gap-2 p-2">
            {models.filter(model => model.trainingStatus === "Generated").map(model => <div className={`${selectedModel === model.id ? "border-red-300" : ""} cursor-pointer rounded border p-2 w-full`} onClick={() => {
                setSelectedModel(model.id);
            }}>
                    <div className="flex justify-between flex-col h-full">
                        <div>
                            <Image alt="thumbnail"
                            src={model.thumbnail} className="rounded" />
                        </div>
                        <div className="pt-8">
                            {model.name}
                        </div>
                    </div>
                </div>)}
            </div>

            {models.find(x => x.trainingStatus !== "Generated") && "More models are being trained..."}

            {modelLoading && <div className="flex gap-2 p-4">
                <Skeleton className="h-60 w-full rounded" />
                <Skeleton className="h-60 w-full rounded" />
                <Skeleton className="h-60 w-full rounded" />    
            </div>}
        </div>
    </>
}
