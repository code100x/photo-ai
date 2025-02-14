import { features } from "@/constants/data";
import { ArrowUpRight, Medal } from "@phosphor-icons/react/dist/ssr";
import { FlickeringGrid } from "../magicui/flickering-grid";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Cube } from "@phosphor-icons/react/dist/ssr";

export default function Features() {
  return (
    <>
      <section className="flex flex-col items-center w-full max-w-7xl px-4 mx-auto">
        <div className="flex flex-col items-center py-4 mb-8 w-full h-60 ">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm bg-accent/30 w-fit border-accent border-2 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Medal weight="fill" className="size-4" />
              Features
            </h2>
            <div className="text-3xl md:text-5xl text-center font-semibold">
              Benefits of using
              <br />{" "}
              <span className="bg-gradient-to-br from-primary via-purple-400 to-purple-100 text-transparent bg-clip-text">
                <span className="font-secondary">PhotoAI</span>
              </span>
            </div>
          </div>
          <p className="text-center text-sm mt-4">
            PhotoAI is a platform that allows you to create stunning images
            using
            <br className="md:block hidden" />
            AI and also let's you customize the images to your liking.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex relative group overflow-hidden transition-all duration-500 border-2 bg-accent/10 dark:bg-accent/50 border-accent flex-col items-start justify-between gap-4 p-6 md:p-10 w-full h-[25rem] rounded-3xl"
            >
              <FlickeringGrid
                className="absolute transition-all duration-500 group-hover:opacity-20  dark:group-hover:opacity-40 opacity-10 inset-0 z-0 size-full"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={800}
                width={800}
              />
              <div className="absolute top-[-23rem] z-[101] delay-100 rotate-45 left-[-6rem] group-hover:top-[15rem] group-hover:left-[44rem] transition-all blur-[3em] duration-700 rounded-md h-[40rem] bg-white/50 opacity-30 w-[5rem] backdrop-blur-md"></div>
              <div className="flex flex-col gap-4 z-[40]">
                <div className="flex z-[40] items-center justify-center size-16 bg-gradient-to-br from-primary via-primary/80 to-primary/50 rounded-xl">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <div className="z-[40]">
                  <h3 className="text-2xl z-[40] md:text-3xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm mt-2 z-[40] text-neutral-500 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
              <Badge className="z-[40] transition-all p-2 rounded-lg px-4 duration-500 cursor-pointer hover:bg-muted/80 text-foreground bg-accent">
                {feature.badgeText}{" "}
                <Cube weight="fill" className="ml-2 size-4" />
              </Badge>
              <div className="transition-all duration-700 opacity-0 group-hover:opacity-100 bottom-[-10rem] md:bottom-[-10rem] right-[0%] z-[-1] absolute bg-gradient-to-t  from-primary to-purple-900/20 blur-[8em] rounded-xl  ease-out size-[12rem] dark:md:size-[25rem] "></div>
              <div className="transition-all duration-700 opacity-0 group-hover:opacity-100 top-[-10rem] md:top-[-10rem] left-[-20%] z-[10] absolute bg-gradient-to-t  from-background to-background/90 blur-[4em] rounded-full ease-out size-[12rem] dark:md:size-[30rem] "></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
