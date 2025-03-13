"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const Appbar = () => {
	return (
		<div className="flex items-center justify-between px-4 md:px-20 py-8">
			<h1 className="text-2xl font-serif">100xphoto.ai</h1>

			<div className="flex justify-evenly items-center gap-8">
				<SignedOut>
					<Link href="/pricing">Pricing</Link>
					<SignInButton mode="modal">
						Signin
					</SignInButton>
				</SignedOut>

				{/* <Separator orientation="vertical" /> */}

				<SignedIn>
					<UserButton />
				</SignedIn>

				<ThemeToggle />
			</div>
		</div>
	)
}
