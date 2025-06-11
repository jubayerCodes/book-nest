import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}` }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        postUser: builder.mutation({
            query: (user) => ({
                url: '/protected/users',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: user,
            })
        }),
        getUser: builder.query({
            query: (email) => ({
                url: `/protected/users/${email}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
        }),
        getUsers: builder.query({
            query: (params = { page: 1, limit: 10 }) => {
                const { page, limit } = params;
                return {
                    url: `/admin/users?page=${page}&limit=${limit}`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            }
        })
    })
})

export const { usePostUserMutation, useGetUserQuery, useGetUsersQuery } = usersApi
export default usersApi