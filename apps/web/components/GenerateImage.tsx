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

export function GenerateImage() {
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] = useState<string>();
    const [images, setImages] = useState<string[]>([]);
    const { getToken } = useAuth();

    const handleGenerate = async () => {
        if (!prompt || !selectedModel) {
            toast.error("Please enter a prompt and select a model");
            return;
        }

        try {
            const token = await getToken();
            const response = await axios.post(`${BACKEND_URL}/ai/generate`, {
                prompt,
                modelId: selectedModel,
                num: 1 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            toast.success("Image generation in progress");
            setImages(response.data.images || []);
        } catch (error) {
            toast.error("Failed to generate image");
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="space-y-4">
                <SelectModel selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
                <Textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Describe your image..." 
                    className="mt-4 p-3 text-base md:text-lg w-full rounded-md border border-gray-600 focus:border-blue-400 outline-none transition-all duration-300 ease-in-out focus:shadow-lg focus:scale-105"
                />
                <Button onClick={handleGenerate} className="mt-4 w-full py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
                    Generate
                </Button>
            </div>
            {images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {images.map((img, index) => (
                        <img key={index} src={img} alt="Generated" className="rounded-lg w-full h-40 object-cover" />
                    ))}
                </div>
            )}
        </div>
    );
}
