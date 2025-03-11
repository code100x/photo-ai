import { UserButton } from '@clerk/nextjs'
import { GenerateImage } from '@/components/GenerateImage'
import { Packs } from '@/components/Packs'
import { Train } from '@/components/Train'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { Images } from '@/lib/constants'
import Image from 'next/image'

export const Dashboard = () => {
	return (
		<Tabs defaultValue="camera" className="flex-1 flex flex-col px-2 md:px-6 overflow-hidden">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-4xl font-serif">photo.ai</h1>
				</div>

				<UserButton />
			</div>

			<div className="flex-1 overflow-hidden pt-2">
				<TabsContent
					value="camera"
					className="h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden"
				>
					<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-2 gap-2">
						{[...Images, ...Images].map((img, idx) => (
							<div key={idx} className="break-inside-avoid bg-zinc-400/20 dark:bg-white/5 backdrop-blur-md rounded-md p-2 hover:bg-white/10 transition-all duration-300">
								<div className="relative w-full aspect-square break-inside-avoid">
									<Image
										src={img.url}
										alt="placeholder"
										width={400}
										height={400}
										className="object-cover rounded-md"
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									/>
								</div>
							</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="generate" className="h-full">
					<GenerateImage />
				</TabsContent>

				<TabsContent value="packs" className="h-full">
					<Packs />
				</TabsContent>

				<TabsContent value="trains" className="h-full">
					<Train />
				</TabsContent>
			</div>


			<div className="p-4 flex justify-center">
				<div className="flex gap-6 bg-zinc-300/50 dark:bg-zinc-100/10 p-2 rounded-full outline-6 outline-zinc-400/10 dark:outline-zinc-600/10 backdrop-blur-xl">
					<TabsList className="bg-transparent border-none">
						<TabsTrigger value="camera" className="rounded-full data-[state=active]:scale-110 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:font-bold">
							Gallery
						</TabsTrigger>
						<TabsTrigger value="generate" className="rounded-full data-[state=active]:scale-110 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:font-bold">
							Generate
						</TabsTrigger>
						<TabsTrigger value="packs" className="rounded-full data-[state=active]:scale-110 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:font-bold">
							Packs
						</TabsTrigger>
						<TabsTrigger value="trains" className="rounded-full data-[state=active]:scale-110 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:font-bold">
							Trains
						</TabsTrigger>
					</TabsList>
				</div>
			</div>
		</Tabs>
	)
};
