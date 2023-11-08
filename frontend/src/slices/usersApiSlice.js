import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["users"],
      keepUnusedDataFor: 20,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = usersApiSlice;
