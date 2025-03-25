import { api } from "../api/baseApi";

const earningSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    earning: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/api/v1/vendor/earnings?page=${page}`,
        };
      },
    }),
  }),
});

export const { useEarningQuery } = earningSlice;
