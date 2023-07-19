import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5050' }),
  tagTypes: ['Posts, Post'],
  // global keepUnusedDataFor configuration for the api
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
});

export default apiSlice;
