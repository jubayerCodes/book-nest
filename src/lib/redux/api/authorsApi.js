import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authorsApi = createApi({
    reducerPath: 'authorsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API }),
    endpoints: (builder) => ({
        postAuthor: builder.mutation({
            query: (author) => ({
                url: '/admin/authors',
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: author
            })
        }),
        getAuthors: builder.query({
            query: () => ({
                url: `/public/authors`
            })
        })
    }),
});

export const { usePostAuthorMutation, useGetAuthorsQuery } = authorsApi;
export default authorsApi;