import { useParams } from "react-router-dom";
import { useGetRideDetailsQuery } from "@/redux/features/ride/ride.api";

export const RideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ride, isLoading, isError } = useGetRideDetailsQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !ride) return <p>Ride not found.</p>;

  const rideData = ride.data;
  const { pickupLocation, dropLocation, fare, status, timeStamps, driver } = rideData;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">Ride Details</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Pickup Location:</h3>
          <p>{pickupLocation?.address ?? "N/A"}</p>
        </div>

        <div>
          <h3 className="font-medium">Drop Location:</h3>
          <p>{dropLocation?.address ?? "N/A"}</p>
        </div>

        <div>
          <h3 className="font-medium">Fare:</h3>
          <p>${fare ?? "N/A"}</p>
        </div>

        <div>
          <h3 className="font-medium">Status:</h3>
          <p className="capitalize">{status ?? "N/A"}</p>
        </div>

        <div>
          <h3 className="font-medium">Timestamps:</h3>
          <ul className="list-disc pl-5">
            <li>Requested: {timeStamps?.requestedAt ? new Date(timeStamps.requestedAt).toLocaleString() : "N/A"}</li>
            <li>Accepted: {timeStamps?.acceptedAt ? new Date(timeStamps.acceptedAt).toLocaleString() : "N/A"}</li>
            <li>Picked Up: {timeStamps?.pickedUpAt ? new Date(timeStamps.pickedUpAt).toLocaleString() : "N/A"}</li>
            <li>Completed: {timeStamps?.completedAt ? new Date(timeStamps.completedAt).toLocaleString() : "N/A"}</li>
            <li>Canceled: {timeStamps?.canceledAt ? new Date(timeStamps.canceledAt).toLocaleString() : "N/A"}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium">Driver Info:</h3>
          {driver ? (
            <>
              <p>Name: {driver?.name ?? "N/A"}</p>
              <p>Phone: {driver?.phone ?? "N/A"}</p>
              <p>Vehicle: {driver?.vehicleNumber ?? "N/A"}</p>
            </>
          ) : (
            <p>No driver accepted yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
