import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation({
      query: ({ status, id }) => {
        return {
          url: `/api/v1/orders/${id}`,
          method: "PATCH",
          body: { status }, // Send status as the body
        };
      },
      invalidatesTags: ["Status"],
    }),

    getOrder: builder.query({
      query: () => ({
        method: "GET",
        url: "/api/v1/orders",
      }),
    }),
    providesTags: ["Status"],
  }),
});

export const { useGetOrderQuery, useUpdateOrderStatusMutation } = orderSlice;
