"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModal } from "@/components/ui/upload";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X } from "lucide-react";
import { useCredits } from "@/hooks/use-credits";

interface UploadedFile {
  name: string;
  status: "uploaded" | "failed";
  timestamp: Date;
}

export function Train() {
  const { getToken } = useAuth();
  const [zipUrl, setZipUrl] = useState("");
  const [type, setType] = useState("Man");
  const [age, setAge] = useState<string>();
  const [ethinicity, setEthinicity] = useState<string>();
  const [eyeColor, setEyeColor] = useState<string>();
  const [bald, setBald] = useState(false);
  const [name, setName] = useState("");
  const [modelTraining, setModelTraining] = useState(false);
  const router = useRouter();
  const { credits } = useCredits();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  async function trainModal() {
    if (credits <= 0) {
      router.push("/pricing");
      return;
    }
    const input = {
      zipUrl,
      type,
      age: parseInt(age ?? "0"),
      ethinicity,
      eyeColor,
      bald,
      name,
    };

    try {
      const token = await getToken();
      setModelTraining(true);
      await axios.post(`${BACKEND_URL}/ai/training`, input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(
        "Model training started! This will take approximately 20 minutes."
      );
    } catch (error) {
      toast.error("Failed to start model training");
    } finally {
      setModelTraining(false);
    }
  }

  const handleRemoveFile = (indexToRemove: number) => {
    setUploadedFiles((prev) => {
      const newFiles = prev.filter((_, index) => index !== indexToRemove);
      if (newFiles.length === 0) {
        setZipUrl("");
      }
      return newFiles;
    });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Train New Model</CardTitle>
              <CardDescription>
                Create a custom AI model with your photos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  placeholder="Enter model name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Woman">Woman</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ethnicity</Label>
                <Select value={ethinicity} onValueChange={setEthinicity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian_American">
                      Asian American
                    </SelectItem>
                    <SelectItem value="East_Asian">East Asian</SelectItem>
                    <SelectItem value="South_East_Asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="South_Asian">South Asian</SelectItem>
                    <SelectItem value="Middle_Eastern">
                      Middle Eastern
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Eye Color</Label>
                <Select value={eyeColor} onValueChange={setEyeColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select eye color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bald</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch checked={bald} onCheckedChange={setBald} />
                  <span className="text-sm text-muted-foreground">
                    {bald ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="rounded-lg border border-dashed p-4">
                <UploadModal
                  onUploadDone={(zipUrl, fileNames) => {
                    setZipUrl(zipUrl);
                    setUploadedFiles((prev) => [
                      ...prev,
                      ...fileNames.map((name) => ({
                        name,
                        status: "uploaded" as const,
                        timestamp: new Date(),
                      })),
                    ]);
                  }}
                />
                <AnimatePresence>
                  {uploadedFiles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Uploaded Files ({uploadedFiles.length})
                        </p>
                        {uploadedFiles.length > 1 && (
                          <button
                            onClick={() => {
                              setUploadedFiles([]);
                              setZipUrl("");
                            }}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors"
                          >
                            Remove all
                          </button>
                        )}
                      </div>
                      <div className="max-h-32 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                        <AnimatePresence>
                          {uploadedFiles.map((file, index) => (
                            <motion.div
                              key={`${file.name}-${index}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center justify-between text-sm p-2 rounded-md 
                                       bg-zinc-50 dark:bg-zinc-900 group hover:bg-zinc-100 
                                       dark:hover:bg-zinc-800 transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <motion.svg
                                  className="w-4 h-4 text-green-500 flex-shrink-0"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <path d="M5 13l4 4L19 7" />
                                </motion.svg>
                                <span
                                  className="truncate max-w-[200px]"
                                  title={file.name}
                                >
                                  {file.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-zinc-500">
                                  {new Date(
                                    file.timestamp
                                  ).toLocaleTimeString()}
                                </span>
                                <button
                                  onClick={() => handleRemoveFile(index)}
                                  className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 
                                           text-zinc-400 hover:text-red-500 transition-all
                                           opacity-0 group-hover:opacity-100 focus:opacity-100
                                           focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                  title="Remove file"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div></div>
          <Button
            onClick={trainModal}
            disabled={
              modelTraining ||
              !name ||
              !zipUrl ||
              !type ||
              !age ||
              !ethinicity ||
              !eyeColor
            }
            className="gap-2"
          >
            {modelTraining ? (
              <>Training...</>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Train Model (20 credits)
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
