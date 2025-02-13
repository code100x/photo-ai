import { GenerateImage } from "@/components/GenerateImage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Train } from "@/components/Train";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";
import {Payment} from "@/components/Payment";
 
export default function Dashbaord() {
   return <div className="flex justify-center">
    <div className="max-w-6xl">
        <div className="flex justify-center">
            <Tabs defaultValue="camera">
                <div className="flex justify-center">
                    <TabsList className="m-4 p-4">
                        <TabsTrigger value="camera">Camera</TabsTrigger>
                        <TabsTrigger value="generate">Generate Image</TabsTrigger>
                        <TabsTrigger value="packs">Packs</TabsTrigger>
                        <TabsTrigger value="train">Train a modal </TabsTrigger>
                        <TabsTrigger value="payment">Payment </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="generate"><GenerateImage /></TabsContent>
                <TabsContent value="train"><Train /></TabsContent>
                <TabsContent value="packs"><Packs /></TabsContent>
                <TabsContent value="camera"><Camera /></TabsContent>
                <TabsContent value="payment"><Payment /></TabsContent>
            </Tabs>
        </div>
    </div>
   </div>
}