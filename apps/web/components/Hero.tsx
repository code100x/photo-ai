"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ImageSlider from "./ui/ImageAnimation"; 

export function Hero() {
  const router = useRouter();
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0">
        <ImageSlider />
      </div>
      <div className="relative z-10">
        <h1 className="text-6xl top-8 font-sans font-bold text-blue-50">
          Generate Images for Yourself
        </h1>

        <div className="pt-20 flex justify-center space-x-4">
          <SignedIn>
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-[#2457DB] hover:bg-[#4A88EF] transition-all duration-300 text-xl text-gray-200 px-8 py-6 rounded-sm animate-slide-in"
              size={"lg"}
              variant={"secondary"}
            >
              Get Started
            </Button>
          </SignedIn>
          <SignedOut>
            <Button className="px-16 py-6" size={"lg"} variant={"secondary"}>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
