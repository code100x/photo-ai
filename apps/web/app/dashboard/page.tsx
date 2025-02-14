import { GenerateImage } from "@/components/GenerateImage";
import { TabDock } from "@/components/ui/tabs";
import { Train } from "@/components/Train";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";
import { Camera as CameraIcon, Image as ImageIcon, Package as PackageIcon, Brain as BrainIcon } from "lucide-react";

export default function Dashboard() {
  const items = [
    {
      title: "Camera",
      icon: <CameraIcon className="h-full w-full" />,
      value: "camera",
      content: <Camera />
    },
    {
      title: "Generate Image",
      icon: <ImageIcon className="h-full w-full" />,
      value: "generate",
      content: <GenerateImage />
    },
    {
      title: "Packs",
      icon: <PackageIcon className="h-full w-full" />,
      value: "packs",
      content: <Packs />
    },
    {
      title: "Train a model",
      icon: <BrainIcon className="h-full w-full" />,
      value: "train",
      content: <Train />
    }
  ];

  return (
    <div className="flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="flex justify-center">
          <TabDock 
            items={items}
            defaultValue="camera"
            desktopClassName="m-4"
            mobileClassName="m-4"
          />
        </div>
      </div>
    </div>
  );
}