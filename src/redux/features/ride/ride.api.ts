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

// export interface IRideResponse {
//   _id: string;
//   pickupLocation: { address: string; lat?: number; lng?: number };
//   dropLocation: { address: string; lat?: number; lng?: number };
//   fare: number;
//   status: string;
//   timeStamps: {
//     requestedAt: string;
//     acceptedAt?: string;
//     pickedUpAt?: string;
//     completedAt?: string;
//     canceledAt?: string;
//   };
//   isCancelledByRider?: boolean;
//   driver?: {
//     _id: string;
//     name?: string;
//     phone?: string;
//     profile?: string;
//     vehicleNumber?: string;
//   } | null;
// }
export interface IRideResponse {
  _id: string;
  pickupLocation: { address: string; lat?: number; lng?: number };
  dropLocation: { address: string; lat?: number; lng?: number };
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
  driver?: {
    _id: string;
    user?: {
      _id?: string;
      name?: string;
      phone?: string;
    };
    vehicleNumber?: string;
  } | null;
}

export interface RideHistoryFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  minFare?: number;
  maxFare?: number;
  startDate?: string;
  endDate?: string;
}
interface RideHistoryResponse {

  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    rides: IRideResponse[];
  }
}

export interface IRideDetailsApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IRideResponse;
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


    getRideHistory: builder.query<RideHistoryResponse, RideHistoryFilters>({
      query: (filters) => ({
        url: "/ride/ride-history",
        method: "GET",
        params: filters,
      }),
      providesTags: ["RIDE"],
    }),

    getRideDetails: builder.query<IRideDetailsApiResponse, string>({
      query: (rideId) => ({
        url: `/ride/rideDetails/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    getRequestedRides: builder.query({
      query: () =>({ url:"/ride/request"}),
      providesTags: ["RIDE"],
    }),

   
  }),
});

export const {
  useCreateRideMutation,
  useCancelRideMutation,
  useGetCurrentRideQuery,
  useGetRideHistoryQuery,
  useGetRideDetailsQuery,
  useGetRequestedRidesQuery
} = rideApi;
