"use client";

import { cn } from "@/lib/utils";

export default function AvatarComponent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center rounded-full mt-6 border border-border bg-background p-1 shadow shadow-black/5",
        className
      )}
    >
      <div className="flex -space-x-1.5">
        <img
          className="rounded-full ring-1 ring-background"
          src="https://originui.com/avatar-80-03.jpg"
          width={22}
          height={22}
          alt="Avatar 01"
        />
        <img
          className="rounded-full ring-1 ring-background"
          src="https://originui.com/avatar-80-04.jpg"
          width={22}
          height={22}
          alt="Avatar 02"
        />
        <img
          className="rounded-full ring-1 ring-background"
          src="https://originui.com/avatar-80-05.jpg"
          width={22}
          height={22}
          alt="Avatar 03"
        />
        <img
          className="rounded-full ring-1 ring-background"
          src="https://originui.com/avatar-80-06.jpg"
          width={22}
          height={22}
          alt="Avatar 04"
        />
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">50+</strong>{" "}
        founders.
      </p>
    </div>
  );
}
