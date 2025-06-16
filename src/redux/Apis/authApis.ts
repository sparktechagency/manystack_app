import { baseApi } from '../baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      query: (data) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    //register endpoint
    register: builder.mutation({
      query: (data) => ({
        url: 'api/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    //forget password endpoint
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: 'api/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),
    //reset password endpoint
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'api/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    // verify email endpoint
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: 'api/auth/verify-code',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: 'api/auth/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
} = authApi
