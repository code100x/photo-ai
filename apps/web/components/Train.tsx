"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { UploadModal } from "@/components/ui/upload"
import { useState } from "react"
import { TrainModelInput } from "common/inferred"
import axios from "axios"
import { BACKEND_URL } from "@/app/config"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PulseLoader } from "react-spinners"

export function Train() {
    const { getToken } = useAuth();
    const [zipUrl, setZipUrl] = useState("");
    const [type, setType] = useState("Man")
    const [age, setAge] = useState<string>()
    const [ethinicity, setEthinicity] = useState<string>()
    const [eyeColor, setEyeColor] = useState<string>()
    const [bald, setBald] = useState(false)
    const [name, setName] = useState("")
    const [modelTraining, setModelTraining] = useState(false);
    const router = useRouter();

    async function trainModal() {
        const input = {
            zipUrl,
            type,
            age: parseInt(age ?? "0"),
            ethinicity,
            eyeColor,
            bald,
            name
        };

        const token = await getToken()
        setModelTraining(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Model has started to train. It should take ~20 minutes for the model to complete training")
        } catch (error) {
            toast.error("Failed to start model training")
        } finally {
            setModelTraining(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center pt-4 bg-gradient-to-r   min-h-screen">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Card className="w-[600px] px-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Create Model </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Train model to create your AI image</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1.5 flex-1">
                                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                                <Input 
                                    onChange={(e) => setName(e.target.value)} 
                                    id="name" 
                                    placeholder="Name of the model" 
                                    className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 flex-1">
                                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Age</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Age of the model" 
                                    onChange={(e) => setAge(e.target.value)} 
                                    className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1.5 flex-1">
                                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Type</Label>
                                <Select onValueChange={(value) => setType(value)}>
                                    <SelectTrigger 
                                        id="name" 
                                        className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="dark:bg-gray-700 dark:border-gray-600">
                                        <SelectItem value="Man" className="dark:hover:bg-gray-600 dark:text-gray-100">Man</SelectItem>
                                        <SelectItem value="Woman" className="dark:hover:bg-gray-600 dark:text-gray-100">Woman</SelectItem>
                                        <SelectItem value="Others" className="dark:hover:bg-gray-600 dark:text-gray-100">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5 flex-1">
                                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Ethinicity</Label>
                                <Select onValueChange={(value) => setEthinicity(value)}>
                                    <SelectTrigger 
                                        id="name" 
                                        className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="dark:bg-gray-700 dark:border-gray-600">
                                        <SelectItem value="White" className="dark:hover:bg-gray-600 dark:text-gray-100">White</SelectItem>
                                        <SelectItem value="Black" className="dark:hover:bg-gray-600 dark:text-gray-100">Black</SelectItem>
                                        <SelectItem value="Asian_American" className="dark:hover:bg-gray-600 dark:text-gray-100">Asian American</SelectItem>
                                        <SelectItem value="East_Asian" className="dark:hover:bg-gray-600 dark:text-gray-100">East Asian</SelectItem>
                                        <SelectItem value="South_East_Asian" className="dark:hover:bg-gray-600 dark:text-gray-100">South East Asian</SelectItem>
                                        <SelectItem value="South_Asian" className="dark:hover:bg-gray-600 dark:text-gray-100">South Asian</SelectItem>
                                        <SelectItem value="Middle_Eastern" className="dark:hover:bg-gray-600 dark:text-gray-100">Middle Eastern</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Eye Color</Label>
                            <Select onValueChange={(value) => setEyeColor(value)}>
                                <SelectTrigger 
                                    id="name" 
                                    className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="dark:bg-gray-700 dark:border-gray-600">
                                    <SelectItem value="Brown" className="dark:hover:bg-gray-600 dark:text-gray-100">Brown</SelectItem>
                                    <SelectItem value="Blue" className="dark:hover:bg-gray-600 dark:text-gray-100">Blue</SelectItem>
                                    <SelectItem value="Hazel" className="dark:hover:bg-gray-600 dark:text-gray-100">Hazel</SelectItem>
                                    <SelectItem value="Gray" className="dark:hover:bg-gray-600 dark:text-gray-100">Gray</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Bald</Label>
                            <Switch 
                                onClick={(e) => setBald(!bald)} 
                                className="data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        <UploadModal onUploadDone={(zipUrl) => setZipUrl(zipUrl)} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button 
                        variant="outline" 
                        onClick={() => router.push("/")} 
                        className="hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700 dark:focus:ring-blue-600 dark:text-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button 
                        disabled={modelTraining || !name || !zipUrl || !type || !age || !ethinicity || !eyeColor }
                        onClick={trainModal}
                        className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600 dark:disabled:bg-gray-600"
                    >
                        {modelTraining ? <PulseLoader color="#ffffff" size={10} /> : "Create Model"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}