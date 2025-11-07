import { baseApi } from "@/redux/baseApi";


export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params?: { page?: number; limit?: number; search?: string; role?: string }) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),

    blockRider: builder.mutation({
      query: (userId: string) => ({
        url: `/user/block/${userId}`,
        method: "PATCH",
        data: { isBlocked: true },
      }),
      invalidatesTags: ["ADMIN"],
    }),

    unblockRider: builder.mutation({
      query: (userId: string) => ({
        url: `/user/unblock/${userId}`,
        method: "PATCH",
        data: { isBlocked: false }, 
      }),
      invalidatesTags: ["ADMIN"],
    }),

    getAllDrivers: builder.query({
      query: (params?: { page?: number; limit?: number; search?: string; approved?: string }) => ({
        url: "/driver/drivers",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),

    approveDriver: builder.mutation({
      query: (driverId: string) => ({
        url: `/driver/approve/${driverId}`,
        method: "POST",
      }),
      invalidatesTags: ["ADMIN"],
    }),

    suspendDriver: builder.mutation({
      query: (driverId: string) => ({
        url: `/driver/suspense/${driverId}`,
        method: "POST",
      }),
      invalidatesTags: ["ADMIN"],
    }),

    getAllRides: builder.query<any, { page?: number; limit?: number; search?: string; status?: string; startDate?: string; endDate?: string }>(
        {
          query: (params) => ({
            url: "/ride/getAll",
            method:"GET",
            params,
          }),
          providesTags: ["ADMIN"],
        }
      ),
  
      getAnalytics: builder.query({
        query: () => ({
            url:"/ride/analytics",
            method:"GET",
        }),
        providesTags: ["ADMIN"],
      }),


  }),
});

export const {
  useGetAllUsersQuery,
  useBlockRiderMutation,
  useUnblockRiderMutation,
  useGetAllDriversQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useGetAllRidesQuery,
  useGetAnalyticsQuery
} = adminApi;
