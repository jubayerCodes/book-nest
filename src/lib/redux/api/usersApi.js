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
        })
    })
})

export const { usePostUserMutation, useGetUserQuery } = usersApi
export default usersApi