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
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";

export function Train() {
  const { getToken } = useAuth();
  const [zipUrl, setZipUrl] = useState("");
  const [type, setType] = useState("Man");
  const [age, setAge] = useState<string>();
  const [ethnicity, setEthnicity] = useState<string>();
  const [eyeColor, setEyeColor] = useState<string>();
  const [bald, setBald] = useState(false);
  const [name, setName] = useState("");
  const [modelTraining, setModelTraining] = useState(false);
  const router = useRouter();

  async function trainModal() {
    const input = {
      zipUrl,
      type,
      age: parseInt(age ?? "0"),
      ethnicity,
      eyeColor,
      bald,
      name,
    };

    const token = await getToken();
    setModelTraining(true);
    const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setModelTraining(false);
    toast("Model has started to train. It should take ~20 minutes for the model to complete training");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <Card className="w-full max-w-md sm:max-w-xl p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Create Your Model
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Easily train a new AI model with just a few steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Model name"
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Woman">Woman</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select onValueChange={(value) => setEthnicity(value)}>
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian_American">Asian American</SelectItem>
                    <SelectItem value="East_Asian">East Asian</SelectItem>
                    <SelectItem value="South_Asian">South Asian</SelectItem>
                    <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="eyeColor">Eye Color</Label>
              <Select onValueChange={(value) => setEyeColor(value)}>
                <SelectTrigger id="eyeColor">
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
            <div className="flex items-center space-x-3">
              <Label>Bald</Label>
              <Switch
                checked={bald}
                onClick={() => setBald(!bald)}
                className="ml-auto"
              />
            </div>
            <UploadModal
              onUploadDone={(zipUrl) => setZipUrl(zipUrl)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-1/2 sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={trainModal}
            disabled={modelTraining || !name || !zipUrl || !type || !age || !ethnicity || !eyeColor}
            className="w-1/2 sm:w-auto"
          >
            {modelTraining ? "Sending..." : "Create Model"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
