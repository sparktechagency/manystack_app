import { baseApi } from '../baseApi';

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    privacyPolicy: builder.query({
      query: () => ({
        url: 'api/dashboard/settings/privacy-policy/get',
        method: 'GET',
      }),
    }),
    termsAndConditions: builder.query({
      query: () => ({
        url: 'api/dashboard/settings/terms-conditions/get',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  usePrivacyPolicyQuery,
  useTermsAndConditionsQuery,
} = settingApi