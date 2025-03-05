"use client";

import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard, ImageCardSkeleton } from "./ImageCard";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TImage {
  id: string;
  imageUrl: string;
  modelId: string;
  userId: string;
  prompt: string;
  falAiRequestId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function Camera() {
  const [images, setImages] = useState<TImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<TImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const pollImages = async () => {
      if (images.find((x) => x.status !== "Generated")) {
        await new Promise((r) => setTimeout(r, 5000));
        await fetchImages();
      }
    };
    pollImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const fetchImages = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(response.data.images);
      setImagesLoading(false);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setImagesLoading(false);
    }
  };

  const handleImageClick = (image: TImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleDownload = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${imageName}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex] ?? null);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
      setSelectedImage(images[currentImageIndex + 1] ?? null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Gallery</h2>
        <span className="text-xs select-none bg-secondary/40 font-semibold border border-secondary text-muted-foreground px-2 py-1 rounded-full">
          {images.length} images
        </span>
      </div>

      <motion.div
        className="columns-1 md:columns-3 lg:columns-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {imagesLoading
          ? [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <ImageCardSkeleton />
              </motion.div>
            ))
          : images.map((image, index) => (
              <div
                key={image.id}
                className="cursor-pointer transition-transform mb-4 hover:scale-[1.02]"
                onClick={() => handleImageClick(image, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleImageClick(image, index);
                  }
                }}
              >
                <ImageCard
                  title={image.prompt}
                  id={image.id}
                  imageUrl={image.imageUrl}
                  status={image.status}
                />
              </div>
            ))}
      </motion.div>

      {!imagesLoading && images.length === 0 && (
        <div className="text-center py-12 bg-secondary/10 rounded-lg border border-secondary/50">
          <p className="text-muted-foreground text-sm font-semibold">
            No images yet. Start by generating some!
          </p>
        </div>
      )}

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-7xl w-[95vw] p-6 bg-background backdrop-blur rounded-none">
          <DialogHeader className="mb-4 rounded-none">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {selectedImage?.prompt}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Generated on{" "}
              {selectedImage?.createdAt
                ? new Date(selectedImage.createdAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="relative w-full h-[70vh] overflow-hidden bg-muted">
            {selectedImage && (
              <div className="group relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.prompt || "Generated image"}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-[1.02]"
                  priority
                  sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 75vw"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentImageIndex === 0}
                className="hover:bg-muted/80"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentImageIndex === images.length - 1}
                className="hover:bg-muted/80"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {currentImageIndex + 1} of {images.length}
              </span>
              <Button
                variant="custom"
                onClick={() =>
                  selectedImage &&
                  handleDownload(
                    selectedImage.imageUrl,
                    selectedImage.prompt || "generated-image"
                  )
                }
                className="cusror-pointer"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="hover:bg-muted/80"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
