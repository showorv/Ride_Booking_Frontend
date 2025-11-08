"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetActiveRideQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driver.api"; 
import { Button } from "@/components/ui/button";

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
  const [sosOpen, setSosOpen] = useState(false);

  useEffect(() => {
    if (data?.data) setRide(data.data);
    if (isError) toast.error("Failed to fetch active ride.");
  }, [data, isError]);

  if (isLoading) return <p className="text-center mt-4">Loading active ride...</p>;
  if (!ride) return <p className="text-center mt-4">No active ride currently.</p>;

  const nextStatusMap: Record<string, string | null> = {
    ACCEPTED: "PICKED_UP",
    PICKED_UP: "IN_TRANSIT",
    IN_TRANSIT: "COMPLETED",
    COMPLETED: null,
  };

  const handleUpdateStatus = async () => {
    const nextStatus = nextStatusMap[ride.status];
    if (!nextStatus) return;

    try {
      await updateRideStatus({ rideId: ride._id, status: nextStatus }).unwrap();
      toast.success(`Ride status updated to ${nextStatus}`);
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update ride status");
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-6 p-6 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">

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
          className="mt-4 w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-blue-600"
          onClick={handleUpdateStatus}
        >
          Move to {nextStatusMap[ride.status]}
        </button>
      )}

      {ride.status === "COMPLETED" && (
        <p className="mt-4 text-green-600 font-medium">Ride Completed!</p>
      )}

   
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-red-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setSosOpen(!sosOpen)}
        >
          SOS
        </Button>

        {sosOpen && (
          <div className="mt-2 flex flex-col space-y-2 absolute bottom-20 right-0 bg-white dark:bg-black p-4 rounded-lg shadow-lg w-48">
            <Button asChild className="w-full">
              <a href="tel:999">Call Police</a>
            </Button>
            <Button asChild className="w-full">
              <a href="/contact">Report to Admin</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
