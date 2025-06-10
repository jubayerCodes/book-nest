import { auth } from "@/lib/firebase/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider()

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            return {
                user_email: user.email,
                user_id: user.uid,
                user_name: "",
                user_img: ""
            };
        } catch (error) {
            return rejectWithValue(error?.message || "Sign-up failed");
        }
    }
)


export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            return {
                user_email: user.email,
                user_id: user.uid,
                user_name: "",
                user_img: ""
            };
        } catch (error) {
            return rejectWithValue(error?.message || "Sign-in failed");
        }
    }
)

export const googleSignIn = createAsyncThunk(
    "auth/googleSignIn",
    async (n, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider)
            const user = userCredential.user
            return {
                user_email: user?.email,
                user_id: user?.uid,
                user_name: user?.displayName,
                user_img: user?.photoURL
            };
        } catch (error) {
            return rejectWithValue(error?.message || "Google Sign-in failed");
        }
    }
)

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
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
    }
})

export const { setUser, clearUser, setLoading } = authSlice.actions

export default authSlice.reducer