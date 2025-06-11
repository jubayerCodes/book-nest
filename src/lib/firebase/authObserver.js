import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase.config"
import { clearUser, setUser, setLoading, setRole } from "../redux/features/auth/authSlice"
import usersApi from "../redux/api/usersApi";

export const observeAuthState = (store) => {

    store.dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
        if (user) {

            store.dispatch(usersApi.endpoints.getUser.initiate(user?.email))
                .then(res => {
                    if (!res.isSuccess) {
                        store.dispatch(clearUser());
                        store.dispatch(setRole(null));
                        return {}
                    }
                    if (res.data.exist) {

                        const newUser = {
                            user_email: res?.data?.user?.user_email,
                            user_id: res?.data?.user?.user_id,
                            user_name: res?.data?.user?.user_name,
                            user_img: res?.data?.user?.user_img,
                            user_role: res?.data?.user?.user_role
                        }

                        store.dispatch(setUser(newUser))
                        store.dispatch(setRole(res?.data?.user?.user_role))
                    }
                })
        } else {
            store.dispatch(clearUser());
            store.dispatch(setRole(null));
        }
    })
}