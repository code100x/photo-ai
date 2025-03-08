"use client";
import { dark } from '@clerk/themes'
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import axios from 'axios';

interface ProvidersProps {
  children: React.ReactNode;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider appearance={{ layout: { logoPlacement: "inside" }, baseTheme: dark }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster/>
      </ThemeProvider>
    </ClerkProvider>
  );
}
