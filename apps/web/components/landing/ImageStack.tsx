"use client";

import { stackImages } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export const ImageStack = () => {
	return (
		<div className="flex flex-row items-center space-x-auto px-4 md:mt-16">
			{stackImages.map((image, _idx) => (
				<div key={image.title} className="relative group h-80 w-60 rounded-2xl">
					<Image
						src={image.url}
						alt={image.title}
						fill
						className={cn("p-2 bg-zinc-400/20 dark:bg-white/10 backdrop-blur-md rounded-2xl object-fill transform transition-all duration-300 ease-in-out hover:scale-120",
							{
								"-rotate-10 mt-8 ml-5 z-index": _idx === 0,
								"rotate-12 z-index": _idx === 1,
								"-rotate-10 -mt-10 z-index": _idx === 2,
								"rotate-10 mt-8 z-index": _idx === 3
							}
						)}
					/>
				</div>
			))}
		</div>
	)
}

