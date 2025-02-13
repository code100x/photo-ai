"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div
        className={`flex border cursor-pointer bg-accent/80 rounded-lg gap-2 size-8 items-center flex-col justify-center text-center transition-all duration-300`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun
          weight="bold"
          className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          weight="bold"
          className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </div>
    </>
  );
}
