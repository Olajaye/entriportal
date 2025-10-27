import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tenantApi = createApi({
  reducerPath: "tenantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["tenant"],
  endpoints: (builder) => ({
    createEstateAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "/tenant/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateEstateAdminMutation } = tenantApi;
