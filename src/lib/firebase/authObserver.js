import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase.config"
import { clearUser, setUser, setLoading } from "../redux/features/auth/authSlice"

export const observeAuthState = (store) => {

    store.dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch(setUser({
                user_email: user.email,
                user_id: user.uid,
                user_name: user.displayName,
                user_img: user.photoURL,
            }))
        } else {
            store.dispatch(clearUser());
        }
    })
}