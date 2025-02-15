"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Camera,
  Wand2,
  Users,
  Star,
  Clock,
  CheckCircle2,
  Zap,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

export function Hero() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Professional Quality",
      description: "Studio-grade portraits generated in seconds",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Magic Editing",
      description: "Advanced AI tools to perfect every detail",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Collections",
      description: "Create stunning portraits for the whole family",
      gradient: "from-pink-500 to-red-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Delivery",
      description: "Get your photos in minutes, not days",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const testimonials = [
    {
      text: "The quality of these AI portraits is absolutely incredible. They look better than my professional headshots!",
      author: "Sarah J.",
      role: "Marketing Director",
      avatar:
        "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png",
    },
    {
      text: "We used this for our family portraits and the results were stunning. So much easier than a traditional photoshoot.",
      author: "Michael R.",
      role: "Family of 5",
      avatar:
        "https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png",
    },
    {
      text: "Game-changer for my professional brand. The variety of styles and quick delivery is unmatched.",
      author: "David L.",
      role: "Entrepreneur",
      avatar:
        "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium flex items-center gap-2 border border-purple-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Next-Gen AI Portrait Generation
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="px-4 py-2 rounded-full bg-pink-500/10 text-pink-300 text-sm font-medium flex items-center gap-2 border border-pink-500/20"
            >
              <Zap className="w-4 h-4" />
              Powered by Advanced AI
            </motion.span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal  bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 leading-tight">
            Transform Your Photos
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Into Magic
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the next evolution in portrait photography. Create
            stunning, professional-quality portraits that capture your essence
            in seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              100% AI-Powered
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Instant Results
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Professional Quality
            </motion.div>
          </div>
        </motion.div>

        {/* Main CTA and Carousel Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12"
        >
          <div className="flex justify-center mb-12">
            <SignedIn>
              <Button
                onClick={() => router.push("/dashboard")}
                className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Go to Dashboard
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignedIn>
            <SignedOut>
              <Button
                asChild
                className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <SignInButton>
                  <span className="flex items-center">
                    Start Creating Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </SignInButton>
              </Button>
            </SignedOut>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="embla w-full max-w-6xl mx-auto">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {[
                    "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png",
                    "https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png",
                    "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png",
                    "https://r2-us-west.photoai.com/1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png",
                    "https://r2-us-west.photoai.com/1738859038-086cec35785b734c68f99cab1f23d5a2-3.png",
                    "https://r2-us-west.photoai.com/1738859049-0c3f5f8cbb13210cf7bb1e356fd5a30a-3.png",
                  ].map((src, index) => (
                    <div className="embla__slide pl-4" key={index}>
                      <div className="embla__slide__inner">
                        <motion.div
                          whileHover={{ scale: 1.05, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-2xl group"
                        >
                          <img
                            src={src}
                            alt={`AI Generated Portrait ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-white font-medium mb-1">
                                Portrait Style {index + 1}
                              </p>
                              <p className="text-gray-300 text-sm">
                                Professional Grade Output
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  <ArrowRight className="w-6 h-6 rotate-180" />
                </motion.button>
                <div className="flex gap-2">
                  {scrollSnaps.map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === selectedIndex
                          ? "bg-white scale-125"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      onClick={() => emblaApi?.scrollTo(i)}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => emblaApi?.scrollNext()}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Loved by Creators
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Join thousands of satisfied users who have transformed their
            portraits
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm relative border border-white/10 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute -top-6 left-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <Star className="absolute top-4 right-4 text-yellow-500 w-6 h-6" />
                <p className="text-gray-300 mb-4 mt-6">{testimonial.text}</p>
                <div>
                  <p className="font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-32 text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 blur-3xl -z-10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Ready to Transform Your Photos?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of portrait photography. Create stunning,
            professional portraits in seconds.
          </p>
          <SignedOut>
            <Button
              asChild
              className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <SignInButton>
                <span className="flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </SignInButton>
            </Button>
          </SignedOut>
        </motion.div>
      </div>
    </div>
  );
}
