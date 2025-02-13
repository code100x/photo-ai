import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageSwiper } from "./ImageSwiper";

export interface TPack {
  id: string;
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  description: string;
}

export function PackCard(props: TPack & { selectedModelId: string }) {
  const { getToken } = useAuth();

  const images = [props.imageUrl1, props.imageUrl2];

  return (
    <Card
      onClick={async () => {
        toast("Pack generation started successfully");
        const token = await getToken();
        await axios.post(
          `${BACKEND_URL}/pack/generate`,
          {
            packId: props.id,
            modelId: props.selectedModelId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }}
      className="md:max-w-[400px] hover:border-red-300 transition-colors duration-300"
    >
      <CardContent className="p-0">
        <ImageSwiper images={images} />
      </CardContent>
      <CardHeader className="p-2">
        <CardTitle className="text-lg font-semibold">{props.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </CardHeader>
    </Card>
  );
}
