"use client"
import { motion } from "framer-motion";
import { GenerateImage } from "@/components/GenerateImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train } from "@/components/Train";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";

export default function Dashboard() {
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-6xl px-4 py-8">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-4 text-sm md:text-lg">
            Explore the features and tools available in your workspace.
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl md:rounded-3xl p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="camera">
            <TabsList className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 bg-transparent">
              <TabsTrigger
                value="camera"
                className="text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-all bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                📷 Camera
              </TabsTrigger>
              <TabsTrigger
                value="generate"
                className="text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-all bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                � Generate Image
              </TabsTrigger>
              <TabsTrigger
                value="packs"
                className="text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-all bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                📦 Packs
              </TabsTrigger>
              <TabsTrigger
                value="train"
                className="text-xs md:text-sm font-medium px-4 py-2 rounded-lg transition-all bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                🚂 Train
              </TabsTrigger>
            </TabsList>

            <div className="rounded-lg overflow-hidden">
              <TabsContent value="generate">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 md:p-6"
                >
                  <GenerateImage />
                </motion.div>
              </TabsContent>
              <TabsContent value="train">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 md:p-6"
                >
                  <Train />
                </motion.div>
              </TabsContent>
              <TabsContent value="packs">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 md:p-6"
                >
                  <Packs />
                </motion.div>
              </TabsContent>
              <TabsContent value="camera">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 md:p-6"
                >
                  <Camera />
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}