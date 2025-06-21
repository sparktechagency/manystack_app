import { baseApi } from '../baseApi'

const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get expenses endpoint
    getExpenses: builder.query({
      query: ({ limit, fromDate, toDate, search }) => ({
        url: 'api/expense/get-all',
        method: 'GET',
        params: {
          search: search,
          limit: limit,
          fromDate: fromDate,
          toDate: toDate,
        },
      }),
      providesTags: ['expenses'],
    }),
    // create expense endpoint
    createExpense: builder.mutation({
      query: (data) => ({
        url: 'api/expense/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['expenses'],
    }),
    // update expense endpoint
    updateExpense: builder.mutation({
      query: ({ data, id }) => ({
        url: `api/expense/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['expenses'],
    }),
    // delete expense endpoint
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `api/expense/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expenses'],
    }),
    // get expense by id endpoint
    getExpenseById: builder.query({
      query: (id) => `api/expense/get-by-one/${id}`,
      providesTags: ['expenses'],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseByIdQuery,
  useLazyGetExpenseByIdQuery,
  useLazyGetExpensesQuery,
} = expensesApi
