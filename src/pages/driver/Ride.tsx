"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetAvailableRidesQuery,
  useAcceptRideMutation,
  useCancelRideMutation,
} from "@/redux/features/driver/driver.api"; 

interface Ride {
  _id: string;
  pickupLocation: { address: string };
  dropLocation: { address: string };
  fare: number;
  isCancelledByRider: boolean;
  createdAt: string;
}

export const AvailableRides = () => {
  const { data, isLoading, isError, refetch } = useGetAvailableRidesQuery(undefined);
  const [rides, setRides] = useState<Ride[]>([]);
  const [acceptRide] = useAcceptRideMutation();
  const [cancelRide] = useCancelRideMutation();

  useEffect(() => {
    if (data?.data) setRides(data.data);
    if (isError) toast.error("Failed to fetch available rides.");
  }, [data, isError]);

  const handleAccept = async (rideId: string) => {
    try {
      await acceptRide({ rideId }).unwrap();
      toast.success("Ride accepted!");
      refetch(); 
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to accept ride.");
    }
  };

  const handleCancel = async (rideId: string) => {
    try {
      await cancelRide({ rideId }).unwrap();
      toast.success("Ride cancelled!");
      refetch(); 
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to cancel ride.");
    }
  };

  if (isLoading) return <p className="text-center mt-4">Loading available rides...</p>;
  if (!rides.length) return <p className="text-center mt-4">No available rides at the moment.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      {rides.map((ride) => (
        <div
          key={ride._id}
          className="p-4 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Ride Request</h3>
            <span className="text-sm text-gray-500">
              {new Date(ride.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="space-y-1">
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
              <span className="font-medium">Status:</span>{" "}
              {ride.isCancelledByRider ? "Cancelled" : "Requested"}
            </p>
          </div>

          <div className="mt-4 flex space-x-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleAccept(ride._id)}
            >
              Accept
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleCancel(ride._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
