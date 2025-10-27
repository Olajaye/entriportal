import { IUser } from "@/src/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateUserRequest {
  email: string;
  name?: string;
  password: string;
}

export interface UpdateUserRequest {
  id: string;
  email?: string;
  name?: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<any[], { estateId: string; userType?: string }>({
      query: (params) => {
        if (!params) return "/user";

        const searchParams = new URLSearchParams();
        if (params.estateId) searchParams.append("estateId", params.estateId);
        if (params.userType) searchParams.append("userType", params.userType);
        return {
          url: `/user?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    createUser: builder.mutation<any, CreateUserRequest>({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user",
        method: "PUT",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation<string, any>({
      query: (body) => ({
        url: "/user/forgetPassword",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/user/updatepassword",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = usersApi;
