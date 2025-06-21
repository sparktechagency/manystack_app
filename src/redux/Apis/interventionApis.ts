import { baseApi } from '../baseApi'

const interventionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get interventions endpoint
    getInterventions: builder.query({
      query: ({ limit, fromDate, toDate, search }) => ({
        url: 'api/intervention/get-all',
        method: 'GET',
        params: {
          search: search,
          limit: limit,
          fromDate: fromDate,
          toDate: toDate,
        },
      }),
      providesTags: ['intervention'],
    }),
    // create intervention endpoint
    createIntervention: builder.mutation({
      query: (data) => ({
        url: 'api/intervention/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['intervention'],
    }),
    // update intervention endpoint
    updateIntervention: builder.mutation({
      query: ({ data, id }) => ({
        url: `api/intervention/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['intervention'],
    }),
    // delete intervention endpoint
    deleteIntervention: builder.mutation({
      query: (id) => ({
        url: `api/intervention/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['intervention'],
    }),
    //delete image endpoint
    deleteImage: builder.mutation({
      query: ({ id, }) => ({
        url: `api/intervention/delete-image/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['intervention'],
    }),

    // get intervention by id endpoint
    getInterventionById: builder.query({
      query: (id) => `api/intervention/get-by-id/${id}`,
      providesTags: ['intervention'],
    }),

  }),
})

export const {
  useGetInterventionsQuery,
  useCreateInterventionMutation,
  useUpdateInterventionMutation,
  useDeleteInterventionMutation,
  useDeleteImageMutation,
  useGetInterventionByIdQuery,
} = interventionApi
