import { ShopApiData, productData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

// Define a service using a base URL and expected endpoints

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Product"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    createProduct: builder.mutation<productData, void>({
      query: (values) => {
        return {
          url: `/api/product`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getAllProducts: builder.mutation<productData, void>({
      query: () => {
        return {
          url: `/api/product`,
          method: "GET",
        };
      },
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.mutation<productData, void>({
      query: (id) => {
        return {
          url: `/api/product/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<productData, void>({
      query: (id) => {
        return {
          url: `/api/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }: any) => {
        return {
          url: `/api/product/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsMutation,
  useGetProductByIdMutation,
  useUpdateProductMutation,
  util: { getRunningQueryThunk },
  endpoints: {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
  },
} = productApi;
