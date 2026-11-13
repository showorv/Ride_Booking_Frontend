import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Activity, CarFront, FileBadge, History, Mail, Phone, Power, Route } from "lucide-react";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useGetDriverProfileQuery,
  useSetOnlineStatusMutation,
} from "@/redux/features/driver/driver.api";
import { EarningsDashboard } from "@/pages/driver/EarningChar";
import { Loader } from "@/components/provider/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const DriverDashboard = () => {
  const { data: userData, isLoading: isUserLoading } = useGetMeInfoQuery(undefined);
  const user = userData?.data?.user;
  const userId = user?._id;

  const { data: driverData, isLoading: isDriverLoading } = useGetDriverProfileQuery(userId!, {
    skip: !userId,
  });

  const [setOnlineStatus, { isLoading: isUpdating }] = useSetOnlineStatusMutation();
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (driverData?.data) {
      setOnline(driverData.data.onlineStatus === "ONLINE");
    }
  }, [driverData]);

  const handleToggle = async () => {
    if (!driverData?.data?._id) return;
    try {
      const newStatus = online ? "OFFLINE" : "ONLINE";
      await setOnlineStatus({ onlineStatus: newStatus }).unwrap();
      setOnline(newStatus === "ONLINE");
      toast.success(`You are now ${newStatus}`);
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message === "you cannot change now") {
        return toast.error("You are on a ride");
      }
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  if (isUserLoading || isDriverLoading)
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Loader />
      </div>
    );

  const details = [
    { label: "Email", value: user?.email, icon: Mail },
    { label: "Phone", value: user?.phone, icon: Phone },
    { label: "Vehicle Number", value: driverData?.data?.vehicleNumber || "N/A", icon: CarFront },
  ];

  const shortcuts = [
    { label: "Available Rides", path: "rides", icon: Route },
    { label: "Active Ride", path: "active-ride", icon: Activity },
    { label: "Ride History", path: "ride-history", icon: History },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Status card */}
        <div className="relative overflow-hidden rounded-2xl bg-black p-6 text-white dark:bg-white dark:text-black lg:col-span-2">
          <div className="absolute -right-12 -top-12 size-56 rounded-full border-[28px] border-white/5 dark:border-black/5" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 border-2 border-white/20 dark:border-black/20">
                <AvatarImage src={user?.profile} alt={user?.name} />
                <AvatarFallback className="bg-white/10 text-lg text-white dark:bg-black/10 dark:text-black">
                  {user?.name?.[0]?.toUpperCase() || "D"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-neutral-400 dark:text-neutral-500">Welcome back,</p>
                <h2 className="text-xl font-bold sm:text-2xl">{user?.name}</h2>
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                    online ? "bg-green-500/15 text-green-400 dark:text-green-600" : "bg-red-500/15 text-red-400 dark:text-red-600"
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", online ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                  {online ? "Online — accepting rides" : "Offline"}
                </span>
              </div>
            </div>

            <button
              onClick={handleToggle}
              disabled={isUpdating}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60",
                online ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              )}
            >
              <Power className="size-4" />
              {isUpdating ? "Updating..." : online ? "Go Offline" : "Go Online"}
            </button>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {shortcuts.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.path}
                to={s.path}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-3 text-center text-xs font-medium transition-all hover:shadow-md dark:border-neutral-800 dark:bg-black sm:text-sm lg:flex-row lg:p-4 lg:text-left"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-neutral-100 transition-colors group-hover:bg-black group-hover:text-white dark:bg-neutral-900 dark:group-hover:bg-white dark:group-hover:text-black">
                  <Icon className="size-4" />
                </span>
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Driver details */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-black sm:p-6">
        <h3 className="font-semibold">Driver Profile</h3>
        <p className="text-sm text-neutral-500">Your registered details</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {details.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.label} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-900">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white dark:bg-black">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">{d.label}</p>
                  <p className="truncate text-sm font-medium">{d.value || "N/A"}</p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3 dark:bg-neutral-900">
            {driverData?.data?.license ? (
              <a href={driverData.data.license} target="_blank" rel="noreferrer" className="shrink-0">
                <img
                  src={driverData.data.license}
                  alt="Vehicle License"
                  className="size-9 rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
                />
              </a>
            ) : (
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white dark:bg-black">
                <FileBadge className="size-4" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-xs text-neutral-500">Vehicle License</p>
              <p className="truncate text-sm font-medium">
                {driverData?.data?.license ? "Uploaded" : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <EarningsDashboard />
    </div>
  );
};
