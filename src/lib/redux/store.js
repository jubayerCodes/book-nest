import { configureStore } from "@reduxjs/toolkit"
import authReducer from '@/lib/redux/features/auth/authSlice'
import baseApi from "./api/baseApi"
import usersApi from "./api/usersApi"
import authApi from "./api/authApi"
import booksApi from "./api/booksApi"
import authorsApi from "./api/authorsApi"

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [baseApi.reducerPath]: baseApi.reducer,
            [usersApi.reducerPath]: usersApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [booksApi.reducerPath]: booksApi.reducer,
            [authorsApi.reducerPath]: authorsApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(baseApi.middleware)
                .concat(usersApi.middleware)
                .concat(authApi.middleware)
                .concat(booksApi.middleware)
                .concat(authorsApi.middleware)
    }
    )
}