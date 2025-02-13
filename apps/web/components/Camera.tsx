"use client";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard, ImageCardSkeleton, TImage } from "./ImageCard";

export function Camera() {
  const [images, setImages] = useState<TImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data.images);
      setImagesLoading(false);
    })();
  }, [getToken]);

  useEffect(() => {
    (async () => {
      if (images.find((x) => x.status !== "Generated")) {
        await new Promise((r) => setTimeout(r, 5000));
        const token = await getToken();
        const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(response.data.images);
      }
    })();
  }, [getToken, images]);

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-2 pt-4">
      {images.map((image) => (
        <ImageCard key={image.id} {...image} />
      ))}
      {imagesLoading && (
        <>
          {" "}
          <ImageCardSkeleton></ImageCardSkeleton>
          <ImageCardSkeleton></ImageCardSkeleton>
          <ImageCardSkeleton></ImageCardSkeleton>{" "}
          <ImageCardSkeleton></ImageCardSkeleton>{" "}
          <ImageCardSkeleton></ImageCardSkeleton>
        </>
      )}
    </div>
  );
}
