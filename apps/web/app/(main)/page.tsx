"use client";
import { Hero } from "@/components/home/Hero";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";


export default function Home() {
  const { user } = useAuth();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Hero />
    </div>
  );
}
