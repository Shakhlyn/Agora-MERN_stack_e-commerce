import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      //specifies a cache lifetime in seconds
      //By default, unused data is removed from the cache after 60 seconds
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        //this parameter is passed from the 'jsx/ component, for this case, 'productScreen'
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;