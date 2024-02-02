
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSliceInterceptor } from "stores/redux/apiSliceInterceptor";

const Family = createApi({
  reducerPath: "Family",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: ["GETFAMILY", "GETFAMILYUSERLIST"],
  endpoints: (qb) => ({
    getFamilyApi: qb.query({
      query: () => {
        return `api/family/undefined`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETFAMILY"],
    }),

    getFamilyUsersList: qb.query({
      query: () => {
        return `api/family-users-list`;
      },
      transformResponse: (response) => response.result,
      providesTags: ["GETFAMILYUSERLIST"],
    }),


    newFamily: qb.mutation({
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
        query: ({ name, familyId,users}) => ({
          url: `api/family`,
          method: "PATCH",
          body: {
            name,familyId,users

          },
          invalidatesTags: ["UPDATE_FAMILY"],
        }),
      }),


      
        updateAdmin: qb.mutation({
        query: ({ isAdmin, familyId,userId}) => ({
          url: `api/family/admin-status`,
          method: "PATCH",
          body: {
            isAdmin,familyId,userId

          },
          invalidatesTags: ["UPDATE_ADMIN"],
        }),
      }),


      
  }),
});

export const FamilyApiReducer = Family.reducer;

export const familyApiAction = {
  middleware: Family.middleware,
  reducerPath: Family.reducerPath,
  getFamilyApi: Family.useGetFamilyApiQuery,
  getFamilyUsersList: Family.useGetFamilyUsersListQuery, // Use the correct query function
  newFamily:Family.useNewFamilyMutation,
  updateFamily:Family.useUpdateFamilyMutation,
  updateAdmin:Family.useUpdateAdminMutation,

};