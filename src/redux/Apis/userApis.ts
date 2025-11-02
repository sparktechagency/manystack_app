import { baseApi } from '../baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // get profile endpoint
    getProfile: builder.query({
      query: () => 'api/user/profile',
      providesTags: ['auth'],
    }),

    // update profile endpoint
    updateProfile: builder.mutation({
      query: data => ({
        url: 'api/user/profile/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    // change password endpoint
    changePassword: builder.mutation({
      query: data => ({
        url: 'api/user/profile/change-password',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    //upload logo endpoint
    uploadLogo: builder.mutation({
      query: data => ({
        url: '/api/user/profile/upload-picture',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    // delete account endpoint
    deleteAccount: builder.mutation({
      query: () => ({
        url: 'api/user/delete',
        method: 'DELETE',
      }),
      invalidatesTags: ['auth'],
    }),
    // support endpoint
    support: builder.mutation({
      query: data => ({
        url: 'api/support/create',
        method: 'POST',
        body: data,
      }),
    }),
    // get Home  page data
    getHomePageData: builder.query({
      query: (month) =>{
        return {
          url: 'api/home/dashboard',
          method: 'GET',
          params: {
            month: month
          }
        }
      },
      providesTags: ['auth', "home"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadLogoMutation,
  useDeleteAccountMutation,
  useGetHomePageDataQuery,
  useSupportMutation,
} = userApi;
