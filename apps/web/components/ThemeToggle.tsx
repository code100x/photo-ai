"use client";

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../components/ui/button'

export function ThemeToggle() {
	const { setTheme } = useTheme()

	return (
		<Button variant="link" size="icon" onClick={() => setTheme(theme => theme === "light" ? "dark" : "light")}>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}

export function ThemeToggle2() {
	const { setTheme } = useTheme()

	return (
		<div className="p-2 w-full flex justify-between items-center gap-2">
			<Button variant="link" onClick={() => setTheme("light")} className="flex items-center justify-center bg-purple-400 dark:bg-transparent gap-2 text-white flex-1 p-1 rounded-lg hover:no-underline">
				<Sun className="h-[1rem] w-[1rem]" />
				<span>Light</span>
			</Button>
			<Button variant="link" onClick={() => setTheme("dark")} className="flex items-center justify-center gap-2 bg-transparent dark:bg-purple-400 dark:text-white flex-1 p-1 rounded-lg hover:no-underline">
				<Moon className="h-[1rem] w-[1rem]" />
				<span>Dark</span>
			</Button>
		</div>
	)
}

