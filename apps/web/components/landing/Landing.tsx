"use client";

import { BackgroundEffects } from "./BackgroundEffects";
import { Header } from "./Header";
import { ImageStack } from "./ImageStack";
import { PricingSection } from "./PricingSection";
import { HowItWorks } from "./HowItWorks";
import { Appbar } from "@/components/Appbar"
import { Footer } from "@/components/Footer"

// background effects is useful components, figure out where to use it

const H2 = ({ children }: { children: React.ReactNode }) => (
	<h2 className="text-5xl italic font-serif md:text-center">{children}</h2>
)

const P = ({ children }: { children: React.ReactNode }) => (
	<p className="md:w-lg text-gray-400 font-medium tracking-tight md:text-center">
		{children}
	</p>
)

export function Landing() {
	return (
		<>
			<Appbar />

			<div className="flex flex-col min-h-screen space-y-8 items-start md:items-center overflow-x-clip pt-12">
				<Header />
				<ImageStack />

				{/* <TrustedBy /> */}

				{/* <BackgroundEffects /> */}

				{/* <StatsSection /> */}

				{/* <Features /> */}

				{/* <Testimonials /> */}

				<div className="space-y-4 w-full mt-12 md:mt-40">
					<div className="flex flex-col items-center space-y-2 px-4 md:text-center">
						<H2>Just upload. Photo.ai enhances your images.</H2>
						<P>Explore the features that transform your photos into stunning visuals with AI-powered precision.</P>
					</div>

					<HowItWorks />
				</div>

				<div className="space-y-4 w-full mt-12 md:mt-30">
					<div className="flex flex-col items-center space-y-2 px-4 md:text-center">
						<H2>Just pick a plan. Unlock instantly.</H2>
						<P>No matter your needs, we have the right plan for you. Choose one and start creating today!</P>
					</div>

					<PricingSection />


				</div>

				<div className="w-full p-4 mt-12 md:mt-30">
					<Footer />
				</div>
			</div>
		</>
	);
}
