import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentProduct: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/api/v1/admin/dashboard/products`,
        };
      },
    }),
    getEarningData: builder.query({
      query: (year) => {
        return {
          method: "GET",
          url: `/api/v1/vendor/dashboard/erarming?year=${year}`,
        };
      },
    }),
    getPrdouctSalingData: builder.query({
      query: (year) => {
        return {
          method: "GET",
          url: `/api/v1/vendor/dashboard/overview?year=${year}`,
        };
      },
    }),

    getTotal: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/api/v1/vendor/dashboard",
        };
      },
    }),
  }),
});

export const {
  useGetTotalQuery,
  useGetPrdouctSalingDataQuery,
  useGetEarningDataQuery,
  useGetRecentProductQuery,
} = authSlice;
