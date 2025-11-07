import { baseApi } from "@/redux/baseApi";
import type { IOtp, IResponse, IVerifyOtp } from "@/types/authType";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        register: builder.mutation({
            query:(userInfo)=>({
                url: "/user/create",
                method:"POST",
               data: userInfo

    
                
            })
        }),

        login: builder.mutation({
            query:(loginInfo)=>({
                url:"/auth/login",
                method:"POST",
                data:loginInfo
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url:"/auth/logout",
                method:"POST",
                
            }),
            invalidatesTags: ["USER"]
        }),


        sendOtp: builder.mutation<IResponse<null>, IOtp>({
            query:(otpInfo)=>({
                url:"/otp/send",
                method:"POST",
                data:otpInfo
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query:(otpInfo)=>({
                url:"/otp/verify",
                method:"POST",
                data:otpInfo
            })
        }),

        getMeInfo: builder.query({
            query:()=>({
                url:"/user/me",
                method:"GET"
               
            }),
            providesTags: ["USER"]
        }),
    })
})


export const {useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation, useGetMeInfoQuery, useLogoutMutation} = authApi