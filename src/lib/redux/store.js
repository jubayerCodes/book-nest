import { configureStore } from "@reduxjs/toolkit"
import authReducer from '@/lib/redux/features/auth/authSlice'
import baseApi from "./api/baseApi"
import usersApi from "./api/usersApi"

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [baseApi.reducerPath]: baseApi.reducer,
            [usersApi.reducerPath]: usersApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(baseApi.middleware)
                .concat(usersApi.middleware)
    }
    )
}