import { baseApi } from '../baseApi';

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: 'api/dashboard/subscription/get-all',
        method: 'GET',
      }),
    }),
    createSubscription: builder.mutation({
      query: (data) => ({
        url: 'api/subscription/create',
        method: 'POST',
        body: data,
      }),
    }),
    updateSubscription: builder.mutation({
      query: ({ data, id }) => ({
        url: `api/subscription/update/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `api/subscription/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    subscriptionPayment: builder.mutation({
      query: (data) => ({
        url: '/api/stripe/create-checkout-session',
        method: 'POST',
        body: data,
      }),
    }),
    getCurrentSubscription: builder.query({
      query: () => ({
        url: 'api/user/subscription',
        method: 'GET',
      }),
      providesTags: ['subscription'],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: 'api/stripe/cancel-subscription',
        method: 'DELETE',
      }),
      invalidatesTags: ['subscription'],
    }),
  })
})

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useSubscriptionPaymentMutation,
  useGetCurrentSubscriptionQuery,
  useCancelSubscriptionMutation,
} = subscriptionApi