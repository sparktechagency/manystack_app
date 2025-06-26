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
  })
})

export const { } = subscriptionApi