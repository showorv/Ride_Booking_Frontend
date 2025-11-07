"use client";

import { useGetDriverEarningsQuery } from "@/redux/features/driver/driver.api";
import { useEffect, useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

interface Earning {
  _id: string;
  fare: number;
  timeStamps: { completedAt: string };
}

export const EarningsDashboard = () => {
  const { data, isLoading, isError } = useGetDriverEarningsQuery(undefined);
  const [chartData, setChartData] = useState<{ date: string; fare: number }[]>([]);

  useEffect(() => {
    if (data?.data) {
      const formattedData = data.data.map((item: Earning) => {
        const dateObj = new Date(item.timeStamps.completedAt);
        const dateStr = dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" });
        return { date: dateStr, fare: item.fare };
      });
      setChartData(formattedData);
    }
    if (isError) toast.error("Failed to load earnings history.");
  }, [data, isError]);

  if (isLoading) return <p className="text-center mt-4">Loading earnings...</p>;
  if (!chartData.length) return <p className="text-center mt-4">No earnings yet.</p>;

  return (
    <div className="w-full max-w-3xl p-6 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Earnings Dashboard</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="fare" stroke="#4ade80" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4">
        {chartData.map((item) => (
          <p key={item.date} className="text-gray-700 dark:text-gray-300">
            {item.date}: ${item.fare}
          </p>
        ))}
      </div>
    </div>
  );
};
