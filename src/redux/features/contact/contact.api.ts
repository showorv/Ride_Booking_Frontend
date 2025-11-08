

import { baseApi } from "@/redux/baseApi";


export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (payload: { name: string; email: string; message: string }) => ({
        url: "/contact",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
