"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  
  useEffect(()=>{
    const isDark = theme === "dark";
    setChecked(isDark)
  },[]);

  return (
    <div className="flex items-center gap-2">
      <Sun className={`h-5 w-5 ${!checked ? "text-pink-500" : ""}`} />
      <Switch
        className="data-[state=checked]:bg-pink-500 data-[state=unchecked]:bg-input"
        checked={checked}
        onCheckedChange={() => setTheme(checked ? "light" : "dark")}
      />
      <Moon className={`h-5 w-5 ${checked ? "text-pink-500" : ""}`} />
    </div>
  );
}
