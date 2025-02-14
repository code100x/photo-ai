"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/10.jpg",
  "/11.jpg",
  "/12.jpg",
  "/13.jpg",
  "/14.jpg",
  "/15.jpg",
  "/16.jpg",
  "/17.jpg",
  "/18.jpg",
];

export default function BackgroundSlider() {
  return (
    <div className="absolute inset-0 overflow-hidden">
        
      <motion.div
        className="grid grid-cols-6 grid-rows-4 gap-8 absolute inset-0" // Creates the grid effect
        initial={{ x: "100%", y: "100%" }} // Starts from bottom-right
        animate={{ x: "-100%", y: "-100%" }} // Moves to top-left
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed
        }}
      >
        {/* Repeat images to fill grid */}
        {images.concat(images).map((src, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              src={src}
              alt={`Slide ${index}`}
              layout="fill"
              objectFit="cover"
              className="opacity-50 blur-sm"
              priority
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
