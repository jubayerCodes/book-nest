import { auth } from "@/lib/firebase/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import authApi from "../../api/authApi";

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

            sessionStorage.setItem("token", result?.data?.token)

            return {
                user_email: user.email,
                user_id: user.uid,
                user_name: null,
                user_img: null,
            };
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

            sessionStorage.setItem("token", result?.data?.token)

            return {
                user_email: user.email,
                user_id: user.uid,
                user_name: user?.displayName,
                user_img: user?.photoURL
            };
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

            console.log(result);

            if (!result?.data?.success) {
                throw new Error('Failed to get JWT token');
            }

            sessionStorage.setItem("token", result?.data?.token)

            return {
                user_email: user?.email,
                user_id: user?.uid,
                user_name: user?.displayName,
                user_img: user?.photoURL
            };
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

            sessionStorage.removeItem("token")

            return null;
        } catch (error) {
            return rejectWithValue(error?.message || "Google Sign-in failed");
        }
    }
)

const initialState = {
    user: null,
    loading: true,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.loading = false;
            state.error = null
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(googleSignIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logOut.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
    }
})

export const { setUser, clearUser, setLoading } = authSlice.actions

export default authSlice.reducer