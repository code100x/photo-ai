"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
        style={{
          scaleY: useScroll().scrollYProgress,
        }}
      />
    </motion.div>
  );
}
