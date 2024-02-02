// Import necessary functions and modules
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "stores/redux/apiSliceInterceptor";

const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: ["GETDASHBOARD"],
  endpoints: (qb) => ({
    getDashboardApi: qb.query({
      // Specify the API endpoint URL for fetching dashboard
      query: () => {
        return `api/dashboard?start_date=24-01-2024&end_date=28-02-2024
        `;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETDASHBOARD"],
    }),
  }),
});

export const dashboardApiReducer = dashboard.reducer;

export const dashboardApiAction = {
  middleware: dashboard.middleware,
  reducerPath: dashboard.reducerPath,
  getDashboardApi: dashboard.useGetDashboardApiQuery,
};
