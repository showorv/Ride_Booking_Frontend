import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
        query: ({ id, name, phone, file }: { id: string; name: string; phone: string; file?: File }) => {
          const formData = new FormData();
          formData.append("data", JSON.stringify({ name, phone }));
          if (file) formData.append("file", file);
      
          return {
            url: `/user/${id}`,
            method: "PATCH",
            data: formData,
            // Do NOT set content-type; browser sets it automatically for FormData
          };
        },
      }),
    changePassword: builder.mutation({
      query: (data: { oldPassword: string; newPassword: string }) => ({
        url: "/auth/change-password",
        method: "POST",
      
        data: data,
      }),
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation } = userApi;
