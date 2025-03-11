"use client";

import { workingStep } from "@/lib/constants";

export function HowItWorks() {
	return (
		<div className="flex max-w-4xl mx-auto px-4 pt-8 md:pt-16">
			<div className="grid gap-6 grid-cols-1 md:grid-cols-3 backdrop-blur-md">
				{workingStep.map((step) => (
					<div key={step.title} className="bg-zinc-100/10 dark:bg-zinc-100/10 shadow-[0_0_15px_rgba(255,255,255,0.2)] rounded-2xl outline-4 outline-offset-2 outline-zinc-400/10 dark:outline-white/10">
						<div className="flex items-center justify-center px-6 py-4">
							<step.icon className="w-5 h-5" />
						</div>
						<div className="px-6 py-4 text-center">
							<div className="font-bold text-xl mb-2">{step.title}</div>
							<p className="">
								{step.description}
							</p>
						</div>
					</div>

				))}
			</div>
		</div>

	);
}
