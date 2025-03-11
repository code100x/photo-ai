import { Upload, Wand2, Download, LucideIcon } from "lucide-react";

export const meta = {
	title: "100xPhoto - AI-Powered Photo Enhancement",
	description:
		"Transform your photos with AI-powered enhancement and editing tools.",
}

export interface StackImage {
	url: string;
	title: string;
	description: string;
	style: string;
}

export interface WorkingStep {
	icon: LucideIcon;
	title: string;
	description: string;
}

export interface Plan {
	name: string;
	price: string;
	features: string[];
	highlighted: boolean;
}

export const stackImages: StackImage[] = [
	{
		url: "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png",
		title: "Professional Portrait",
		description: "Perfect for LinkedIn and business profiles",
		style: "Corporate",
	},
	{
		url: "https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png",
		title: "Casual Lifestyle",
		description: "Natural and relaxed everyday portraits",
		style: "Casual",
	},
	{
		url: "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png",
		title: "Creative Portrait",
		description: "Artistic shots with unique lighting",
		style: "Creative",
	},
	{
		url: "https://r2-us-west.photoai.com/1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png",
		title: "Fashion Portrait",
		description: "High-end fashion inspired photography",
		style: "Fashion",
	},
];


export const workingStep: WorkingStep[] = [
	{
		title: "Upload your mage",
		description: "Easily upload any portrait photo you’d like to enhance.",
		icon: Upload
	},
	{
		title: "AI Transformation",
		description: "Our cutting-edge AI enhances your photo, turning it into a stunning portrait.",
		icon: Wand2
	},
	{
		title: "Download & Share",
		description: "Instantly download and share your enhanced portraits in various artistic styles.",
		icon: Download
	}
];

export const plans: Plan[] = [
	{
		name: "Starter",
		price: "Free",
		features: [
			"10 AI Portraits",
			"Basic Styles",
			"24h Support",
			"Basic Export",
		],
		highlighted: false,
	},
	{
		name: "Pro",
		price: "$9.99",
		features: [
			"100 AI Portraits",
			"Premium Styles",
			"Priority Support",
			"HD Export",
			"Advanced Editing",
		],
		highlighted: true,
	},
	{
		name: "Enterprise",
		price: "Custom",
		features: [
			"Unlimited Portraits",
			"Custom Styles",
			"Dedicated Support",
			"API Access",
			"Custom Integration",
		],
		highlighted: false,
	},
];

export const Images = [
	{
		id: 1,
		url: "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png",
	},
	{
		id: 2,
		url: "https://r2-us-west.photoai.com/1739273789-920e7410ef180855f9a5718d1e37eb3a-1.png",
	},
	{
		id: 3,
		url: "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 4,
		url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 5,
		url: "https://images.unsplash.com/photo-1684864411311-b2a65c30b698?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 6,
		url: "https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 7,
		url: "https://images.unsplash.com/photo-1726066012801-14d892021339?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	}
]
