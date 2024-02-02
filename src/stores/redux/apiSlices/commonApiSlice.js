import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "../apiSliceInterceptor";

const commonApi = createApi({
	reducerPath: "common",
	baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
	tagTypes: ["RISK_PROFILES"],
	endpoints: (builder) => ({
		getRiskProfiles: builder.query({
			query: () => "api/customer/get-risk-profile",
			transformResponse: (res) => {
				console.log("risk ressss", res);
				return res.result.riskProfile;
			},
			providesTags: ["RISK_PROFILES"],
		}),
	}),
});

export const commonApiReducer = commonApi.reducer;

export const commonApiAction = {
	middleware: commonApi.middleware,
	reducerPath: commonApi.reducerPath,
	getRiskProfiles: commonApi.useGetRiskProfilesQuery,
};
