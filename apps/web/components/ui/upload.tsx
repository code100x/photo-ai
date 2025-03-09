"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UploadModal({
  handleUpload,
  uploadProgress,
  isUploading,
}: Readonly<{
  handleUpload: (files: File[]) => void;
  uploadProgress: number;
  isUploading: boolean;
}>) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: File[]): boolean => {
    setError(null);
    
    for (const file of files) {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setError("Please upload only PNG, JPG, or GIF files.");
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("Files must be smaller than 10MB.");
        return false;
      }
    }
    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length && validateFiles(files)) {
      try {
        handleUpload(files);
      } catch (_) {
        setError("Failed to upload files. Please try again.");
      }
    }
  }, [handleUpload]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    if (fileArray.length && validateFiles(fileArray)) {
      try {
        handleUpload(fileArray);
      } catch (_) {
        setError("Failed to upload files. Please try again.");
      }
    }
  }, [handleUpload]);

  return (
    <Card className="w-full rounded-none border-none mx-auto shadow-none">
      <CardHeader className="border-b pb-4 px-0">
        <CardTitle className="md:text-xl text-lg font-semibold text-emerald-500">
          Upload Modal Images
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Supports multiple images upload (PNG, JPG, GIF up to 10MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 px-0">
        <section
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-all",
            isDragging
              ? "border-emerald-500 bg-emerald-100"
              : "border-muted-foreground hover:border-emerald-400",
            isUploading && "pointer-events-none opacity-80"
          )}
          aria-label="File upload dropzone"
        >
          <CloudUploadIcon className="w-16 h-16 text-neutral-400" aria-hidden="true" />

          {isUploading ? (
            <div className="w-full max-w-sm space-y-3 text-center">
              <progress 
                value={uploadProgress} 
                max={100}
                className="h-2 w-full" 
                aria-label="Upload progress"
              />
              <p className="text-xs text-neutral-500">
                {uploadProgress < 50 ? "Preparing files..." : "Uploading..."}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-neutral-500">
                <span className="font-medium">Drag and drop files here</span> or
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = ACCEPTED_FILE_TYPES.join(",");
                  input.multiple = true;
                  input.setAttribute("aria-label", "Choose files to upload");
                  input.onchange = () => {
                    if (input.files?.length) handleFileSelect(input.files);
                  };
                  input.click();
                }}
              >
                Browse Files
              </Button>
              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}
              <p className="text-xs text-neutral-500">
                Maximum file size: 10MB
              </p>
            </div>
          )}
        </section>
      </CardContent>
    </Card>
  );
}

function CloudUploadIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
