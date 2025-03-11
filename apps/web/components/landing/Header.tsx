"use client";

import { SignInButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

// think if putting dashboard button if user is signed in

export function Header() {
  return (
			<>
			<div className="flex flex-col items-center space-y-2 px-4 md:text-center">
				<h1 className="text-[4rem] italic tracking-wide font-serif">Transform your photos with photo.ai</h1>

				<p className="md:w-2/3 text-gray-400 font-bold tracking-tight md:text-center">
					Photo.AI transforms your ideas into breathtaking, high-quality images effortlessly powered by AI, designed for limitless creativity.
				</p>
			</div>

			<div className="flex flex-col items-center space-y-4 px-4 md:mt-12">
				<SignedOut>
					<SignInButton mode="modal">
						<Button
							className="bg-gradient-to-l from-[#6A6A6A] via-[#8559a5] h-14 w-48 font-bold border-4 backdrop-blur-md text-md text-white cursor-pointer rounded-3xl to-[#6db193]"
							size="lg"
						>
							<PlayIcon className="ml-2" />
							Generate now
						</Button>
					</SignInButton>
				</SignedOut>
			</div>
		</>

  );
}
