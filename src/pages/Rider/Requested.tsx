import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetRequestedRidesQuery, useCancelRideMutation } from "@/redux/features/ride/ride.api";
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rides</p>;

  return (
    <div className="space-y-4">
      {data?.data?.length === 0 && <p>No requested rides</p>}
      {data?.data?.map((ride: any) => (
        <Card key={ride._id}>
          <CardHeader>
            <CardTitle>{ride.pickupLocation.address} → {ride.dropLocation.address}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <p>Date: {new Date(ride.createdAt).toLocaleString()}</p>
              <p>Status: {ride.status}</p>
            </div>
            <Button variant="destructive" onClick={() => handleCancel(ride._id)}>
              Cancel Ride
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
