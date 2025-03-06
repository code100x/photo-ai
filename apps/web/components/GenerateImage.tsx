"use client"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { BACKEND_URL } from "@/app/config"
import { SelectModel } from "./Models"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useCredits } from "@/hooks/use-credits"
import { useRouter } from "next/navigation"
import { Badge } from "./ui/badge"
import { Dialog, DialogTrigger } from "./ui/dialog"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
export function GenerateImage() {
    const [prompt, setPrompt] = useState("")
    const [selectedModel, setSelectedModel] = useState<string>()
    const [isGenerating, setIsGenerating] = useState(false)
    const [falReqId, setFalReqId] = useState<string>("e05658a5-4904-49fd-bc4d-bf67d32511fa")
    const [imageStatus, setImageStatus] = useState<"Pending" | "Generated" | "Failed">("Pending")
    const [imageUrl, setImageUrl] = useState<string>()
    const [, setImageLoading] = useState(true)
    const { getToken } = useAuth()
    const { credits } = useCredits();
    const router = useRouter()

    const handleGenerate = async () => {
        if (!prompt || !selectedModel) return

        if (credits <= 0) {
            router.push("/pricing")
            return
        }

        setIsGenerating(true)
        try {
            const token = await getToken()
            const response = await axios.post(`${BACKEND_URL}/ai/generate`, {
                prompt,
                modelId: selectedModel,
                num: 1
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Image generation started!")
            setPrompt("")
            setFalReqId(response.data.falReqId)
        } catch (error) {
            toast.error("Failed to generate image")
        } finally {
            setIsGenerating(false)
        }
    }

    async function fetchImage() {
        try {
            setImageStatus('Pending')
            const res = await axios.post(`${BACKEND_URL}/api/image/status/${falReqId}`)
            if (res.data.status == 'Failed') {
                setImageLoading(false)
                setImageStatus('Failed')
                return
            }
            setImageStatus(res.data.status)
            if (res.data.imageUrl) setImageUrl(res.data.imageUrl)
        } catch (error) {
            setImageStatus('Failed')
            setImageLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        if (!falReqId || imageUrl) return;

        const interval = setInterval(() => {
            fetchImage();
        }, 2000);

        return () => clearInterval(interval);

    }, [falReqId, imageUrl])
    
    return (
        <motion.div
            className={`grid ${isGenerating ? 'md:grid-cols-3' : 'grid-cols-1'} grid-cols-1 w-full gap-4 px-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <div className="space-y-4 w-full col-span-2">
                <SelectModel
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Step 2 - Give a prompt"
                        className="min-h-[120px] text-2xl resize-none"
                    />
                </motion.div>

                <motion.div
                    className="flex justify-end"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt || !selectedModel}
                        className="px-8"
                    >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating..." : "Generate (1 credit)"}
                    </Button>
                </motion.div>
            </div>
            {
                isGenerating &&
                <div className="space-y-4 w-full">
                    <div className="bg-neutral-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Result</h2>
                            <Badge>{imageStatus}</Badge>
                        </div>
                        <Dialog>
                            <DialogTrigger className="w-full h-full">
                                {
                                    !imageUrl ?
                                        <Skeleton className="w-full h-86" /> :
                                        <Image
                                            src={imageUrl || ''}
                                            alt='image'
                                            width={1000}
                                            height={1000}
                                            className='object-cover rounded-md'
                                        />
                                }
                            </DialogTrigger>
                        </Dialog>
                        <div className="mt-4 text-sm text-neutral-400">
                            <p>Your request will cost 1 credit per operation.</p>
                        </div>
                    </div>
                </div>
            }
        </motion.div>
    )
}