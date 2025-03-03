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
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">

        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 rounded-lg p-2 bg-muted/20">
            <TabsTrigger
              value="camera"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <span className="hidden sm:inline">Camera</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="generate"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v3" />
                  <path d="M18.5 5.5 16 8" />
                  <path d="M21 12h-3" />
                  <path d="M18.5 18.5 16 16" />
                  <path d="M12 21v-3" />
                  <path d="M5.5 18.5 8 16" />
                  <path d="M3 12h3" />
                  <path d="M5.5 5.5 8 8" />
                </svg>
                <span className="hidden sm:inline">Generate</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="packs"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span className="hidden sm:inline">Packs</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="train"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                <span className="hidden sm:inline">Train</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 p-4 bg-card rounded-lg border shadow-sm">
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
