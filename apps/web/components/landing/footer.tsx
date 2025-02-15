import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <>
      <footer className="w-full border-t-2 h-[14rem] md:h-[20rem] overflow-hidden relative border-accent py-10">
        <div className="flex flex-col items-center justify-center w-full gap-4 ">
          <div className="text-xl flex items-center gap-2">
            <div className="flex items-center bg-primary rounded-lg mr-1 p-2">
              <Sparkle weight="fill" className="size-5 text-white" />
            </div>
            <span className="font-secondary tracking-wider font-semibold">
              PhotoAI
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold">PhotoAI</span>. All rights
              reserved.
            </p>
          </div>
        </div>

        <div className="absolute bottom-[-4.5rem] md:bottom-[-10rem] opacity-100 md:opacity-40 left-1/2 -translate-x-1/2 text-[8rem] md:text-[20rem] font-extrabold text-muted-foreground/30 dark:text-accent font-secondary">
          PhotoAI
        </div>
      </footer>
    </>
  );
}
