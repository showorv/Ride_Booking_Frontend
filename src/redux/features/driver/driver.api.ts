import { baseApi } from "@/redux/baseApi";



export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getDriverProfile: builder.query({
      query: (userId) => ({
        url: `/driver/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

  
    setOnlineStatus: builder.mutation({
      query: (payload: { onlineStatus: string }) => ({
        url: "/driver/update-online-status",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["DRIVER"],
    }),
    getAvailableRides: builder.query({
        query: () =>({
            
            url: "/driver/requested-ride",
            method: "GET"
        }),
      }),
      

      acceptRide: builder.mutation({
        query: ({ rideId }) => ({
          url: `/driver/accepted/${rideId}`,
          method: "POST",
        }),
      }),
      
    
      cancelRide: builder.mutation({
        query: ({ rideId }) => ({
          url: `/driver/cancled/${rideId}`,
          method: "POST",
        }),
      }),

      getActiveRide: builder.query({
        query: () =>({ 
            url:"/driver/active-ride",
            method: "GET"
        
        }),
      }),
      
      updateRideStatus: builder.mutation({
        query: ({ rideId, status }: { rideId: string; status: string }) => ({
          url: `/driver/updateStatus/${rideId}`,
          method: "PATCH",
          data: JSON.stringify({ status }), 
          headers: { "Content-Type": "application/json" }, 
        }),
      }),

      getDriverEarnings: builder.query<any, void>({
        query: () =>({ 
            url:`/driver/earning-history`
        }), 
        providesTags: ["DRIVER"],
      }),

      getDriverRideHistory: builder.query({
        query: (params?: { page?: number; limit?: number; search?: string }) => ({
          url: "/driver/ride-history",
          method: "GET",
          params,
        }),
        providesTags: ["DRIVER"],
      }),
      
      
      
  }),
});



export const { useGetDriverProfileQuery, useSetOnlineStatusMutation , useGetAvailableRidesQuery, useAcceptRideMutation,useCancelRideMutation,useGetActiveRideQuery,useUpdateRideStatusMutation, useGetDriverEarningsQuery,useGetDriverRideHistoryQuery} = driverApi;
