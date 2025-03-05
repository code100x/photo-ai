import { GenerateImage } from "@/components/GenerateImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train } from "@/components/Train";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <div className="space-y-8">
        <Tabs defaultValue="camera">
          <TabsList className="inline-flex h-10 items-center justify-start rounded-lg p-1 dark:bg-muted/50 bg-pink-50">
            <TabsTrigger
              value="camera"
              className="data-[state=active]:bg-pink-500/70 backdrop-blur-sm data-[state=active]:text-pink-50 cursor-pointer px-3 py-1.5"
            >
              Camera
            </TabsTrigger>
            <TabsTrigger
              value="generate"
              className="data-[state=active]:bg-pink-500/70 backdrop-blur-sm data-[state=active]:text-pink-50 cursor-pointer px-3 py-1.5"
            >
              Generate<span className="md:block hidden pl-1">Images</span>
            </TabsTrigger>
            <TabsTrigger
              value="packs"
              className="data-[state=active]:bg-pink-500/70 backdrop-blur-sm data-[state=active]:text-pink-50 cursor-pointer px-3 py-1.5"
            >
              Packs
            </TabsTrigger>
            <TabsTrigger
              value="train"
              className="data-[state=active]:bg-pink-500/70 backdrop-blur-sm data-[state=active]:text-pink-50 cursor-pointer px-3 py-1.5"
            >
              Train<span className="md:block hidden pl-1">Model</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 bg-card rounded-lg">
            <TabsContent
              value="camera"
              className="mt-0 focus-visible:outline-none"
            >
              <Camera />
            </TabsContent>
            <TabsContent
              value="generate"
              className="mt-0 focus-visible:outline-none"
            >
              <GenerateImage />
            </TabsContent>
            <TabsContent
              value="packs"
              className="mt-0 focus-visible:outline-none"
            >
              <Packs />
            </TabsContent>
            <TabsContent
              value="train"
              className="mt-0 focus-visible:outline-none"
            >
              <Train />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
