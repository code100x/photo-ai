import { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ImagePlus } from 'lucide-react'

export function UploadModal({
  handleUpload,
  uploadProgress,
  isUploading,
}: {
  handleUpload: (files: File[]) => void;
  uploadProgress: number;
  isUploading: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
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
    if (files.length) await handleUpload(files);
  }, []);

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader className="p-0 pb-4 text-sm">
        <CardTitle>
          Upload Modal Images
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-zinc-100/10 rounded-xl">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center",
            isDragging
              ? "border-emerald-500 bg-emerald-100"
              : "border-muted-foreground hover:border-emerald-400",
            isUploading && "pointer-events-none opacity-80"
          )}
        >
          {isUploading ? (
            <div className="w-full max-w-sm space-y-3">
              <Progress value={uploadProgress} className="h-2 w-full" />
              <p className="text-xs text-neutral-500">
                {uploadProgress < 50 ? "Preparing files..." : "Uploading..."}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Button
                variant="outline"
                size="icon"
                className="relative group/button dark:bg-white p-4 h-12 w-12 [&_svg]:size-6 rounded-xl"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = true;
                  input.onchange = async () => {
                    if (input.files?.length)
                      await handleUpload(Array.from(input.files));
                  };
                  input.click();
                }}
              >
                <ImagePlus className="text-gray-500/90" />
              </Button>
              <p className="text-zinc-600 dark:text-zinc-200">
                <span className="">Drop your files here</span> or
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                <span className="">Click to browse</span> / PNG, JPG, GIF
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
