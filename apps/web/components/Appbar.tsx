"use client";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import { Button } from './ui/button'
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function Appbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='fixed top-0 left-0 right-0 flex w-full justify-between mx-auto bg-background/50 backdrop-blur-md border-b border-primary/10 p-4 md:p-6 z-[100]'
        >
            <motion.div 
                className='text-xl w-10 h-10 relative group cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300" />
                <Image 
                    src='/logo.png' 
                    alt="Logo"
                    width={40}
                    height={40}
                    className="relative rounded-full"
                />
            </motion.div>

            <div className='flex items-center gap-2 md:gap-4'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="relative p-2 rounded-full bg-background/50 border border-primary/10 backdrop-blur-md"
                >
                    {theme === 'dark' ? (
                        <Sun className="w-5 h-5 text-yellow-500 transition-all" />
                    ) : (
                        <Moon className="w-5 h-5 text-blue-500 transition-all" />
                    )}
                </motion.button>

                <SignedOut>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            variant="ghost"
                            className="relative"
                        >
                            <SignInButton />
                        </Button>
                    </motion.div>
                </SignedOut>
                <SignedIn>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10"
                                }
                            }}
                        />
                    </motion.div>
                </SignedIn>
            </div>
        </motion.div>
    )
}