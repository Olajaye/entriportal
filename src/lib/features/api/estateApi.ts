import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";

export interface Estate {
  id: string;
  estateName: string;
  paymentReference: string | null;
  slug: string;
  estatePlan: string;
  tenantAdminId: string;
  isPaymentVerified: boolean;
  paymentVerifiedAt: string | null;
  estateAddressId: number;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
  paymentStatus: string;
  estateAddress: {
    id: number;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  tenantAdmin: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const estateApi = createApi({
  reducerPath: "estateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Estates", "Estate"],
  endpoints: (builder) => ({
    getAllEstate: builder.query<
      { estates: Estate[] },
      { search?: string; ts?: number }
    >({
      query: ({ search = "", ts }) => ({
        url: "/estate",
        params: { search }, // Optional: for backend filtering
      }),
      // no cache tags needed since we want fresh data
    }),
    getEstateBySlgu: builder.query<Estate, string>({
      query: (slug) => ({
        url: `/estate/${slug}`,
      }),
      providesTags: ["Estate"],
    }),
  }),
});

export const {
  useLazyGetAllEstateQuery,
  useLazyGetEstateBySlguQuery,
  useGetAllEstateQuery,
} = estateApi;
