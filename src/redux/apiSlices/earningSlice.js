import { api } from "../api/baseApi";

const earningSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    earning: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/api/v1/vendor/earnings`,
        };
      },
    }),
  }),
});

export const { useEarningQuery } = earningSlice;
