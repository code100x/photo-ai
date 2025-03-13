"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { brands } from "./data";

export function TrustedBy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-center space-y-8"
    >
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
        Trusted by leading brands
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 * index }}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
