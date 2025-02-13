"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function Hero() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl">
        <h1 className="text-8xl p-2 text-center pb-4">
          Generate Images for yourself and your family
        </h1>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/4">
              <Image
                alt="harkirat image"
                height={400}
                width={400}
                src={
                  "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png"
                }
              />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <Image
                alt="harkirat image"
                height={400}
                width={400}
                src={
                  "https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png"
                }
              />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <Image
                alt="harkirat image"
                height={400}
                width={400}
                src={
                  "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png"
                }
              />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <Image
                alt="harkirat image"
                height={400}
                width={400}
                src={
                  "https://r2-us-west.photoai.com/1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png"
                }
              />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <Image
                alt="harkirat image"
                height={400}
                width={400}
                src={
                  "https://r2-us-west.photoai.com/1738859038-086cec35785b734c68f99cab1f23d5a2-3.png"
                }
              />
            </CarouselItem>
            <CarouselItem className="basis-1/4">
              <Image
                alt="harkirat image"
                height={400}
                width={400}
                src={
                  "https://r2-us-west.photoai.com/1738859049-0c3f5f8cbb13210cf7bb1e356fd5a30a-3.png"
                }
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex justify-center">
          <SignedIn>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="mt-4 px-16 py-6"
              size={"lg"}
              variant={"secondary"}
            >
              Dashboard
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              className="mt-4 px-16 py-6"
              size={"lg"}
              variant={"secondary"}
              asChild
            >
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
