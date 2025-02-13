import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ToggleTheme from "./ToggleTheme";

export function Appbar() {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-[50%] md:w-full w-[90%] flex justify-between z-[500] bg-accent/30 backdrop-blur-xs  items-center max-w-5xl mx-auto p-3 border rounded-2xl">
      <h2 className="text-lg font-semibold">PhotoAI</h2>
      <div>
        <SignedOut>
          <div className="flex items-center flex-row space-x-3">
            <ToggleTheme />
            <Button variant={"default"} asChild>
              <SignInButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
