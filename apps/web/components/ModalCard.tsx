"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthorCardProps {
  className?: string;
  backgroundImage?: string;

  content?: {
    title?: string;
    description?: string;
  };
  onclick?: () => void;
}

export const ModalCard = ({
  className,
  backgroundImage,
  content,
  onclick,
}: AuthorCardProps) => {
  return (
    <div onClick={onclick} className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4 bg-cover",
          className
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60" />
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {content?.title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {content?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
