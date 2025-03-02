import React from "react";
import { BACKEND_URL } from "../config";
import Heading from "@/components/open/Heading";
import StatCards from "@/components/open/StatCards";
import OpenCharts from "@/components/open/OpenCharts";

async function getStatsData() {
  const response = await fetch(`${BACKEND_URL}/open`, {
    next: { revalidate: 3600 },
  });
  return response.json();
}

async function OpenPage() {
  const statsData = await getStatsData();

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading className="text-4xl font-bold text-foreground text-center mb-12 ">
          Open Stats
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          <StatCards stats={statsData?.data || {}} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OpenCharts statsData={statsData?.data || []} />
        </div>
      </div>
    </div>
  );
}

export default OpenPage;
