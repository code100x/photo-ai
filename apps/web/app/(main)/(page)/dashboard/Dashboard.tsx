import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { GenerateImage } from '@/components/GenerateImage'
import { Camera } from '@/components/Camera'
import { Credits } from '@/components/navbar/Credits'
import { Packs } from '@/components/Packs'
import { Train } from '@/components/Train'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import Link from 'next/link'

export const Dashboard = () => {
	return (
		<Tabs defaultValue="camera" className="flex-1 flex flex-col px-4 md:px-6 overflow-hidden">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-serif">photo.ai</h1>

				<div className="flex items-center justify-between">
					<Button variant="ghost" size="sm" className="flex items-center gap-2 h-9">
						<Link href="/purchases">Purchases</Link>
					</Button>
					<Credits />
					<div className="flex items-center justify-between gap-6">
						<div className="h-4 border border-secondary rounded-full" />
						<UserButton />
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-hidden pt-2">
				<TabsContent value="camera" className="h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden focus-visible:ring-0">
					<Camera />
				</TabsContent>

				<TabsContent value="generate" className="h-full focus-visible:ring-0">
					<GenerateImage />
				</TabsContent>

				<TabsContent value="packs" className="h-full focus-visible:ring-0">
					<Packs />
				</TabsContent>

				<TabsContent value="trains" className="h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden focus-visible:ring-0">
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
