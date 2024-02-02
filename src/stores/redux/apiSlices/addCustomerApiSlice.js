import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "stores/redux/apiSliceInterceptor";
import { addCustomerParser } from "stores/redux/apiParser/addCustomerParser";

const addCustomerApi = createApi({
	reducerPath: "addCustomer",
	baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
	tagTypes: [
		"ADD_CUSTOMER",
		"FAMILY",
		"PLANS",
		"CUSTOMER_DETAILS",
		"PRODUCT_DETAILS",
		"CUSTOMER_SUMMARY",
	],
	endpoints: (builder) => ({
		getRiskAssesment: builder.query({
			query: () => "api/customer/risk-assessment",
			transformResponse: addCustomerParser.riskAssesmentQts,
			providesTags: ["ADD_CUSTOMER"],
		}),
		getFamilyDetails: builder.query({
			query: () => "api/customer/family-groups",
			transformResponse: (res) => res.result,
			providesTags: ["FAMILY"],
		}),
		getPlanDetails: builder.query({
			query: () => "api/customer/plans",
			transformResponse: (res) => res.result,
			providesTags: ["PLANS"],
		}),
		getCustomerDetails: builder.query({
			query: (payload) => `api/customer/get-details/${payload.user_id}`,
			transformResponse: (res) => res.result,
			providesTags: ["CUSTOMER_DETAILS"],
		}),
		getProductDetails: builder.query({
			query: () => `api/customer/products`,
			transformResponse: (res) => res.result,
			providesTags: ["PRODUCT_DETAILS"],
		}),
		getCustomerSummary: builder.query({
			query: (payload) => `api/customer/get-details/${payload.userId}`,
			transformResponse: addCustomerParser.customerSummary,
			providesTags: ["CUSTOMER_SUMMARY"],
		}),
		sendOtp: builder.mutation({
			query: (payload) => ({
				url: "api/customer/send-otp",
				method: "POST",
				body: payload,
			}),
		}),
		confirmEmailOtp: builder.mutation({
			query: (payload) => ({
				url: "api/customer/verify-otp",
				method: "POST",
				body: payload,
			}),
		}),
		confirmPhoneOtp: builder.mutation({
			query: (payload) => ({
				url: "api/customer/verify-otp",
				method: "POST",
				body: payload,
			}),
		}),
		submitRiskDetails: builder.mutation({
			query: (payload) => {
				return {
					url: `api/customer/update-risk-assessment/${payload.userId}`,
					method: "post",
					body: {
						answers: payload.answer,
					},
				};
			},
		}),
		updateRiskProfile: builder.mutation({
			query: (payload) => {
				return {
					url: `api/customer/update-manual-risk-profile/${payload.userId}`,
					method: "post",
					body: {
						risk_profile_id: payload.risk_profile_id,
					},
				};
			},
		}),
		updateInvestmentDetails: builder.mutation({
			query: (payload) => {
				console.log("payload in slice : ", payload);
				return {
					url: `api/customer/update-investment-details/${payload.userId}`,
					method: "post",
					body: {
						...payload.investmentDetails,
					},
				};
			},
		}),
		updateOtherDetails: builder.mutation({
			query: (payload) => ({
				url: `api/customer/update-other-details/${payload.userId}`,
				method: "post",
				body: {
					...payload.otherDetails,
				},
			}),
		}),
	}),
});

export const addCustomerApiReducer = addCustomerApi.reducer;

export const addCustomerApiAction = {
	middleware: addCustomerApi.middleware,
	reducerPath: addCustomerApi.reducerPath,
	getRiskAssesment: addCustomerApi.useGetRiskAssesmentQuery,
	getFamilyDetails: addCustomerApi.useGetFamilyDetailsQuery,
	getPlanDetails: addCustomerApi.useGetPlanDetailsQuery,
	getCustomerDetails: addCustomerApi.useGetCustomerDetailsQuery,
	getProductDetails: addCustomerApi.useGetProductDetailsQuery,
	getCustomerSummary: addCustomerApi.useLazyGetCustomerSummaryQuery,
	sendOtp: addCustomerApi.useSendOtpMutation,
	confirmEmailOtp: addCustomerApi.useConfirmEmailOtpMutation,
	confirmPhoneOtp: addCustomerApi.useConfirmPhoneOtpMutation,
	submitRiskDetails: addCustomerApi.useSubmitRiskDetailsMutation,
	updateRiskProfile: addCustomerApi.useUpdateRiskProfileMutation,
	updateInvestmentDetails: addCustomerApi.useUpdateInvestmentDetailsMutation,
	updateOtherDetails: addCustomerApi.useUpdateOtherDetailsMutation,
};
