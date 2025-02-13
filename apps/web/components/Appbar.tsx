import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export function Appbar() {
  return (
    <div className="flex justify-between p-4 border-b">
      <div className="text-xl">PhotoAI</div>
      <div>
        <SignedOut>
          <Button variant={"ghost"} asChild>
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
