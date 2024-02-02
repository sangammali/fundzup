import { createApi } from "@reduxjs/toolkit/query/react";

import { apiSliceInterceptor } from "../apiSliceInterceptor";

const todoApi = createApi({
  reducerPath: "todos",
  baseQuery: apiSliceInterceptor.baseQueryWithInterceptor,
  tagTypes: ["TODOS"],
  endpoints: (qb) => ({
    getTodos: qb.query({
      query: ({ limit = 10 }) => `/todos?limit=${limit}`,
      transformResponse: (response) => response.todos,
      providesTags: ["TODOS"],
    }),

    getTodoById: qb.query({
      query: (id) => `/todos/${id}`,
    }),

    createTodo: qb.mutation({
      query: ({ userId, todo }) => ({
        url: `/todos/add`,
        method: "POST",
        body: { userId, todo, completed: false },
        invalidatesTags: ["TODOS"],
      }),
    }),
  }),
});

export const todoApiReducer = todoApi.reducer;

export const todoApiAction = {
  middleware: todoApi.middleware,
  reducerPath: todoApi.reducerPath,
  getTodos: todoApi.useGetTodosQuery,
  getTodoById: todoApi.useGetTodoByIdQuery,
  createTodo: todoApi.useCreateTodoMutation,
};
