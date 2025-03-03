"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import { carouselImages } from "./data";
import Image from "next/image";

export function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative py-12">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 -left-32 top-0 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute w-64 h-64 -right-32 top-0 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute w-64 h-64 left-1/2 -translate-x-1/2 bottom-0 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: selectedIndex === index ? 1.05 : 0.95,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={
                      typeof image === "object" && "url" in image
                        ? image.url
                        : ""
                    }
                    alt={
                      typeof image === "object" && "title" in image
                        ? image.title
                        : ""
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 30vw"
                    priority={index < 2}
                  />

                  <motion.div
                    className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-200">
                          {typeof image === "object" && "style" in image
                            ? image.style
                            : ""}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {typeof image === "object" && "title" in image
                          ? image.title
                          : ""}
                      </h3>
                      <p className="text-sm text-neutral-200">
                        {typeof image === "object" && "description" in image
                          ? image.description
                          : ""}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-neutral-100/60 hover:bg-neutral-200/60 backdrop-blur-sm transition-colors border border-neutral-200/60 text-neutral-700"
            onClick={scrollPrev}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-3">
            {scrollSnaps.map((_, i) => (
              <motion.button
          key={i}
          className="group relative"
          onClick={() => scrollTo(i)}
              >
          <div className="w-12 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
            {i === selectedIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                layoutId="activeSlide"
                transition={{
            type: "spring",
            bounce: 0.2,
                }}
              />
            )}
          </div>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-neutral-100/60 hover:bg-neutral-200/60 backdrop-blur-sm transition-colors border border-neutral-200/60 text-neutral-700"
            onClick={scrollNext}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
