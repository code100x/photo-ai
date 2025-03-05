import { ArrowDown } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export interface TImage {
  id: string;
  status: string;
  imageUrl: string;
  title: string;
}

const DEFAULT_BLUR_IMAGE =
  "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2016/09/progressive-image-loading-pure-css.jpg?fit=542%2C407&ssl=1";

export function ImageCard(props: TImage) {
  return (
    <div className="group relative rounded-none overflow-hidden max-w-[400px] cursor-zoom-in">
      <div className="flex gap-4 min-h-32">
        {props.status === "Generated" ? (
          <img src={props.imageUrl} />
        ) : (
          <img src={DEFAULT_BLUR_IMAGE} />
        )}
      </div>
      <div className="opacity-0 absolute transition-normal duration-200 group-hover:opacity-100 flex items-center justify-between bottom-0 left-0 right-0 p-4 bg-opacity-70 text-white ">
        <p>{props.title}</p>
        <span className="flex items-center justify-between bg-primary-foreground text-muted-foreground rounded-md px-2 py-1">
          <ArrowDown/>
        </span>
      </div>
    </div>
  );
}

export function ImageCardSkeleton() {
  return (
    <div className="rounded-none mb-4 overflow-hidden max-w-[400px] cursor-pointer">
      <div className="flex gap-4 min-h-32">
        <Skeleton className={`w-full h-[300px] rounded-none`} />
      </div>
    </div>
  );
}
