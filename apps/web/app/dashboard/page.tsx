"use client";

import { useState } from "react";
import { GenerateImage } from "@/components/GenerateImage";
import { TabDock } from "@/components/ui/tabs";
import { Train } from "@/components/Train";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";
import {
  Camera as CameraIcon,
  Image as ImageIcon,
  Package as PackageIcon,
  Brain as BrainIcon,
} from "lucide-react";

const items = [
  {
    title: "Camera",
    icon: <CameraIcon className="h-full w-full" />,
    value: "camera",
    content: <Camera />,
  },
  {
    title: "Generate Image",
    icon: <ImageIcon className="h-full w-full" />,
    value: "generate",
    content: <GenerateImage />,
  },
  {
    title: "Packs",
    icon: <PackageIcon className="h-full w-full" />,
    value: "packs",
    content: <Packs />,
  },
  {
    title: "Train a model",
    icon: <BrainIcon className="h-full w-full" />,
    value: "train",
    content: <Train />,
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("camera");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const activeContent = items.find((item) => item.value === activeTab)?.content;

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen pt-[88px]">
      {/* Content container with padding for the dock */}
      <div className="flex-1 w-full max-w-6xl p-4 pb-24 overflow-y-auto">
        <div className="relative">
          {activeContent}
        </div>
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-background/80 backdrop-blur-sm z-[90] pb-safe">
        <div className="w-full max-w-6xl flex justify-center">
          <TabDock
            items={items.map(({ content, ...rest }) => rest)} 
            defaultValue="camera"
            value={activeTab}
            onValueChange={handleTabChange}
            desktopClassName="max-w-fit"
            mobileClassName="max-w-fit"
          />
        </div>
      </div>
    </div>
  );
}
