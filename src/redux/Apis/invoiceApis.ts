import { baseApi } from '../baseApi'

const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get invoices endpoint
    getInvoices: builder.query({
      query: () => 'api/invoices/get-all',
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
