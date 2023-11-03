import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  // here, we could specify 'reducerPath', but if we don't mention, rtk automatically create one according to the name of the 'slice', that is for this case, 'apiSlice'.
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // We must define 'credentials' to pass token to the front-end through fetching. Otherwise, browser won't get cookies.
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
