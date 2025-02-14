"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ImageSlider from "./ui/ImageAnimation";
import { motion } from "framer-motion";

export function Hero() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 py-20">
      <div className="absolute inset-0 z-0">
        <ImageSlider />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 dark:from-blue-300 dark:via-purple-300 dark:to-indigo-400 font-sans tracking-tight">
            Generate Images
          </h1>
          <p className="mt-6 text-lg md:text-xl px-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 dark:from-blue-100 dark:via-purple-100 dark:to-indigo-200 font-light tracking-wide">
            Create stunning AI-powered images with just a few clicks.
            Your imagination is the only limit.
          </p>
        </motion.div>

        <motion.div 
          className="pt-12 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SignedIn>
            <Button
              onClick={() => router.push("/dashboard")}
              className="relative group overflow-hidden backdrop-blur-sm 
                text-xl px-8 py-6 rounded-lg
                bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50
                hover:from-blue-500/60 hover:via-purple-500/60 hover:to-indigo-500/60
                border border-white/20 transition-all duration-300
                shadow-[0_0_15px_rgba(59,130,246,0.2)]
                hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              size={"lg"}
            >
              <span className="relative z-10 text-white font-medium">Get Started</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </SignedIn>
          <SignedOut>
            <Button 
              className="relative group overflow-hidden backdrop-blur-sm 
                text-xl px-8 py-6 rounded-lg
                bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50
                hover:from-blue-500/60 hover:via-purple-500/60 hover:to-indigo-500/60
                border border-white/20 transition-all duration-300
                shadow-[0_0_15px_rgba(59,130,246,0.2)]
                hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              size={"lg"}
            >
              <span className="relative z-10 text-white font-medium">
                <SignInButton />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </SignedOut>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-800 dark:from-blue-200 dark:to-purple-200">
              Fast Generation
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-500 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-800 dark:from-purple-200 dark:to-indigo-200">
              High Quality
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-neutral-700 to-neutral-800 dark:from-indigo-200 dark:to-blue-200">
              Custom Models
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
