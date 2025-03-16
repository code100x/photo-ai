"use client";

import { useState } from "react";
import { SelectModel } from "./Models";
import { PackCard, TPack } from "./PackCard";
import { motion } from "framer-motion";
import { Package, Search, Sparkles, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function PacksClient({ packs }: { packs: TPack[] }) {
  const [selectedModelId, setSelectedModelId] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPacks = packs.filter(pack => 
    pack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 mx-auto">
      <div className="container mx-auto md:px-8 pt-4">
        {/* Filters Section */}
        <motion.div 
          className="rounded-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SelectModel
                selectedModel={selectedModelId}
                setSelectedModel={setSelectedModelId}
              />
            </div>
          </div>
        </motion.div>

        <div className="md:space-y-1">
          <h2 className="md:text-2xl text-xl font-semibold tracking-tight">
            Select Pack
          </h2>
          <p className="text-sm text-muted-foreground">
            Chose a pack to generate images with
          </p>
        </div>
        <motion.div 
          className={cn(
            "grid gap-6 pt-4",
            "grid-cols-1",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-3"
          )}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {packs.length > 0 ? (
            packs.map((pack, index) => (
              <motion.div
                key={pack.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group"
              >
                <PackCard 
                  {...pack} 
                  selectedModelId={selectedModelId!}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              <div className="flex flex-col items-center justify-center p-12 rounded-lg border border-dashed bg-card/50">
                <Package className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-xl font-medium">
                  {searchQuery ? "No matching packs found" : "No packs available"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
                  {searchQuery 
                    ? "Try adjusting your search terms or clear the filter"
                    : "Select a model above to view compatible packs"
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
