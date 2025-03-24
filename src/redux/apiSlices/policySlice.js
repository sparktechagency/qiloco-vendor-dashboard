import { api } from "../api/baseApi";

const policySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePolicy: builder.mutation({
      query: (updatedData) => ({
        url: `/api/v1/settings`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Policy"], // Ensures refetch after update
    }),

    policy: builder.query({
      query: () => "/api/v1/settings",
      providesTags: ["Policy"], // Moved inside query object
    }),
  }),
});

export const { usePolicyQuery, useUpdatePolicyMutation } = policySlice;
