"use client";

import { useAuth } from "@clerk/nextjs"
import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { BACKEND_URL } from "@/app/config"
import { SelectModel } from "./Models"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Wand2 } from "lucide-react"
import { useCredits } from "@/hooks/use-credits"
import { useRouter } from "next/navigation"

export function SidebarGenerateImage() {
	const [prompt, setPrompt] = useState("")
	const [selectedModel, setSelectedModel] = useState<string>()
	const [isGenerating, setIsGenerating] = useState(false)
	const { getToken } = useAuth()
	const { credits } = useCredits();
	const router = useRouter()

	const handleGenerate = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!prompt || !selectedModel) return

		if (credits <= 0) {
			router.push("/pricing")
			return
		}

		setIsGenerating(true)
		try {
			const token = await getToken()
			await axios.post(`${BACKEND_URL}/ai/generate`, {
				prompt,
				modelId: selectedModel,
				num: 1
			}, {
				headers: { Authorization: `Bearer ${token}` }
			})
			toast.success("Image generation started!")
			setPrompt("")
		} catch (error) {
			toast.error("Failed to generate image")
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<motion.div
			className="flex flex-col justify-center h-full  max-w-2xl mx-auto space-y-4"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>

			<form onSubmit={(e) => handleGenerate(e)} className="relative w-full border-4 rounded-xl">
				<div className="p-2">
					<Textarea
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="Write a prompt..."
						className="w-full placeholder:text-gray-400/60 shadow-none bg-transparent border-none text-md rounded-none focus-visible:ring-0 min-h-50 max-h-80 resize-none outline-none"
					/>
				</div>
			</form>

			<SelectModel
				selectedModel={selectedModel}
				setSelectedModel={setSelectedModel}
				height={80}
				heading={false}
			/>

			<Button
				variant="default"
				type="submit"
				className="w-full bg-gradient-to-r from-pink-300 text-white to-purple-400 cursor-pointer rounded-lg"
				disabled={isGenerating || !prompt || !selectedModel}
			>
				<Wand2 className="w-10 h-10" />
				<span>{isGenerating ? "Generating..." : "Generate"}</span>
			</Button>

		</motion.div>
	)
}


