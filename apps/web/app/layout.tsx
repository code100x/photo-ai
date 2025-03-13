import type { Metadata } from "next";
import { Inter, Instrument_Serif, Roboto } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { meta } from "@/lib/constants";
import Script from "next/script";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
   variable: "--font-inter",
   subsets: ["latin"],
   weight: "300" 
});

const instrumentSerif = Instrument_Serif({
   variable: "--font-instrument-serif",
   subsets: ["latin"],
   weight: "400" 
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <Script
          id="razorpay-checkout"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={cn("antialiased", inter.variable, instrumentSerif.variable)}>
        <Providers>
           <main className="relative">
	     {children}
	   </main>
        </Providers>
      </body>
    </html>
  );
}
