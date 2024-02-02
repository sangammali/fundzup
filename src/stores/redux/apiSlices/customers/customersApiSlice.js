import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "stores/redux/apiSliceInterceptor";

const Customers = createApi({
  reducerPath: "Customers",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: ["CUSTOMERS"],
  endpoints: (qb) => ({
    getCustomerListApi: qb.mutation({
      query: (postData) => ({
        url: `api/customer/get-customers`,
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["CUSTOMERS"],
      }),
    }),
    getCustomerSearchingData: qb.mutation({
      query: (postData) => ({
        url: `api/customer/get-customers`,
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["CUSTOMERS"],
      }),
    }),
    getCustomerPlan: qb.query({
      query: () => {
        return `api/customer/plans`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["CUSTOMERS"],
    }),
    postCustomerEmailApi: qb.mutation({
      query: (formData) => ({
        url: `api/customer/send-email`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["CUSTOMERS"],
      }),
    }),
    getProductId: qb.query({
      query: () => {
        return `api/customer/products`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["CUSTOMERS"],
    }),
    postImportFile: qb.mutation({
      query: (formData) => ({
        url: `api/customer/attach-customer-file`,
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-type": "multipart/form-data",
        // },
      }),
    }),
    postAttachImportFile: qb.mutation({
      query: (data) => ({
        url: `api/customer/import-customer`,
        method: "POST",
        body: {
          customers: data.map((item) => ({
            name: item?.name,
            email: item?.email,
            mobile: item?.mobile,
            investmenttype: item?.investmenttype,
            plancode: item?.plancode,
            capital: item?.capital,
            riskprofile: item?.riskprofile,
          })),
        },
      }),
    }),
    updateCustomerApprove: qb.mutation({
      query: (payload) => {
        return {
          url: `api/customer/update-customer-approval/${payload.user_id}`,
          method: "POST",
          body: payload,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        };
      },
    }),
    getCustomerDetail: qb.query({
      query: (user_id) => ({
        url: `api/customer/get-customer-details/${user_id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        invalidatesTags: ["CUSTOMERS"],
      }),
    }),
    getFilterData: qb.query({
      query: () => ({
        url: `api/customer/filters`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        invalidatesTags: ["CUSTOMERS"],
      }),
      postDownloadDocument: qb.mutation({
        query: (user_id, data) => ({
          url: `api/customer/download-document/${user_id}`,
          method: "POST",
          body: {
            type: data.type,
          },
          // headers: {
          //   "Content-type": "application/json",
          // },
          invalidatesTags: ["CUSTOMERS"],
        }),
      }),
    }),
    postEmailApi: qb.mutation({
      query: (formData) => ({
        url: `api/customer/send-email`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["CUSTOMERS"],
      }),
    }),
    updateAutoTradeApi: qb.mutation({
      query: ({ user_id, autoTrade }) => {
        return {
          url: `api/customer/update-auto-trade/${user_id}`,
          method: "POST",
          body: autoTrade,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    postProfileDocApi: qb.mutation({
      query: ({ user_id, type }) => {
        return {
          url: `api/customer/download-document/${user_id}`,
          method: "POST",
          body: {
            type: type,
          },
          headers: {
            "Content-Type": "application/json",
          },
          transformResponse: (response) => response.result,
          providesTags: ["POSTDOCUMENT"],
        };
      },
    }),
    getPlanDetails: qb.query({
      query: (plan_id) => {
        return `api/plan/${plan_id}`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETPLAN"],
    }),
    postPlanDetails: qb.mutation({
      query: ({ user_id, payload }) => ({
        url: `api/customer/update-plan/${user_id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["UPDATECUSTOMERS"],
      }),
    }),
    updateExpiryDate: qb.mutation({
      query: ({ user_id, formData }) => ({
        url: `api/customer/update-expiry-date/${user_id}`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["EXPIRYCUSTOMERS"],
      }),
    }),
    postBlockCustomer: qb.mutation({
      query: (payload) => ({
        url: `https://fundzapi.demoninja.in/api/customer/block`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["BLOCKCUSTOMERS"],
      }),
    }),
    getRiskProfile: qb.query({
      query: () => {
        return `api/customer/get-risk-profile`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETRISK"],
    }),
    updateRiskProfile: qb.mutation({
      query: ({ user_id, payload }) => ({
        url: `api/customer/update-manual-risk-profile/${user_id}`,
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["UPDATECUSTOMERS"],
      }),
    }),

    getFamilyMembers: qb.query({
      query: (family_id) => {
        return `api/family/${family_id}`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETFAMILY"],
    }),

    getFamilyApi: qb.query({
      query: () => {
        return `api/family/undefined`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETFAMILY"],
    }),

    updateFamilyAdmin: qb.mutation({
      query: ({ user_id, payload }) => ({
        url: `api/family/admin-status`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["UPDATEADMIN"],
      }),
    }),
    postfamilyAdmin: qb.mutation({
      query: ({ name, users }) => ({
        url: `api/family`,
        method: "POST",
        body: {
          name: name,
          users: users, // Assuming users is a single user ID, wrap it in an array
        },
        invalidatesTags: ["NEW_FAMILY"],
      }),
    }),
    updateFamily: qb.mutation({
      query: ({ name, familyId, users }) => ({
        url: `api/family`,
        method: "PATCH",
        body: {
          name,
          familyId,
          users,
        },
        invalidatesTags: ["UPDATE_FAMILY"],
      }),
    }),

    // ------------Additional API----------------
    getAdditionalDetails: qb.query({
      query: (user_id) => {
        return `api/customer/get-additional-detail/${user_id}`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETADDITIONAL"],
    }),
    postAdditionalDetails: qb.mutation({
      query: ({ user_id, postData }) => ({
        url: `api/customer/add-additional-detail/${user_id}`,
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["UPDATEADMIN"],
      }),
    }),
    //  --------------------Add money --------------------  //

    postAddMoney: qb.mutation({
      query: (payload) => ({
        url: `api/customer/add-money/${payload.user_id}`,
        method: "POST",
        body: {
          ...payload.investments,
        },
        // body: payload,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        invalidatesTags: ["UPDATEADDMONEY"],
      }),
    }),
    //  --------------------Manage cash --------------------  //

    postManageCash: qb.mutation({
      query: (payload) => ({
        url: `api/customer/transfer-cash`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["ManageCash"],
      }),
    }),

    //  --------------------investment Type --------------------  //
    updateInvestmentDetails: qb.mutation({
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
  }),
});


export const customersApiReducer = Customers.reducer;

export const customersApiAction = {
  middleware: Customers.middleware,
  reducerPath: Customers.reducerPath,
  getCustomerListApi: Customers.useGetCustomerListApiMutation,
  getCustomerSearchingData: Customers.useGetCustomerSearchingDataMutation,
  getProductId: Customers.useGetProductIdQuery,
  postCustomerEmailApi: Customers.usePostCustomerEmailApi,
  postImportFile: Customers.usePostImportFileMutation,
  postAttachImportFile: Customers.usePostAttachImportFileMutation,
  updateCustomerApprove: Customers.useUpdateCustomerApproveMutation,
  getCustomerDetail: Customers.useGetCustomerDetailQuery,
  getSubscriptionPlan: Customers.useGetPlanCodeQuery,
  getCustomerPlan: Customers.useGetCustomerPlanQuery,
  getFilterData: Customers.useGetFilterDataQuery,
  postDownloadDocument: Customers.usePostDownloadDocumentMutation,
  postEmailApi: Customers.usePostEmailApiMutation,
  updateAutoTradeApi: Customers.useUpdateAutoTradeApiMutation,
  postProfileDocApi: Customers.usePostProfileDocApiMutation,
  getPlanDetails: Customers.useGetPlanDetailsQuery,
  postPlanDetails: Customers.usePostPlanDetailsMutation,
  getRiskProfile: Customers.useGetRiskProfileQuery,
  updateRiskProfile: Customers.useUpdateRiskProfileMutation,
  updateExpiryDate: Customers.useUpdateExpiryDateMutation,
  getFamilyMembers: Customers.useGetFamilyMembersQuery,
  postBlockCustomer: Customers.usePostBlockCustomerMutation,
  getFamilyApi: Customers.useGetFamilyApiQuery,
  newFamily: Customers.useNewFamilyMutation,
  updateFamily: Customers.useUpdateFamilyMutation,
  getAdditionalDetails: Customers.useGetAdditionalDetailsQuery,
  postAdditionalDetails: Customers.usePostAdditionalDetailsMutation,
  postAddMoney: Customers.usePostAddMoneyMutation,
  postManageCash: Customers.usePostManageCashMutation,
  updateInvestmentDetails: Customers.useUpdateInvestmentDetailsMutation,
};

export const {
  useCustomerListApiMutation,
  useGetProductIdQuery,
  useCustomerEmailApiMutation,
  usePostAttachImportFileMutation,
  useAttachImportFileMutation,
  useUpdateCustomerApproveMutation,
  useGetCustomerDetailQuery,
  useGetPlanCodeQuery,
  usePostCustomerEmailApi,
  usePostCustomerApiMutation,
} = Customers;
