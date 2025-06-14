import { auth } from "@/lib/firebase/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import authApi from "../../api/authApi";
import usersApi from "../../api/usersApi";

const googleProvider = new GoogleAuthProvider()

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            const result = await dispatch(authApi.endpoints.getToken.initiate({
                user_id: user.uid,
                user_email: user.email,
            }))

            if (!result?.data?.success) {
                throw new Error('Failed to get JWT token');
            }

            localStorage.setItem("token", result?.data?.token)



            if (result?.data?.token) {
                const res = await dispatch(usersApi.endpoints.postUser.initiate({
                    user_email: user?.email,
                    user_id: user?.uid,
                    user_name: user?.displayName,
                    user_img: user?.photoURL,
                    user_role: "user"
                }))

                if (res.data.success || res.data.exist) {


                    return {
                        user_email: res?.data?.user?.user_email,
                        user_id: res?.data?.user?.user_id,
                        user_name: res?.data?.user?.user_name,
                        user_img: res?.data?.user?.user_img,
                        user_role: res?.data?.user?.user_role
                    };
                }
                else {
                    throw new Error("Database insertion failed");
                }
            } else {
                return rejectWithValue("Token not found!");
            }
        } catch (error) {
            return rejectWithValue(error?.message || "Sign-up failed");
        }
    }
)


export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            const result = await dispatch(authApi.endpoints.getToken.initiate({
                user_id: user.uid,
                user_email: user.email,
            }))

            if (!result?.data?.success) {
                throw new Error('Failed to get JWT token');
            }

            localStorage.setItem("token", result?.data?.token)

            if (result?.data?.token) {
                const res = await dispatch(usersApi.endpoints.getUser.initiate(user?.email))

                if (!res.isSuccess) {
                    return rejectWithValue(error?.message || "Sign-in failed");
                }
                if (res.data.exist) {

                    const newUser = {
                        user_email: res?.data?.user?.user_email,
                        user_id: res?.data?.user?.user_id,
                        user_name: res?.data?.user?.user_name,
                        user_img: res?.data?.user?.user_img,
                        user_role: res?.data?.user?.user_role
                    }

                    return newUser;
                }
            } else {
                return rejectWithValue("Token not found!");
            }
        } catch (error) {
            return rejectWithValue(error?.message || "Sign-in failed");
        }
    }
)

export const googleSignIn = createAsyncThunk(
    "auth/googleSignIn",
    async (n, { rejectWithValue, dispatch }) => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider)
            const user = userCredential.user

            const result = await dispatch(authApi.endpoints.getToken.initiate({
                user_id: user.uid,
                user_email: user.email,
            }))

            if (!result?.data?.success) {
                throw new Error('Failed to get JWT token');
            }

            localStorage.setItem("token", result?.data?.token)


            if (result?.data?.token) {

                const res = await dispatch(usersApi.endpoints.postUser.initiate({
                    user_email: user?.email,
                    user_id: user?.uid,
                    user_name: null,
                    user_img: null,
                    user_role: "user"
                }))

                if (res.data.success || res.data.exist) {

                    return {
                        user_email: res?.data?.user?.user_email,
                        user_id: res?.data?.user?.user_id,
                        user_name: res?.data?.user?.user_name,
                        user_img: res?.data?.user?.user_img,
                        user_role: res?.data?.user?.user_role
                    };
                }
                else {
                    throw new Error("Database insertion failed");
                }

            } else {
                return rejectWithValue("Token not found!");
            }

        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.message || "Google Sign-in failed");
        }
    }
)

export const logOut = createAsyncThunk(
    "auth/logOut",
    async (n, { rejectWithValue }) => {
        try {
            const userCredential = await signOut(auth)

            localStorage.removeItem("token")

            return null;
        } catch (error) {
            return rejectWithValue(error?.message || "Google Sign-in failed");
        }
    }
)

const initialState = {
    user: null,
    loading: true,
    error: null,
    role: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.role = action?.payload?.user_role
            state.error = null
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.role = null;
            state.error = null
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload
                state.role = action?.payload?.user_role
                state.loading = false
            })
            .addCase(signIn.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload
                state.role = action?.payload?.user_role
                state.loading = false
            })
            .addCase(googleSignIn.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = action.payload
                state.role = action?.payload?.user_role
                state.loading = false
            })
            .addCase(logOut.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(logOut.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.user = action.payload
                state.role = null
                state.loading = false
            })
    }
})

export const { setUser, clearUser, setLoading } = authSlice.actions

export default authSlice.reducer