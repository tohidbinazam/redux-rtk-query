import apiSlice from '../api/apiSlice';

const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result, error, arg) => ['Posts'],
      // configuration for an individual endpoint, overriding the api keepUnusedDataFor setting
      keepUnusedDataFor: 5,
    }),
    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => ['Post', { type: 'Post', id: arg }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => ['Posts'],

    }),
    editPost: builder.mutation({
      query: (body) => ({
        url: `/posts/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => ['Posts', 'Post'],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useCreatePostMutation,
} = postSlice;
