"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
const Heading: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className || ""}
    >
      {children}
    </motion.h1>
  );
};

export default Heading;
