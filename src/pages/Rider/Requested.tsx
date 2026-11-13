import { Loader } from "@/components/provider/Loader";
import { Button } from "@/components/ui/button";
import { useGetRequestedRidesQuery, useCancelRideMutation } from "@/redux/features/ride/ride.api";
import { CalendarClock, CarFront, X } from "lucide-react";
import { toast } from "sonner";

export const RequestedRides = () => {
  const { data, isLoading, error } = useGetRequestedRidesQuery(undefined);
  const [cancelRide] = useCancelRideMutation();

  const handleCancel = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.success("Ride canceled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel ride");
    }
  };

  if (isLoading)
    return (
      <div className="grid place-items-center py-8">
        <Loader />
      </div>
    );
  if (error) return <p className="py-6 text-center text-sm text-red-500">Error loading rides</p>;

  if (!data?.data?.length)
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed border-neutral-200 py-10 text-center dark:border-neutral-800">
        <span className="grid size-12 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-900">
          <CarFront className="size-5 text-neutral-500" />
        </span>
        <p className="mt-3 font-medium">No requested rides</p>
        <p className="text-sm text-neutral-500">Your pending ride requests will show up here.</p>
      </div>
    );

  return (
    <div className="space-y-3">
      {data.data.map((ride: any) => (
        <div
          key={ride._id}
          className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800 sm:flex-row sm:items-center"
        >
          <div className="flex min-w-0 flex-1 gap-3">
            <div className="flex flex-col items-center pt-1.5">
              <span className="size-2.5 rounded-full border-2 border-black dark:border-white" />
              <span className="my-1 w-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
              <span className="size-2.5 rounded-sm bg-black dark:bg-white" />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="truncate text-sm font-medium">{ride.pickupLocation?.address}</p>
              <p className="truncate text-sm font-medium">{ride.dropLocation?.address}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1">
                  <CalendarClock className="size-3.5" />
                  {new Date(ride.createdAt).toLocaleString()}
                </span>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                  {ride.status}
                </span>
              </div>
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={() => handleCancel(ride._id)} className="w-full sm:w-auto">
            <X className="size-4" /> Cancel
          </Button>
        </div>
      ))}
    </div>
  );
};
