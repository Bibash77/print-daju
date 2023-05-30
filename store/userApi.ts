// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "useApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["User"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    SignUp: builder.mutation({
      query: (values) => {
  
        return {
          url: `/api/register`,
          method: "POST",
          body: values ,
          // prepareHeaders: (headers) => {
          //   headers.set("Content-Type", "multipart/form-data");
          //   return headers;
          // },
        };
      },
      invalidatesTags: ["User"],
    }),
    // getProductsData: builder.query<ProductData, void>({
    //   query: () => ({ url: "/products" }),
    // }),
    // getProductData: builder.query<ProductData, string>({
    //   query: (pid: string) => {
    //     return { url: `/products/${pid}` };
    //   },
    // }),
    // getRecommendationsData: builder.query<ProductData, void>({
    //   query: () => ({ url: "/recomendations" }),
    // }),
    // getHomeCarousel: builder.query({
    //     query: () => ({
    //       url: "/carousel",
    //       method: "GET",
    //     }),
    //     providesTags: ["Carousel"],
    //   }),
    //   createHomeCarousel: builder.mutation({
    //     query: (data) => {
    //       console.log(data);
    //       return {
    //         url: `carousel`,
    //         method: "POST",
    //         body: data,
    //         prepareHeaders: (headers) => {
    //           headers.set("Content-Type", "multipart/form-data");
    //           return headers;
    //         },
    //       };
    //     },
    //     invalidatesTags: ["Carousel"],
    //   }),
    //   getCarouselDetails: builder.query({
    //     query: (id) => {
    //       return {
    //         url: `/carousel/${id}`,
    //         method: "GET",
    //       };
    //     },
    //     providesTags: ["Carousel"],
    //   }),
    //   updateCarousel: builder.mutation({
    //     query: ({ id, data }) => {
    //       return {
    //         url: `/carousel/${id}`,
    //         method: "PUT",
    //         body: data,
    //         prepareHeaders: (headers) => {
    //           headers.set("Content-Type", "multipart/form-data");
    //           return headers;
    //         },
    //       };
    //     },

    //     invalidatesTags: ["Carousel"],
    //   }),
    //   deleteCarousel: builder.mutation({
    //     query: (id) => {
    //       return {
    //         url: `carousel/${id}`,
    //         method: "DELETE",
    //       };
    //     },
    //     invalidatesTags: ["Carousel"],
    //   }),

    //   createFeedback
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpMutation,
//   useGetProductDataQuery,
  util: { getRunningQueryThunk },
  endpoints: { SignUp },
} = userApi;
