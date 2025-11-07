"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetActiveRideQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driver.api"; // Create these endpoints

interface Ride {
  _id: string;
  pickupLocation: { address: string };
  dropLocation: { address: string };
  fare: number;
  status: string;
}

export const ActiveRide = () => {
  const { data, isLoading, isError, refetch } = useGetActiveRideQuery(undefined);
  const [updateRideStatus] = useUpdateRideStatusMutation();
  const [ride, setRide] = useState<Ride | null>(null);
  console.log("Current ride status:", ride?.status);
  console.log("Current ride status:", ride?._id);
  useEffect(() => {
    if (data?.data) setRide(data.data);
    if (isError) toast.error("Failed to fetch active ride.");
  }, [data, isError]);

  if (isLoading) return <p className="text-center mt-4">Loading active ride...</p>;
  if (!ride) return <p className="text-center mt-4">No active ride currently.</p>;

  const nextStatusMap: Record<string, string | null> = {
    // REQUESTED: "PICKED_UP",
    ACCEPTED: "PICKED_UP",
    PICKED_UP: "IN_TRANSIT",
    IN_TRANSIT: "COMPLETED",
    COMPLETED: null,
  };

  const handleUpdateStatus = async () => {
   
    const nextStatus = nextStatusMap[ride.status];
    if (!nextStatus) return;

    console.log(nextStatus);
    
    try {
     const updateStatus= await updateRideStatus({ rideId: ride._id, status: nextStatus  }).unwrap();

     console.log("update",updateStatus);
     
      toast.success(`Ride status updated to ${nextStatus}`);
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update ride status");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-semibold mb-4">Active Ride</h2>

      <div className="space-y-2">
        <p>
          <span className="font-medium">Pickup:</span> {ride.pickupLocation.address}
        </p>
        <p>
          <span className="font-medium">Drop:</span> {ride.dropLocation.address}
        </p>
        <p>
          <span className="font-medium">Fare:</span> ${ride.fare}
        </p>
        <p>
          <span className="font-medium">Status:</span> {ride.status}
        </p>
      </div>

      {ride.status !== "COMPLETED" && (
        <button
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleUpdateStatus}
        >
          Move to {nextStatusMap[ride.status]}
        </button>
      )}

      {ride.status === "COMPLETED" && (
        <p className="mt-4 text-green-600 font-medium">Ride Completed!</p>
      )}
    </div>
  );
};
