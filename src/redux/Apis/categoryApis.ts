import {baseApi} from '../baseApi';

const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // get categories endpoint
    getCategories: builder.query({
      query: () => 'api/category/get-all',
      providesTags: ['category'],
    }),
    // create category endpoint
    createCategory: builder.mutation({
      query: data => ({
        url: 'api/category/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['category'],
    }),
    // update category endpoint
    updateCategory: builder.mutation({
      query: ({data, id}) => ({
        url: `api/category/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['category'],
    }),
    // delete category endpoint
    deleteCategory: builder.mutation({
      query: id => ({
        url: `api/category/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
