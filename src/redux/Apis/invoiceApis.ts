import { baseApi } from '../baseApi'

const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get invoices endpoint
    getInvoices: builder.query({
      query: ({ search, limit, fromDate, toDate }) => ({
        url: 'api/invoices/get-all',
        method: 'GET',
        params: {
          search: search,
          limit: limit,
          fromDate: fromDate,
          toDate: toDate,
        },
      }),
      providesTags: ['invoice'],
    }),
    // create invoice endpoint
    createInvoice: builder.mutation({
      query: (data) => ({
        url: 'api/invoices/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['invoice'],
    }),
    // update invoice endpoint
    updateInvoice: builder.mutation({
      query: ({ data, id }) => ({
        url: `api/invoices/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['invoice'],
    }),
    // delete invoice endpoint
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `api/invoices/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['invoice'],
    }),
    // get invoice by id endpoint
    getInvoiceById: builder.query({
      query: (id) => `api/invoices/get-by-id/${id}`,
      providesTags: ['invoice'],
    }),
  }),
})

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi
