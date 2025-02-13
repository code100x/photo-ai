import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

export interface TImage {
  id: string;
  status: string;
  imageUrl: string;
}

const DEFAULT_BLUR_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/016/894/217/small/white-background-white-polished-metal-abstract-white-gradient-background-blurred-white-backdrop-illustration-vector.jpg";

export function ImageCard(props: TImage) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border rounded-xl max-w-full sm:max-w-[500px] overflow-hidden cursor-pointer"
    >
      <div className="flex gap-4 justify-center items-center">
        {props.status === "Generated" ? (
          <motion.img
            src={props.imageUrl}
            className="rounded w-full h-auto"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.img
            src={DEFAULT_BLUR_IMAGE}
            className="w-full h-auto"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function ImageCardSkeleton() {
  return (
    <div className="border rounded-xl max-w-full overflow-hidden sm:max-w-[400px] cursor-pointer w-full">
      <div className="flex gap-4 justify-center items-center">
        <Skeleton className="rounded h-56 w-full sm:w-[300px]" />
      </div>
    </div>
  );
}
