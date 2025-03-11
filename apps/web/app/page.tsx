"use client";
import { Landing } from "@/components/landing/Landing";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";


export default function Home() {
  const { user } = useAuth();
  if (user) {
    redirect("/dashboard");
  }
  return <Landing />;
}
