import Link from 'next/link'

export function Footer() {
	return (
		<footer className="h-96 bg-neutral-800 dark:bg-neutral-100 p-4 rounded-3xl">
			<div className="flex flex-col rounded-2xl items-center min-h-full justify-center">
				<h1 className="text-[2.5rem] italic font-serif text-white dark:text-black">
					Just upload & Enjoy.
				</h1>

				<div className="flex items-center text-white dark:text-black space-x-6 pt-10">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} PhotoAI. All rights reserved.
					</p>

					<div className="flex gap-4">
						<Link
							href="/"
							className="text-xs text-muted-foreground hover:underline underline-offset-4"
						>
							Privacy Policy
						</Link>
						<Link
							href="/"
							className="text-xs text-muted-foreground hover:underline underline-offset-4"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

