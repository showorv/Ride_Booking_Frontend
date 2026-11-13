import { Loader } from "@/components/provider/Loader";
import { useGetDriverEarningsQuery } from "@/redux/features/driver/driver.api";
import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

interface Earning {
  _id: string;
  fare: number;
  timeStamps: { completedAt: string };
}

export const EarningsDashboard = () => {
  const { data, isLoading, isError } = useGetDriverEarningsQuery(undefined);
  const [chartData, setChartData] = useState<{ id: string; date: string; fare: number }[]>([]);

  useEffect(() => {
    if (data?.data) {
      const formattedData = data.data.map((item: Earning) => {
        const dateObj = new Date(item.timeStamps.completedAt);
        const dateStr = dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" });
        return { id: item._id, date: dateStr, fare: item.fare };
      });
      setChartData(formattedData);
    }
    if (isError) toast.error("Failed to load earnings history.");
  }, [data, isError]);

  const wrapper =
    "rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-black sm:p-6";

  if (isLoading)
    return (
      <div className={`${wrapper} grid place-items-center py-12`}>
        <Loader />
      </div>
    );

  if (!chartData.length)
    return (
      <div className={`${wrapper} flex flex-col items-center py-12 text-center`}>
        <span className="grid size-12 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-900">
          <Wallet className="size-5 text-neutral-500" />
        </span>
        <p className="mt-3 font-medium">No earnings yet</p>
        <p className="text-sm text-neutral-500">Complete rides to start seeing your earnings here.</p>
      </div>
    );

  const total = chartData.reduce((sum, i) => sum + Number(i.fare || 0), 0);
  const avg = total / chartData.length;
  const best = Math.max(...chartData.map((i) => Number(i.fare || 0)));

  const summary = [
    { label: "Total Earnings", value: `$${total.toLocaleString()}`, icon: DollarSign },
    { label: "Avg. per Ride", value: `$${avg.toFixed(2)}`, icon: TrendingUp },
    { label: "Best Ride", value: `$${best.toLocaleString()}`, icon: Wallet },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
              <span className="grid size-10 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-xs text-neutral-500">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={wrapper}>
        <div className="mb-4">
          <h3 className="font-semibold">Earnings Overview</h3>
          <p className="text-sm text-neutral-500">Fare earned per completed ride</p>
        </div>

        <div className="-ml-4 h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fareFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} stroke="#a3a3a3" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#a3a3a3" width={48} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e5e5e5", fontSize: 13 }}
                formatter={(v: any) => [`$${v}`, "Fare"]}
              />
              <Area type="monotone" dataKey="fare" stroke="#4ade80" strokeWidth={3} fill="url(#fareFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 max-h-64 divide-y divide-neutral-200 overflow-y-auto dark:divide-neutral-800">
          {chartData.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-neutral-500">{item.date}</span>
              <span className="font-semibold">${item.fare}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
