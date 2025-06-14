import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API }),
    endpoints: (builder) => ({
        postCategory: builder.mutation({
            query: (category) => ({
                url: '/admin/categories',
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: category,
            })
        }),
        getAdminCategories: builder.query({
            query: () => ({
                url: `/admin/categories`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })
        })
    }),
});

export const { usePostCategoryMutation, useGetAdminCategoriesQuery } = booksApi;
export default booksApi;