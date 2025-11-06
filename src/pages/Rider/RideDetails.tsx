import { useParams } from "react-router-dom";
import { useGetRideDetailsQuery } from "@/redux/features/ride/ride.api";

export const RideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ride, isLoading, isError } = useGetRideDetailsQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !ride) return <p>Ride not found.</p>;

  const { pickupLocation, dropLocation, fare, status, timeStamps, driver } = ride;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">Ride Details</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Pickup Location:</h3>
          <p>{pickupLocation.address}</p>
        </div>

        <div>
          <h3 className="font-medium">Drop Location:</h3>
          <p>{dropLocation.address}</p>
        </div>

        <div>
          <h3 className="font-medium">Fare:</h3>
          <p>${fare}</p>
        </div>

        <div>
          <h3 className="font-medium">Status:</h3>
          <p className="capitalize">{status}</p>
        </div>

        <div>
          <h3 className="font-medium">Timestamps:</h3>
          <ul className="list-disc pl-5">
            {timeStamps.requestedAt && <li>Requested: {new Date(timeStamps.requestedAt).toLocaleString()}</li>}
            {timeStamps.acceptedAt && <li>Accepted: {new Date(timeStamps.acceptedAt).toLocaleString()}</li>}
            {timeStamps.pickedUpAt && <li>Picked Up: {new Date(timeStamps.pickedUpAt).toLocaleString()}</li>}
            {timeStamps.completedAt && <li>Completed: {new Date(timeStamps.completedAt).toLocaleString()}</li>}
            {timeStamps.canceledAt && <li>Canceled: {new Date(timeStamps.canceledAt).toLocaleString()}</li>}
          </ul>
        </div>

        {driver && (
          <div>
            <h3 className="font-medium">Driver Info:</h3>
            <p>Name: {driver.name || "N/A"}</p>
            <p>Phone: {driver.phone || "N/A"}</p>
            <p>Vehicle: {driver.vehicleNumber || "N/A"}</p>
          </div>
        )}
      </div>
    </div>
  );
};
