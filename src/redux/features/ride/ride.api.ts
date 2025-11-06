import { baseApi } from "@/redux/baseApi";
export interface IRideRequest {
    pickupLocation: {
      address: string;
      lat?: number;
      lng?: number;
    };
    dropLocation: {
      address: string;
      lat?: number;
      lng?: number;
    };
    fare: number;
    paymentMethod?: string;
  }
  

interface IRideResponse {
  _id: string;
  pickupLocation: string;
  dropLocation: string;
  fare: number;
  status: string;
  timeStamps: {
    requestedAt: string;
    acceptedAt?: string;
    pickedUpAt?: string;
    completedAt?: string;
    canceledAt?: string;
  };
  isCancelledByRider?: boolean;
}

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRide: builder.mutation<IRideResponse, IRideRequest>({
      query: (payload) => ({
        url: "/ride/requested",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["RIDE"],
    }),
    cancelRide: builder.mutation<IRideResponse, string>({
      query: (rideId) => ({
        url: `/ride/cancel/${rideId}`,
        method: "POST",
      }),
      invalidatesTags: ["RIDE"],
    }),
    getCurrentRide: builder.query<IRideResponse | null, void>({
      query: () => ({
        url: "/rides/current",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
    getRideHistory: builder.query<IRideResponse[], void>({
      query: () => ({
        url: "/rides/history",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useCreateRideMutation,
  useCancelRideMutation,
  useGetCurrentRideQuery,
  useGetRideHistoryQuery,
} = rideApi;
