import React from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function RotatingPeople({ className }: { className?: string }) {
  const profiles = [
    "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png",
    "https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png",
    "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png",
    "https://r2-us-west.photoai.com/1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png",
    "https://r2-us-west.photoai.com/1738859038-086cec35785b734c68f99cab1f23d5a2-3.png",
    "https://r2-us-west.photoai.com/1738859049-0c3f5f8cbb13210cf7bb1e356fd5a30a-3.png",
    "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png",
    "https://r2-us-west.photoai.com/1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png",
  ];

  return (
    <div className="flex mt-[50rem] relative">
      <div className="h-full rotate-circle">
        {profiles.map((profile, index) => {
          const angle = (index * 360) / profiles.length;
          const radius = 550; // Adjust this value to change the circle size
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={index}
              className={cn(
                "absolute !w-52 hover:scale-110  transition-all duration-700 aspect-square transform -translate-x-1/2 -translate-y-1/2",
                index % 2 === 0 ? "hover:rotate-6" : "hover:-rotate-6"
              )}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              <div className="counter-rotate">
                <Image
                  src={profile}
                  width={800}
                  height={800}
                  alt={`Profile ${profile}`}
                  className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
