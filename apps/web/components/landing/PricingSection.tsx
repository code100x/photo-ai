"use client";

import { plans } from "@/lib/constants";
import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PricingSection() {
	return (
		<div className="flex max-w-4xl mx-auto px-4 pt-8 md:pt-16">
			<div className="grid gap-6 md:gap-8 w-full grid-cols-1 md:grid-cols-3">
				{plans.map((plan) => (
					<div key={plan.name} className={cn("bg-zinc-100/10 dark:bg-zinc-100/10 shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-95 rounded-2xl outline-4 outline-offset-2 outline-zinc-400/10 dark:outline-white/10",
						{
							"md:scale-112 bg-gradient-to-bl from-[#377d71] via-[#fbc5c5] to-[#fba1a1] text-white": plan.highlighted
						}
					)}>
						<div className="flex items-center justify-start px-6 py-4">
							<div className="font-serif italic tracking-wider text-xl">{plan.name}</div>
						</div>

						<div className="px-6 py-4">
							<div className="pb-4 font-bold">{plan.price}</div>
							{plan.features.map((feature, idx) => (
								<div key={idx} className="flex items-center gap-2">
									<CircleCheck className="w-4 h-4" />
									<p>{feature}</p>
								</div>
							))}
						</div>

						<div className="flex items-center justify-center px-6 py-4">
							<Button
								variant="link"
								size="lg"
								className="text-xs w-full cursor-pointer hover:no-underline"
							>
								Get Started
							</Button>
						</div>
					</div>

				))}
			</div>
		</div>

	)
}
