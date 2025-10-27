import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accessCodeApi = createApi({
  reducerPath: "accessCodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["AccessCodes"],
  endpoints: (builder) => ({
    getAccessCodes: builder.query({
      query: (residentId: string) => ({
        url: `/accessCodes?residentId=${residentId}`,
      }),
      providesTags: ["AccessCodes"],
    }),
    getEstateAccessCodes: builder.query({
      query: (estateId: string) => ({
        url: `/accessCodes/estate/?estateId=${estateId}`,
      }),
      providesTags: ["AccessCodes"],
    }),
    generateAccessCode: builder.mutation({
      query: (body) => ({
        url: `/accessCodes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AccessCodes"],
    }),
    verifyAccessCode: builder.mutation({
      query: (body: { code: string }) => ({
        url: `/accessCodes/verify`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAccessCodesQuery,
  useLazyGetAccessCodesQuery,
  useLazyGetEstateAccessCodesQuery,
  useGenerateAccessCodeMutation,
  useVerifyAccessCodeMutation,
} = accessCodeApi;
