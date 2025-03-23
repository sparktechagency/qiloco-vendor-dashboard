import { api } from "../api/baseApi";

const policySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePolicy: builder.mutation({
      query: ({ id, updatedData }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["Policy"],
    }),

    policy: builder.query({
      query: () => "/api/v1/settings",
    }),
    providesTags: ["Policy"],
  }),
});

export const { usePolicyQuery, useUpdatePolicyMutation } = policySlice;
