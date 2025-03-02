"use client";

import { motion } from "framer-motion";
import { Camera, Wand2, Users, Clock } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";

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

export function Features() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {features.map((feature, index) => (
        <Tilt
          key={index}
          rotationFactor={6}
          isRevese
          style={{
            transformOrigin: 'center center',
          }}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          className='group relative rounded-lg overflow-hidden' // Ensure overflow-hidden
        >
          <Spotlight
            className='z-10 from-white/70 via-white/40 to-white/10 blur-[100px]' // Enhanced gradient and blur
            size={300} // Larger size for a more pronounced effect
            springOptions={{
              stiffness: 26.7,
              damping: 4.1,
              mass: 0.2,
            }}
          />
          <motion.div
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
        </Tilt>
      ))}
    </motion.div>
  );
}