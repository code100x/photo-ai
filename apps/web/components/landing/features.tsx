import { features } from "@/constants/data";
import { Medal } from "@phosphor-icons/react/dist/ssr";

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
              className="flex relative group overflow-hidden transition-all duration-500 border-2 bg-accet/10 dark:bg-accent/50 border-accent flex-col items-start justify-between p-10 w-full h-[25rem] rounded-3xl"
            >
              <div className="flex items-center justify-center size-16 bg-gradient-to-br from-primary via-primary/80 to-primary/50 rounded-xl">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
              <div className="transition-all duration-700 group-hover:block hidden bottom-[-10rem] md:bottom-[-10rem] right-[0%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-purple-900/20 blur-[8em] rounded-xl  ease-out size-[12rem] dark:md:size-[25rem] "></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
