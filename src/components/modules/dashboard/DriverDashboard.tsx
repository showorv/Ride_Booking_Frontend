"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useGetDriverProfileQuery,
  useSetOnlineStatusMutation,
} from "@/redux/features/driver/driver.api";
import { EarningsDashboard } from "@/pages/driver/EarningChar";

export const DriverDashboard = () => {
  const { data: userData, isLoading: isUserLoading } = useGetMeInfoQuery(undefined);
  const userId = userData?.data?._id;

  const { data: driverData, isLoading: isDriverLoading } = useGetDriverProfileQuery(
    userId!,
    { skip: !userId }
  );

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

  if (isUserLoading || isDriverLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-neutral-50 dark:bg-neutral-900 p-6 space-y-6">
    
      <div className="w-full max-w-lg p-6 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Driver Dashboard</h2>

        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-lg">Status:</span>
          <Button
            onClick={handleToggle}
            disabled={isUpdating}
            className={`w-28 md:w-36 ${
              online ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            {online ? "ONLINE" : "OFFLINE"}
          </Button>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {userData?.data?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userData?.data?.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {userData?.data?.phone}
          </p>
          <p>
            <span className="font-medium">Vehicle Number:</span> {driverData?.data?.vehicleNumber || "N/A"}
          </p>

          {driverData?.data?.license ? (
            <div>
              <span className="font-medium">Vehicle License:</span>
              <img
                src={driverData.data.license}
                alt="Vehicle License"
                className="mt-1 w-48 h-auto rounded border border-gray-300"
              />
            </div>
          ) : (
            <p>
              <span className="font-medium">Vehicle License:</span> N/A
            </p>
          )}
        </div>
      </div>

     
      <EarningsDashboard />
    </div>
  );
};
