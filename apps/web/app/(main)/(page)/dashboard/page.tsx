import { ThemeToggle2 } from "@/components/ThemeToggle";
import { SidebarGenerateImage } from "@/components/SidebarGenerateImage"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";
import { ChevronDown } from "lucide-react";
import { Dashboard } from "./Dashboard"

export default async function Page() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/");
	}

	return (
		<div className="flex h-screen w-full md:px-4 py-4 overflow-x-clip">
			<div className="hidden md:flex w-[350px] flex-col bg-zinc-300/50 dark:bg-zinc-100/10 outline-6 outline-zinc-400/10 rounded-2xl overflow-hidden">
				<div className="flex flex-col gap-2 h-full overflow-auto p-2">
					<div className="p-2 bg-zinc-100 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl">
						<div className="space-y-4 p-2">
							<h1 className="text-lg font-medium">General Settings</h1>
							<div className="space-y-1">
								<label className="text-xs text-gray-400 uppercase">History</label>
								<div className="flex items-center pt-2 justify-between rounded">
									<span className="text-sm">Prompt History</span>
									<ChevronDown className="h-4 w-4" />
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-2 h-full">
						<div className="p-2 bg-zinc-100 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl">
							<div className="space-y-4 p-2">
								<h1 className="text-lg font-medium">Generate</h1>
								<div className="space-y-2">
									<SidebarGenerateImage />
								</div>
							</div>
						</div>
					</div>

					<div className="bg-zinc-100 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl flex jusitfy-end">
						<ThemeToggle2 />
					</div>
				</div>
			</div>

			<Dashboard />
		</div>

	);
}
