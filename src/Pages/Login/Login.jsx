"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from '@/lib/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import Separator from '@/Components/Shared/Separator/Separator';
import SocialLogin from '@/Components/Shared/SocialLogin/SocialLogin';
import { usePostUserMutation } from '@/lib/redux/api/usersApi';


const Login = () => {

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
    const router = useRouter()

    const [postUser] = usePostUserMutation();

    const handleLogin = async (data) => {
        const { email, password } = data;

        const loginPromise = async () => {
            const resultAction = await dispatch(signIn({ email, password }));

            if (signIn.fulfilled.match(resultAction)) {
                const { user_email, user_id, user_name, user_img } = resultAction.payload;


                const existing = { user_email, user_id, user_name, user_img }

                reset()
                router.push("/")

                return existing
            } else {
                console.log("Login failed:", resultAction);
                throw new Error(resultAction.payload == "Firebase: Error (auth/invalid-credential)." ? "Invalid credentials" : "Something went wrong")
            }
        }

        toast.promise(loginPromise(), {
            loading: 'Signing in...',
            success: (data) => `Sign in successful!`,
            error: (err) => err.message || "Something went wrong",
            position: "top-center"
        });
    };

    return (
        <>
            <section className='register'>
                <div className="register-container">
                    <h4>Sign In</h4>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="input-field">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name='email' id='email' className='input' {...register("email")} required />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' className='input' {...register("password")} required />
                        </div>

                        <p className="terms">
                            By continuing you agree to the <Link href={'#'}>Terms of Use</Link> and <Link href={'#'}>Privacy Policy</Link>, updated June 1, 2025.
                        </p>
                        <input type="submit" value="Sign In" className='btn' />
                    </form>
                    <h5>No account? <Link href={'/register'}>Create Account</Link></h5>
                    <Separator text={'or'} gap={30} />
                    <SocialLogin />
                </div>
            </section>
        </>
    );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });