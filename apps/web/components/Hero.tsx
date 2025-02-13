"use client";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl">
        <h1 className="text-6xl p-16 font-serif text-[#b3b3b4]  text-center pb-4 ">
          Generate Images for yourself
        </h1>
        {/* <Carousel>
                <CarouselContent>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max-[400px]" src={'https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png'} />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max-[400px]" src={'https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png'} />                    
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max-[400px]" src={'https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png'} />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max-[400px]" src={'https://r2-us-west.photoai.com/1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png'} />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max-[400px]" src={'https://r2-us-west.photoai.com/1738859038-086cec35785b734c68f99cab1f23d5a2-3.png'} />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max-[400px]" src={'https://r2-us-west.photoai.com/1738859049-0c3f5f8cbb13210cf7bb1e356fd5a30a-3.png'} />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}

        <div className=" pt-4 flex justify-center">
          <SignedIn>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="bg-[#2457DB]  hover:bg-[#4A88EF] transition-all duration-300 text-xl text-gray-200 dark: px-8 py-6 rounded-sm animate-slide-in"
              size={"lg"}
              variant={"secondary"}
            >
              Get Started
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              className="mt-4 px-16 py-6"
              size={"lg"}
              variant={"secondary"}
            >
              <SignInButton />
            </Button>
          </SignedOut>
        </div>

        <div className="pt-10 bottom-0">
            <img src="/group.png"></img>
        </div>
      </div>
    </div>
  );
}
