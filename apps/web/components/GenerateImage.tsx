"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { SelectModel } from "./Models";
import toast from "react-hot-toast";
import { checkPaymentStatus } from "@/utils/payment"


export function GenerateImage() {
    const router = useRouter()
    const { getToken, userId } = useAuth()
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] = useState<string>();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyPayment = async () => {
            if (!userId) return
            const hasPaid = await checkPaymentStatus(userId)
            if (!hasPaid) {
                toast.error("Please subscribe to continue")
                router.push("/pricing")
            }
            setIsLoading(false)
        }
        verifyPayment()
    }, [userId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <div className="items-center justify-center flex pt-4">
        <div>
            <SelectModel selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
            <div className="flex justify-center pt-4">
                <Textarea onChange={(e) => {
                    setPrompt(e.target.value);
                }} placeholder="Describe the image that you'd like to see here" className="py-4 text-2xl px-4 w-2xl border border-blue-200 hover:border-blue-300 focus:border-blue-300 outline-none"></Textarea>
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    const token = await getToken();
                    await axios.post(`${BACKEND_URL}/ai/generate`, {
                        prompt,
                        modelId: selectedModel,
                        num: 1 
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    toast("Image generation in progress")
                    setPrompt("");
                }} variant={"secondary"}>Create Image</Button>
            </div>
        </div>
    </div>
}