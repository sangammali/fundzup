import { createApi } from "@reduxjs/toolkit/query/react";

import { apiSliceInterceptor } from "../apiSliceInterceptor";

const auth = createApi({
  reducerPath: "auth",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: ["AUTH"],
  endpoints: (qb) => ({
    verifyUser: qb.mutation({
      query: ({ mobile, otp, type }) => ({
        url: `api/verify-otp`,
        method: "POST",
        body: { mobile, otp, type },
        invalidatesTags: ["VERIFY_OTP"],
      }),
    }),
    sendOtp: qb.mutation({
      query: ({ mobile, type }) => ({
        url: `api/login`,
        method: "POST",
        body: { mobile, type: type },
        invalidatesTags: ["LOGIN"],
      }),
    }),
    resendOtp: qb.mutation({
      query: ({ mobile,type }) => ({
        url: `api/resend-otp`,
        method: "POST",
        body: { mobile: mobile ,type:type},
        invalidatesTags: ["RESEND_OTP"],
      }),
    }),
  }),
});

export const authApiReducer = auth.reducer;

export const authApiAction = {
  middleware: auth.middleware,
  reducerPath: auth.reducerPath,
  verifyUser: auth.useVerifyUserMutation,
  sendOtp: auth.useSendOtpMutation,
  resendOtp: auth.useResendOtpMutation,
};
