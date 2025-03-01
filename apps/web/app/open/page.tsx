import React from "react";
import { BACKEND_URL } from "../config";
import Header from "@/components/open/Header";
import StatCards from "@/components/open/StatCards";
import OpenCharts from "@/components/open/OpenCharts";

async function OpenPage() {
  console.log("BACKEND_URL", BACKEND_URL);
  const response = await fetch(`${BACKEND_URL}/open`);
  const statsData = await response.json();
  console.log("statsData", statsData);

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header>Open Stats</Header>

        <StatCards stats={statsData?.data || {}} />

        <OpenCharts statsData={statsData?.data || []} />
      </div>
    </div>
  );
}

export default OpenPage;
