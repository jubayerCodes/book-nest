"use client"

import { usePostUserMutation } from '@/lib/redux/api/usersApi';
import { googleSignIn } from '@/lib/redux/features/auth/authSlice';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const SocialLogin = () => {


    const dispatch = useDispatch()

    const handleGoogleLogin = async () => {
        const googleSignInPromise = async () => {
            const result = await dispatch(googleSignIn())

            if (googleSignIn.rejected) {
                throw new Error("Something went wrong")
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