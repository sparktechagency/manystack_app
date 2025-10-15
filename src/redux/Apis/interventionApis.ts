import { baseApi } from '../baseApi';

const interventionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
      query: data => ({
        url: 'api/intervention/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['intervention', "home", "auth"],
    }),
    // update intervention endpoint
    updateIntervention: builder.mutation({
      query: ({ data, id }) => ({
        url: `api/intervention/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['intervention', "home", "auth"],
    }),
    // delete intervention endpoint
    deleteIntervention: builder.mutation({
      query: id => ({
        url: `api/intervention/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['intervention', "home", "auth"],
    }),
    //delete image endpoint
    deleteImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/intervention/delete-image/${id}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['intervention', "home", "auth"],
    }),

    // get intervention by id endpoint
    getInterventionById: builder.query({
      query: id => `api/intervention/get-by-id/${id}`,
      providesTags: ['intervention', "home", "auth"],
    }),
  }),
});

export const {
  useGetInterventionsQuery,
  useCreateInterventionMutation,
  useUpdateInterventionMutation,
  useDeleteInterventionMutation,
  useDeleteImageMutation,
  useGetInterventionByIdQuery,
} = interventionApi;
