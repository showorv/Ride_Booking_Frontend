"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetAvailableRidesQuery,
  useAcceptRideMutation,
  useCancelRideMutation,
} from "@/redux/features/driver/driver.api";
import {
  useGetDriverProfileQuery,
  useSetOnlineStatusMutation,
} from "@/redux/features/driver/driver.api";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";

interface Ride {
  _id: string;
  pickupLocation: { address: string };
  dropLocation: { address: string };
  fare: number;
  isCancelledByRider: boolean;
  createdAt: string;
}

export const AvailableRides = () => {
  const { data: meData } = useGetMeInfoQuery(undefined);
  const userId = meData?.data?.user?._id;

  const { data: driverData, isLoading: isDriverLoading } = useGetDriverProfileQuery(userId!, {
    skip: !userId,
  });

  console.log(driverData);
  

  const [setOnlineStatus] = useSetOnlineStatusMutation();
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
        return toast.error("You are currently on a ride");
      }
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const { data, isLoading, isError, refetch } = useGetAvailableRidesQuery(undefined, {
    skip: !driverData?.data || !driverData.data.isApproved || !online,
  });

  const [rides, setRides] = useState<Ride[]>([]);
  const [acceptRide] = useAcceptRideMutation();
  const [cancelRide] = useCancelRideMutation();
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
  
  useEffect(() => {
    if (data?.data) setRides(data.data);
    if (isError) toast.error("Failed to fetch available rides.");
  }, [data, isError]);

  if (isDriverLoading) return <p className="text-center mt-4">Loading driver profile...</p>;

  if (!driverData?.data)
    return <p className="text-center mt-4">You are not registered as a driver yet.</p>;

  if (!driverData.data.isApproved)
    return (
      <p className="text-center mt-4">
        Your driver account is not approved yet. Please wait for admin approval.
      </p>
    );

  if (!online)
    return (
      <div className="max-w-4xl mx-auto mt-6 p-6 text-center bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md">
        <p>You are offline. Please go online to see available rides.</p>
        <button
          onClick={handleToggle}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Go Online
        </button>
      </div>
    );

  if (isLoading) return <p className="text-center mt-4">Loading available rides...</p>;
  if (!rides.length) return <p className="text-center mt-4">No available rides at the moment.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded ${
            online ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {online ? "Go Offline" : "Go Online"}
        </button>
      </div>

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
            <Button
              className="px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded"
              onClick={() => handleAccept(ride._id)}
            >
              Accept
            </Button>
            <Button
              className="px-4  text-white rounded"
              onClick={() => handleCancel(ride._id)}
              variant={"destructive"}
            >
              Cancel
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
