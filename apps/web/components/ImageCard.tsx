import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "./ui/skeleton";


export interface TImage {
    id: string;
    status: string;
    imageUrl: string;
  }
  

export const ImageCard = React.memo(
  function ImageCard({
    id,
    status,
    imageUrl,
    index,
    hovered,
    setHovered,
  }: TImage & {
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) {
    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        <img src={imageUrl} alt={`Image ${id}`} className="absolute inset-0 w-full h-full object-cover" />

        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-white">Status: {status}</div>
        </div>
      </div>
    );
  }
);


export function ImageCardSkeleton() {
  return (
    <div className="rounded-xl border-2 max-w-[400px] p-2 cursor-pointer w-full">
      <div className="flex p-4 gap-4">
        <Skeleton className="rounded h-40 w-[300px]" />
      </div>
    </div>
  );
}
