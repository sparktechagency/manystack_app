import AsyncStorage from '@react-native-async-storage/async-storage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrls'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      if (!headers.has('Authorization')) {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
      return headers
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["auth", "category", "intervention", "invoice", "expenses"],
})