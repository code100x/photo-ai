import Image from "next/image";

export default function ImgIllustration() {
  const IMAGES = [
    "https://r2-us-west.photoai.com/1739277231-0b2465581e9551abecd467b163d0d48a-1.png",
    "https://r2-us-west.photoai.com/1739273783-9effbeb7239423cba9629e7dd06f3565-1.png",
    "https://r2-us-west.photoai.com/1738859038-086cec35785b734c68f99cab1f23d5a2-3.png",
  ];
  return (
    <>
      <div className="flex items-center -space-x-4 h-full mt-0 md:mt-4">
        <div className="w-8 md:w-11 -rotate-[10deg] border-2 md:border-[3px] border-white overflow-hidden rounded-md md:rounded-lg h-[70%]">
          <img
            src={IMAGES[0]}
            alt="img-illustration-1"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
        <div className="shadow-xl w-8 md:w-11 border-2 md:border-[3px] border-white z-20 rounded-md md:rounded-lg overflow-hidden h-[70%]">
          <img
            src={IMAGES[1]}
            alt="img-illustration-2"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
        <div className="w-8 md:w-11 rotate-[10deg] border-2 md:border-[3px] border-white overflow-hidden rounded-md md:rounded-lg h-[70%]">
          <img
            src={IMAGES[2]}
            alt="img-illustration-3"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
      </div>
    </>
  );
}
