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
      query: (payload: { onlineStatus: boolean }) => ({
        url: "/driver/update-online-status",
        method: "POST",
        body: payload,
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
          body: JSON.stringify({ status }), 
          headers: { "Content-Type": "application/json" }, 
        }),
      }),
      
  }),
});



export const { useGetDriverProfileQuery, useSetOnlineStatusMutation , useGetAvailableRidesQuery, useAcceptRideMutation,useCancelRideMutation,useGetActiveRideQuery,useUpdateRideStatusMutation} = driverApi;
