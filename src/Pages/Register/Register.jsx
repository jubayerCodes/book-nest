"use client"
import dynamic from 'next/dynamic';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Register.css';
import Link from 'next/link';
import { setRole, setUser, signUp } from '@/lib/redux/features/auth/authSlice';
import { usePostUserMutation } from '@/lib/redux/api/usersApi';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import Separator from '@/Components/Shared/Separator/Separator';
import SocialLogin from '@/Components/Shared/SocialLogin/SocialLogin';

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const authState = useSelector(state => state.auth)
    const { loading, error } = authState
    const dispatch = useDispatch()

    const [postUser] = usePostUserMutation();

    const handleRegister = async (data) => {
        const { email, confirmEmail, password } = data;

        if (email !== confirmEmail) {
            alert("Emails do not match");
            return;
        }

        const registerPromise = async () => {
            // Sign up with Firebase
            const resultAction = await dispatch(signUp({ email, password }));

            // Check if signUp was successful
            if (signUp.fulfilled.match(resultAction)) {
                const { user_email, user_id, user_name, user_img } = resultAction.payload;

                const res = await postUser({
                    user_email,
                    user_id,
                    user_name,
                    user_img,
                    user_role: 'user'
                })

                if (res.data.success) {
                    reset()
                    const user = {
                        user_email: res?.data?.user?.user_email,
                        user_id: res?.data?.user?.user_id,
                        user_name: res?.data?.user?.user_name,
                        user_img: res?.data?.user?.user_img,
                        user_role: res?.data?.user?.user_role
                    }
                    return user
                }
                else {
                    throw new Error("Database insertion failed");
                }
            } else {
                throw new Error(resultAction.payload == "Firebase: Error (auth/email-already-in-use)." ? "Email already in use" : "Something went wrong");
            }
        }

        toast.promise(registerPromise(), {
            loading: 'Creating account...',
            success: (data) => `Registered successful!`,
            error: (err) => err.message || "Something went wrong",
            position: "top-center"
        });
    };

    return (
        <>
            <section className='register'>
                <div className="register-container">
                    <h4>Create Account</h4>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="input-field">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name='email' id='email' className='input' {...register("email")} required />
                        </div>
                        <div className="input-field">
                            <label htmlFor="confirm-email">Confirm email address</label>
                            <input type="email" name='confirmEmail' id='confirm-email' className='input' {...register("confirmEmail")} required />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' className='input' {...register("password")} required />
                        </div>

                        <p className="terms">
                            By continuing you confirm that you agree to the <Link href={'#'}>Terms of Use</Link> and confirm that you have read the <Link href={'#'}>Privacy Policy</Link>, updated June 1, 2025.
                        </p>
                        <input type="submit" value="Create Account" className='btn' />
                    </form>
                    <h5>Have an account? <Link href={'/login'}>Login</Link></h5>
                    <Separator text={'or'} gap={30} />
                    <SocialLogin />
                </div>
            </section>
        </>
    );
};

export default dynamic(() => Promise.resolve(Register), { ssr: false });