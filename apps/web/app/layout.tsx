import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Appbar } from "@/components/Appbar";
import { Providers } from "@/components/providers/Providers";
import Footer from "@/components/landing/footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

const instrumental_serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrumental-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "100xPhoto - AI-Powered Photo Enhancement",
  description:
    "Transform your photos with AI-powered enhancement and editing tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
          defer
        />
      </head>
      <body
        className={`${manrope.variable} ${instrumental_serif.variable} min-h-screen bg-background font-sans antialiased`}
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
