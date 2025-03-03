"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function HeroHeader() {
  const router = useRouter();

  return (
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
          className="px-4 py-2 rounded-full dark:bg-purple-500/10 dark:text-purple-300 text-sm font-medium flex items-center gap-2 border dark:border-purple-600/20 bg-purple-600/10 text-purple-500 border-purple-700/20"
        >
          <Sparkles className="w-4 h-4" />
          Next-Gen AI Portrait Generation
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="px-4 py-2 rounded-full dark:bg-pink-500/10 dark:text-pink-300 text-sm font-medium flex items-center gap-2 border dark:border-pink-600/20 bg-pink-600/10 text-pink-500 border-pink-700/20"
        >
          <Zap className="w-4 h-4" />
          Powered by 100xDevs
        </motion.span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
        Transform Your Photos with{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          AI Magic
        </span>
      </h1>

      <div className="flex items-center justify-center gap-4">
        <SignedOut>
          <Button
            asChild
            className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <SignInButton mode="modal">
              <span className="flex items-center">
                Start Creating Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            onClick={() => router.push("/dashboard")}
            className="group relative px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </SignedIn>
      </div>
    </motion.div>
  );
}
