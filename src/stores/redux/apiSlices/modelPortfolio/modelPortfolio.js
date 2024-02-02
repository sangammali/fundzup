import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "stores/redux/apiSliceInterceptor";

const ModelPortFolio = createApi({
  reducerPath: "ModelPortFolio",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: [
    "GETMODELPORTFOLIO",
    "ADDRISKPROFILE",
    "UPDATERISKPROFILE",
    "GETCUSTOMERLIST",
  ],
  endpoints: (qb) => ({
    getModelPortFolioApi: qb.query({
      query: () => {
        return `api/risk-profile`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETMODELPORTFOLIO"],
    }),
    getCustomerListApi: qb.query({
      query: (id) => {
        return `api/risk-profile/customer-list/${id}`;
      },
      transformResponse: (response) => response.result,
      providesTags: (result, error, id) => [{ type: "GETCUSTOMERLIST", id }],
    }),
    addStockApi: qb.mutation({
      query: (data) => ({
        url: `api/risk-profile`,
        method: "POST",
        body: {
          risk_profile_id: data.risk_profile_id,
          cash_percent: data.cash_percent,
          stocks: [
            {
              symbol: data.stocks[0].symbol,
              allocation_percent: data.stocks[0].allocation_percent,
            },
          ],
        },
        invalidatesTags: ["ADDRISKPROFILE"],
      }),
    }),
    updateStockApi: qb.mutation({
      query: (data) => {
        const stocksPayload = data.stocks.map((stock) => ({
          model_portfolio_detail_id: stock.model_portfolio_detail_id,
          symbol: stock.symbol,
          allocation_percent: stock.allocation_percent,
        }));

        const addStockPayload = data.addStock
          .filter(
            (newStock) =>
              newStock.allocation_percent !== 0 && newStock.symbol.trim() !== ""
          )
          .map((newStock) => ({
            symbol: newStock.symbol,
            allocation_percent: newStock.allocation_percent,
          }));

        const payload = {
          model_portfolio_id: data.model_portfolio_id,
          cash_percent: data.cash_percent,
          stocks: stocksPayload,
        };

        // Add addStock payload regardless of whether it's empty or not
        payload.addStock = addStockPayload;

        return {
          url: `api/risk-profile`,
          method: "PATCH",
          body: payload,
          invalidatesTags: ["UPDATERISKPROFILE"],
        };
      },
    }),
  }),
});

export const ModelPortFolioApiReducer = ModelPortFolio.reducer;

export const modelPortFolioApiAction = {
  middleware: ModelPortFolio.middleware,
  reducerPath: ModelPortFolio.reducerPath,
  getModelPortFolioApi: ModelPortFolio.useGetModelPortFolioApiQuery,
  getCustomerListApi: ModelPortFolio.useGetCustomerListApiQuery,
  addStockApi: ModelPortFolio.useAddStockApiMutation,
  updateStockApi: ModelPortFolio.useUpdateStockApiMutation,
};
