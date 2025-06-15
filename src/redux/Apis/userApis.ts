import { baseApi } from '../baseApi'

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get profile endpoint
    getProfile: builder.query({
      query: () => 'api/user/profile',
      providesTags: ['auth'],
    }),

    // update profile endpoint
    updateProfile: builder.mutation({
      query: (data) => ({
        url: 'api/user/profile/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    // change password endpoint
    changePassword: builder.mutation({
      query: (data) => ({
        url: 'api/user/profile/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    //upload logo endpoint
    uploadLogo: builder.mutation({
      query: (data) => ({
        url: '/api/user/profile/upload-logo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    // delete account endpoint
    deleteAccount: builder.mutation({
      query: () => ({
        url: 'api/user/profile/delete-account',
        method: 'DELETE',
      }),
      invalidatesTags: ['auth'],
    }),

  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadLogoMutation,
  useDeleteAccountMutation,
} = userApi


