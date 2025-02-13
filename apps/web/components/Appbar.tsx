import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Appbar() {
  return (
    <div className="flex justify-between p-4 border-b">
      <div className="text-2xl font-bold"><span className="text-blue-500 ">
        100x</span>
        PhotoAI</div>
      <div>
        <SignedOut>
          <Button className="bg-blue-500" asChild>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
