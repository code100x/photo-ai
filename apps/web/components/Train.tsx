"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { TrainModelInput } from "common/inferred";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { FileUpload } from "./ui/Fileupload";

export function Train() {
  const { getToken } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("Man");
  const [age, setAge] = useState<string>();
  const [ethinicity, setEthinicity] = useState<string>();
  const [eyeColor, setEyeColor] = useState<string>();
  const [bald, setBald] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImageUrl("dummy-url");
        toast.success("File uploaded successfully");
      } else {
        toast.error("Please upload an image file");
      }
    }
  };

  async function trainModal() {
    if (!name || !imageUrl || !type || !age || !ethinicity || !eyeColor) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const input = {
        imageUrl,
        type,
        age: parseInt(age ?? "0"),
        ethinicity,
        eyeColor,
        bald,
        name,
      };

      const token = await getToken();
      await axios.post(`${BACKEND_URL}/ai/training`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Model training started successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to start model training");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-[600px] bg-background/50 backdrop-blur-sm border border-gray-200/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Model</CardTitle>
          <CardDescription>Train your custom AI model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your model"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ethnicity">Ethnicity</Label>
              <Select value={ethinicity} onValueChange={setEthinicity}>
                <SelectTrigger id="ethnicity">
                  <SelectValue placeholder="Select ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian American</SelectItem>
                  <SelectItem value="East_Asian">East Asian</SelectItem>
                  <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eyeColor">Eye Color</Label>
              <Select value={eyeColor} onValueChange={setEyeColor}>
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

            <div className="flex items-center justify-between">
              <Label htmlFor="bald">Bald</Label>
              <Switch
                id="bald"
                checked={bald}
                onCheckedChange={setBald}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Images</Label>
              <FileUpload onChange={handleFileUpload} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button
            onClick={trainModal}
            disabled={isLoading || !name || !imageUrl || !type || !age || !ethinicity || !eyeColor}
          >
            {isLoading ? "Creating..." : "Create Model"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
