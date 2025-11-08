import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateRideMutation, useCancelRideMutation, useGetCurrentRideQuery } from "@/redux/features/ride/ride.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const rideRequestSchema = z.object({
  pickupLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().nonempty("Pickup address is required"),
  }),
  dropLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().nonempty("Drop address is required"),
  }),
  fare: z.number().min(0, "Fare must be positive"),
  // paymentMethod is optional and not sent to backend
});

type RideRequestFormType = z.infer<typeof rideRequestSchema>;

export const RideRequestForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // local state for payment
  const [createRide, { isLoading }] = useCreateRideMutation();
  const [cancelRide, { isLoading: isCancelling }] = useCancelRideMutation();
  const { data: currentRide } = useGetCurrentRideQuery();
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RideRequestFormType>({
    resolver: zodResolver(rideRequestSchema),
  });

  const onSubmit = async (data: RideRequestFormType) => {
    try {
      // send only required backend fields, exclude paymentMethod
      await createRide(data).unwrap();
      toast.success("Ride requested successfully!");
      navigate("/rider-dashboard")
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const handleCancel = async () => {
    if (!currentRide?._id) return;
    try {
      await cancelRide(currentRide._id).unwrap();
      toast.success("Ride canceled successfully!");
      
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-2rem)] p-4">
  <div className="w-full bg-white dark:bg-black p-8 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
    <h2 className="text-2xl font-semibold mb-6 text-center">Request a Ride</h2>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-1 text-sm font-medium">Pickup Address</label>
        <Input {...register("pickupLocation.address")} placeholder="Enter pickup address" />
        {errors.pickupLocation?.address && (
          <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.address.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Drop Address</label>
        <Input {...register("dropLocation.address")} placeholder="Enter drop address" />
        {errors.dropLocation?.address && (
          <p className="text-red-500 text-sm mt-1">{errors.dropLocation.address.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Fare</label>
        <Input type="number" {...register("fare", { valueAsNumber: true })} placeholder="Enter fare" />
        {errors.fare && <p className="text-red-500 text-sm mt-1">{errors.fare.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border border-neutral-300 dark:border-neutral-700 rounded-md p-2 bg-white dark:bg-black text-neutral-800 dark:text-neutral-200"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Wallet">Wallet</option>
        </select>
      </div>

      <div className="flex gap-4">
        {!currentRide?._id ? (
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Requesting..." : "Request Ride"}
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isCancelling}
            className="flex items-center justify-center gap-2 w-full"
          >
            {isCancelling && (
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            )}
            Cancel Ride
          </Button>
        )}
      </div>
    </form>
  </div>
</div>

  );
};
