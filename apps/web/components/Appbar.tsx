import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { Button } from './ui/button'

export function Appbar() {
    return <div className='sticky top-0 flex w-full justify-between mx-auto bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 p-6 ' style={{ opacity: 1}} >
        <div className='text-xl'>
            PhotoAI
        </div>
        <div>
            <SignedOut>
                <Button variant={"ghost"}>
                    <SignInButton />
                </Button>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
}