"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "./data";

export function Testimonials() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="mt-32"
    >
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Loved by Creators
      </h2>
      <p className="text-muted-foreground text-center mb-12 text-lg">
        Join thousands of satisfied users who have transformed their portraits
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm relative border border-muted-foreground/10 group dark:hover:bg-white/10 hover:bg-pink-50 transition-all duration-300"
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
            <p className="text-accent-foreground/60 mb-4 mt-6">{testimonial.text}</p>
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
  );
}
