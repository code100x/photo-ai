"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Wand2, Download } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-6 h-6" />,
    title: "Upload Your Photo",
    description: "Start by uploading any portrait photo you'd like to enhance",
  },
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: "AI Magic",
    description:
      "Our advanced AI transforms your photo into stunning portraits",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Download & Share",
    description: "Get your enhanced portraits in multiple styles instantly",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          How It{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Works
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your photos into stunning AI-powered portraits in three
          simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />
            <div className="relative space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black/10 dark:border-white/10">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold  text-primary">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
