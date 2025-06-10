// In your usersApi or create a new api slice for auth token

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API }),
    endpoints: (builder) => ({
        getToken: builder.mutation({
            query: (user) => ({
                url: '/auth/token',
                method: 'POST',
                body: user,
            })
        }),
    }),
});

export const { useGetTokenMutation } = authApi;
export default authApi;
