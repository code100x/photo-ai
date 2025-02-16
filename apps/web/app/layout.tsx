import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Appbar } from "@/components/Appbar";
import { Providers } from "@/components/providers/Providers";
import { Footer } from "@/components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "100xPhoto - AI-Powered Photo Enhancement",
  description:
    "Transform your photos with AI-powered enhancement and editing tools.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
          defer
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Appbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
