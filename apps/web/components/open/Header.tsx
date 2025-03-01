"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl font-bold text-foreground text-center mb-12 "
    >
      {children}
    </motion.h1>
  );
};

export default Header;
