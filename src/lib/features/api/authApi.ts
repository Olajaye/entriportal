import { estateApi } from "./estateApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { log } from "console";

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
  estateId: string;
}

export interface UpdateUserRequest {
  id: string;
  email?: string;
  name?: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginFormProps>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
