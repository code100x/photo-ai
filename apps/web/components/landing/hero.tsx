"use client";
import {
  ArrowRight,
  Cube,
  CubeFocus,
  Robot,
  Rocket,
  RocketLaunch,
  ShootingStar,
  Sliders,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import ImgIllustration from "./illustrations/img-illustration";
import { Badge } from "../ui/badge";
import RotatingPeople from "./illustrations/rotating-people";
import AvatarComponent from "./illustrations/avatar-component";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <>
      <section className="min-h-[43rem] px-4 md:px-0 relative overflow-y-hidden max-h-fit">
        <div className="flex items-center justify-start py-20 flex-col  w-full h-full">
          <Badge
            variant={"outline"}
            className="bg-primary/10 dark:bg-primary/20 py-1 rounded-full"
          >
            <ShootingStar weight="fill" className="size-5 mr-1" /> Next-Gen AI
            Portrait Generation
          </Badge>
          <div className="text-5xl md:text-6xl lg:text-7xl text-center font-semibold flex flex-col items-center w-full">
            <div className="flex lg:flex-row flex-col items-center gap-2">
              Transform any
              <div className=" mx-2 flex items-center gap-2 font-medium">
                <ImgIllustration />
                <span className="font-semibold">photo</span>
              </div>{" "}
            </div>
            <p className="">
              into{" "}
              <span className="font-secondary font-semibold bg-gradient-to-br from-primary to-purple-200 text-transparent bg-clip-text">
                Magic
              </span>{" "}
              with AI
            </p>
          </div>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mt-6">
            Experience the{" "}
            <span className="text-neutral-700 dark:text-neutral-200 font-semibold">
              next evolution
            </span>{" "}
            in portrait photography.
            <br />
            Create stunning,{" "}
            <span className="text-neutral-700 dark:text-neutral-200 font-semibold">
              professional-quality
            </span>{" "}
            portraits that capture your essence in{" "}
            <span className="text-neutral-700 dark:text-neutral-200 font-semibold">
              seconds
            </span>
            .
          </p>
          <div className="flex mt-8 items-center justify-center gap-4">
            <SignedIn>
              <Button
                onClick={() => router.push("/dashboard")}
                className="h-12 max-w-fit px-4 hover:ring-4 hover:ring-primary/40 transition-all duration-500 cursor-pointer min-w-38 text-base"
              >
                Go to Dashboard <RocketLaunch weight="fill" />
              </Button>
            </SignedIn>
            <SignedOut>
              <Button className="h-12 hover:ring-4 hover:ring-primary/40 transition-all duration-500 cursor-pointer w-38 text-base">
                Get Started <RocketLaunch weight="fill" />
              </Button>
            </SignedOut>

            <Button
              variant={"outline"}
              className="h-12 hover:ring-4 hover:ring-accent/80 transition-all duration-500 cursor-pointer border-border w-38 text-base"
            >
              Learn More <ArrowRight weight="bold" />
            </Button>
          </div>
          <AvatarComponent />

          <div className="overflow-hidden flex items-start justify-center w-full relative">
            <RotatingPeople />

            <div className="bg-muted/30 border-[4px] border-white/60 dark:border-white/10 backdrop-blur-xl flex items-center justify-center absolute p-6 -bottom-[128px] left-1/2 -translate-x-1/2 size-[24rem] rounded-full">
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl font-secondary w-full h-full text-foreground flex flex-col py-14 gap-4 items-center font-semibold text-6xl rounded-full">
                <div className="flex items-center shadow-lg shadow-primary bg-primary p-4 rounded-xl w-fit gap-2">
                  <Sparkle weight="fill" className="size-10 text-white" />
                </div>
                <span>PhotoAI</span>
              </div>
            </div>
            <div className="bottom-[-10rem] md:bottom-[-10rem] left-[50%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-purple-900/20 blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out size-[25rem] "></div>
          </div>

          <div className=" flex flex-wrap items-center mt-20 justify-center gap-4">
            <div className="lg:absolute border bg-accent/40 backdrop-blur-lg flex items-center justify-center gap-2 font-semibold rounded-full px-3 py-1 w-fit h-fit lg:-rotate-12 top-[15rem] left-[10rem]">
              <CubeFocus
                weight="fill"
                className="size-5 md:size-8 text-primary"
              />
              <span>Top Quality</span>
            </div>
            <div className="lg:absolute border bg-accent/40 backdrop-blur-lg flex items-center justify-center gap-2 font-semibold rounded-full px-3 py-1 w-fit h-fit lg:rotate-12 top-[27rem] left-[20rem]">
              <Robot weight="fill" className="size-5 md:size-8 text-primary" />
              <span>AI-Powered</span>
            </div>
            <div className="lg:absolute border bg-accent/40 backdrop-blur-lg flex items-center justify-center gap-2 font-semibold rounded-full px-3 py-1 w-fit h-fit lg:rotate-12 top-[15rem] right-[10rem]">
              <Sliders
                weight="fill"
                className="size-5 md:size-8 text-primary"
              />
              <span>Customizable</span>
            </div>
            <div className="lg:absolute border bg-accent/40 backdrop-blur-lg flex items-center justify-center gap-2 font-semibold rounded-full px-3 py-1 w-fit h-fit lg:-rotate-12 top-[27rem] right-[20rem]">
              <Cube weight="fill" className="size-5 md:size-8 text-primary" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
