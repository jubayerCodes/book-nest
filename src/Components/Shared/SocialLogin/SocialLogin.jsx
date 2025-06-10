"use client"

import { usePostUserMutation } from '@/lib/redux/api/usersApi';
import { googleSignIn } from '@/lib/redux/features/auth/authSlice';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const SocialLogin = () => {

    const [postUser] = usePostUserMutation();

    const dispatch = useDispatch()

    const handleGoogleLogin = async () => {
        const googleSignInPromise = async () => {
            const result = await dispatch(googleSignIn())

            if (googleSignIn.fulfilled.match(result)) {
                const { user_email, user_id, user_name, user_img } = result.payload;
                const res = await postUser({
                    user_email,
                    user_id,
                    user_name,
                    user_img
                })

                if (res.data.success) {
                    return {
                        user_email,
                        user_id,
                        user_name,
                        user_img
                    }
                }
                else if (!res.data.exist) {
                    throw new Error("Database insertion failed");
                }
            } else {
                console.log(result);
                throw new Error(result.payload == "Firebase: Error (auth/email-already-in-use)." ? "Email already in use" : "Something went wrong");
            }
        }

        toast.promise(googleSignInPromise(), {
            loading: 'Signing In...',
            success: (data) => `Sign in successful!`,
            error: (err) => err.message || "Something went wrong",
            position: "top-center"
        });
    }

    return (
        <div>
            <button className="btn-social" onClick={() => handleGoogleLogin()}>
                <FaGoogle /> Continue With Google
            </button>
        </div>
    );
};

export default SocialLogin;