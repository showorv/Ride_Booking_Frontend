import { Link } from "react-router-dom";
import { ArrowUpRight, CarFront, DollarSign, Route, ShieldCheck, UserCheck, Users } from "lucide-react";
import { Loader } from "@/components/provider/Loader";
import { useGetAnalyticsQuery } from "@/redux/features/admin/admin.api";

export const AdminDashboard = () => {
  const { data, isLoading } = useGetAnalyticsQuery(undefined);

  if (isLoading)
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Loader />
      </div>
    );

  const {
    totalUsers = 0,
    totalDrivers = 0,
    totalRides = 0,
    totalRevenue = 0,
    activeDrivers = 0,
  } = data?.data || {};

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users },
    { label: "Total Drivers", value: totalDrivers, icon: CarFront },
    { label: "Active Drivers", value: activeDrivers, icon: UserCheck },
    { label: "Total Rides", value: totalRides, icon: Route },
  ];

  const activeRatio = totalDrivers ? Math.round((activeDrivers / totalDrivers) * 100) : 0;
  const driverRatio = totalUsers ? Math.round((totalDrivers / totalUsers) * 100) : 0;
  const avgFare = totalRides ? (Number(totalRevenue) / totalRides).toFixed(2) : "0.00";

  const quickLinks = [
    { label: "Manage Users", desc: "Block, unblock and review accounts", path: "users", icon: Users },
    { label: "Manage Drivers", desc: "Approve or suspend drivers", path: "drivers", icon: CarFront },
    { label: "Ride Oversight", desc: "Monitor every ride on the platform", path: "rides", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Admin Analytics</h2>
        <p className="mt-1 text-sm text-neutral-500">A snapshot of how RideWave is performing.</p>
      </div>

      {/* Revenue hero card */}
      <div className="relative overflow-hidden rounded-2xl bg-black p-6 text-white dark:bg-white dark:text-black sm:p-8">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/5 dark:bg-black/5" />
        <div className="absolute -bottom-16 right-24 size-40 rounded-full bg-white/5 dark:bg-black/5" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
              <DollarSign className="size-4" /> Total Revenue
            </div>
            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">${Number(totalRevenue).toLocaleString()}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Avg. fare</p>
              <p className="text-xl font-semibold">${avgFare}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Rides</p>
              <p className="text-xl font-semibold">{Number(totalRides).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-black sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 sm:text-sm">{stat.label}</span>
                <span className="grid size-9 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold sm:text-3xl">{Number(stat.value).toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Health */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-black lg:col-span-2">
          <h3 className="font-semibold">Platform Health</h3>
          <p className="text-sm text-neutral-500">Driver availability and supply</p>
          <div className="mt-6 space-y-5">
            {[
              { label: "Drivers online", value: activeRatio, caption: `${activeDrivers} of ${totalDrivers}` },
              { label: "Drivers vs users", value: driverRatio, caption: `${totalDrivers} of ${totalUsers}` },
            ].map((m) => (
              <div key={m.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{m.label}</span>
                  <span className="text-neutral-500">{m.caption}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
                  <div
                    className="h-full rounded-full bg-black transition-all dark:bg-white"
                    style={{ width: `${Math.min(m.value, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-neutral-500">{m.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-black lg:col-span-3">
          <h3 className="font-semibold">Quick Actions</h3>
          <p className="text-sm text-neutral-500">Jump straight into management tools</p>
          <div className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
            {quickLinks.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.path}
                  to={q.path}
                  className="group flex items-center gap-4 py-3.5 first:pt-2 last:pb-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neutral-100 transition-colors group-hover:bg-black group-hover:text-white dark:bg-neutral-900 dark:group-hover:bg-white dark:group-hover:text-black">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{q.label}</p>
                    <p className="truncate text-sm text-neutral-500">{q.desc}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
