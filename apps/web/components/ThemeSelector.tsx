"use client";

import { useState, useEffect, useCallback } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";

export function ThemeSelector() {
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme>("system");
  const { theme, setTheme } = useTheme();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      setSelectedTheme((theme as Theme) || "system");
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "m") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard]);

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 px-1"
        onClick={() => setOpen(true)}
      >
        <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">
            {navigator?.platform?.toLowerCase()?.includes("mac") ? "⌘" : "Ctrl"}
          </span>{" "}
          M
        </kbd>
        {selectedTheme === "light" && <Sun className="h-4 w-4" />}
        {selectedTheme === "dark" && <Moon className="h-4 w-4" />}
        {selectedTheme === "system" && <Monitor className="h-4 w-4" />}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Select a theme
              <span className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                Press{" "}
                {navigator?.platform?.toLowerCase()?.includes("mac")
                  ? "⌘"
                  : "Ctrl"}{" "}
                + M
              </span>
            </DialogTitle>
            <DialogDescription className="md:text-base text-sm text-left">
              Choose a theme that works best for you.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 md:gap-4 gap-2 py-6">
            <div
              className={cn(
                "relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
                selectedTheme === "system" ? "border-primary" : "border-border"
              )}
              onClick={() => handleThemeChange("system")}
            >
              <div className="flex md:h-48">
                <div className="w-1/2 bg-neutral-200 p-4">
                  <div className="h-4 md:w-16 w-10 bg-neutral-400 rounded mb-2"></div>
                  <div className="h-2 w-24 bg-neutral-400 rounded mb-1"></div>
                  <div className="h-2 w-20 bg-neutral-400 rounded mb-1"></div>
                  <div className="h-2 w-28 bg-neutral-400 rounded mb-1"></div>
                </div>
                <div className="w-1/2 bg-neutral-800 p-4">
                  <div className="h-4 md:w-16 w-10 bg-neutral-600 rounded mb-2"></div>
                  <div className="h-2 w-24 bg-neutral-600 rounded mb-1"></div>
                  <div className="h-2 w-20 bg-neutral-600 rounded mb-1"></div>
                  <div className="h-2 w-28 bg-neutral-600 rounded mb-1"></div>
                </div>
              </div>
              <div className="p-2 text-center font-medium">System default</div>
            </div>

            <div
              className={cn(
                "relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
                selectedTheme === "light" ? "border-primary" : "border-border"
              )}
              onClick={() => handleThemeChange("light")}
            >
              <div className="md:h-48 bg-neutral-100 p-4">
                <div className="flex justify-center mb-4">
                  <div className="h-8 w-8 bg-neutral-300 rounded-full"></div>
                </div>
                <div className="h-4 w-24 bg-neutral-300 rounded mx-auto mb-2"></div>
                <div className="h-2 w-32 bg-neutral-300 rounded mx-auto mb-1"></div>
                <div className="h-2 w-40 bg-neutral-300 rounded mx-auto mb-1"></div>
                <div className="h-2 w-36 bg-neutral-300 rounded mx-auto mb-1"></div>
              </div>
              <div className="p-2 text-center font-medium">Light</div>
            </div>

            <div
              className={cn(
                "relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
                selectedTheme === "dark" ? "border-primary" : "border-border"
              )}
              onClick={() => handleThemeChange("dark")}
            >
              <div className="md:h-48 bg-neutral-900 p-4">
                <div className="flex justify-center mb-4">
                  <div className="h-8 w-8 bg-neutral-700 rounded-full"></div>
                </div>
                <div className="h-4 w-24 bg-neutral-700 rounded mx-auto mb-2"></div>
                <div className="h-2 w-32 bg-neutral-700 rounded mx-auto mb-1"></div>
                <div className="h-2 w-40 bg-neutral-700 rounded mx-auto mb-1"></div>
                <div className="h-2 w-36 bg-neutral-700 rounded mx-auto mb-1"></div>
              </div>
              <div className="p-2 text-center font-medium">Dark</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
