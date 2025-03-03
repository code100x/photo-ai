"use client";
import JSZip from "jszip";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, CLOUDFLARE_URL } from "@/app/config";
import { useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function UploadModal({
  onUploadDone,
}: {
  onUploadDone: (zipUrl: string, fileNames: string[]) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    await handleUpload(files);
  }, []);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const zip = new JSZip();
      const res = await axios.get(`${BACKEND_URL}/pre-signed-url`);
      const url = res.data.url;
      const key = res.data.key;

      const fileNames: string[] = [];
      for (const file of files) {
        const content = await file.arrayBuffer();
        zip.file(file.name, content);
        fileNames.push(file.name);
        setUploadProgress((prev) => Math.min(prev + 50 / files.length, 50));
      }

      const content = await zip.generateAsync({ type: "blob" });
      const formData = new FormData();
      formData.append("file", content);

      await axios.put(url, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 50) / progressEvent.total!
          );
          setUploadProgress(50 + percentCompleted);
        },
      });

      onUploadDone(`${CLOUDFLARE_URL}/${key}`, fileNames);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader className="text-center pb-6 border-b dark:border-zinc-800">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Upload Your Files
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Support for multiple files upload
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8 px-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center",
            "border-2 border-dashed rounded-xl",
            "p-12 md:p-16",
            "transition-all duration-200 ease-in-out",
            "group",
            isDragging
              ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
              : "border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-700",
            isUploading && "pointer-events-none opacity-80"
          )}
        >
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

          <CloudUploadIcon
            className={cn(
              "w-20 h-20 mb-6",
              "transition-all duration-200 ease-in-out",
              "group-hover:scale-110 group-hover:text-blue-500",
              isDragging
                ? "text-blue-500 scale-110"
                : "text-zinc-400 dark:text-zinc-600"
            )}
          />

          {isUploading ? (
            <div className="w-full max-w-sm space-y-4">
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2 w-full" />
                <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                  <span>
                    {uploadProgress < 50
                      ? "Preparing files..."
                      : "Uploading..."}
                  </span>
                  <span className="font-medium">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                Please don't close this window while uploading
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className="space-y-2">
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium">Drop your files here</span> or
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative group/button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.multiple = true;
                    input.onchange = async () => {
                      if (!input.files?.length) return;
                      await handleUpload(Array.from(input.files));
                    };
                    input.click();
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Browse Files
                  </span>
                </Button>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Supported formats: PNG, JPG, GIF
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}