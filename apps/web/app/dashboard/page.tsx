import { GenerateImage } from "@/components/GenerateImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train } from "@/components/Train";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";

export default function Dashbaord() {
  return (
    <div className="max-w-4xl mx-auto px-3">
      <Tabs defaultValue="camera">
        <div className="flex justify-center items-center w-full">
          <TabsList className="m-4 p-">
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="generate">Generate Image</TabsTrigger>
            <TabsTrigger value="packs">Packs</TabsTrigger>
            <TabsTrigger value="train">Train a modal </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="generate">
          <GenerateImage />
        </TabsContent>
        <TabsContent value="train">
          <Train />
        </TabsContent>
        <TabsContent value="packs">
          <Packs />
        </TabsContent>
        <TabsContent value="camera">
          <Camera />
        </TabsContent>
      </Tabs>
    </div>
  );
}
