"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./OpenCardUI";
import { useTheme } from "next-themes";

const chartVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const OpenCharts = ({ statsData }) => {
  const { theme } = useTheme();
  console.log("statsdata", statsData);

  const chartConfig = [
    {
      title: "Daily Users",
      data: statsData.charts?.dailyUsers,
      key: "count",
      color: "#3b82f6",
    },
    {
      title: "Daily Trained Models",
      data: statsData.charts?.dailyTrainedModels,
      key: "count",
      color: "#10b981",
    },
    {
      title: "Daily Generated Images",
      data: statsData.charts?.dailyGeneratedImages,
      key: "count",
      color: "#f59e0b",
    },
    {
      title: "Daily Revenue",
      data: statsData.charts?.dailyRevenue,
      key: "amount",
      color: "#ef4444",
    },
  ];
  console.log("chartConfig", chartConfig);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {(chartConfig || []).map((chart) => (
        <motion.div
          key={chart.title}
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-background/80 border-border/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                {chart.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chart.data}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "#444" : "#ddd"}
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(new Date(date), "MMM dd")}
                      stroke={theme === "dark" ? "#ccc" : "#666"}
                    />
                    <YAxis stroke={theme === "dark" ? "#ccc" : "#666"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#333" : "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={chart.key}
                      stroke={chart.color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OpenCharts;
