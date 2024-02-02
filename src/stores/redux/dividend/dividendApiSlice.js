import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "stores/redux/apiSliceInterceptor";
import { dividendParser } from "../apiParser/dividendParser";
const Dividend = createApi({
  reducerPath: "Dividend",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: [
    "GETDIVIDEND",
    "GETDIVIDENDIDAPI",
    "GETCOMPANYAPI",
    "ADDDIVIDEND",
    "UPDATEDIVIDEND",
  ],
  endpoints: (qb) => ({
    getDividendApi: qb.query({
      query: () => {
        return `api/dividend-list`; // Adjust the endpoint as needed
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETDIVIDEND"],
    }),
    getDividendIdApi: qb.query({
      query: () => {
        return `api/dividend/3`; // Adjust the endpoint as needed
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETDIVIDENDIDAPI"],
    }),
    getCompanyApi: qb.query({
      query: () => {
        return `api/company`; // Adjust the endpoint as needed
      },
      transformResponse: dividendParser.allStocks,
      providesTags: ["GETCOMPANYAPI"],
    }),
    addDividendApi: qb.mutation({
      query: (data) => ({
        url: `api/dividend`,
        method: "POST",
        body: {
          stock_symbol: data.stock_symbol,
          date: data.date,
          percentage: data.percentage,
        },
        invalidatesTags: ["ADDDIVIDEND"],
      }),
    }),
    updateDividendApi: qb.mutation({
      query: (data) => ({
        url: `api/dividend`,
        method: "PATCH",
        body: {
          dividend_id: data.dividend_id,
          stock_symbol: data.stock_symbol,
          date: data.date,
          percentage: data.percentage,
        },
        invalidatesTags: ["UPDATEDIVIDEND"],
      }),
    }),
  }),
});

export const DividendApiReducer = Dividend.reducer;

export const dividendApiAction = {
  middleware: Dividend.middleware,
  reducerPath: Dividend.reducerPath,
  getDividendApi: Dividend.useGetDividendApiQuery,
  getDividendIdApi: Dividend.useGetDividendIdApiQuery,
  getCompanyApi: Dividend.useGetCompanyApiQuery,
  addDividendApi: Dividend.useAddDividendApiMutation,
  updateDividendApi: Dividend.useUpdateDividendApiMutation,
};
