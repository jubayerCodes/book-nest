"use client"
import React from 'react';
import logo from "@/assets/images/booknest-logo.png"
import { FiHeart, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import './Header.css'
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/lib/redux/features/auth/authSlice';
import { toast } from 'sonner';

const Header = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const path = usePathname()
    if (path.startsWith('/dashboard')) {
        return <></>
    }

    const handleLogout = async () => {
        dispatch(logOut())
            .then(res => {
                if (logOut.fulfilled.match(res)) {
                    toast.success("Sign out successful!", { position: "top-right" })
                }
            })
    }
    return (
        <header className='header py-4 border-b border-[var(--border-color)]'>
            <div className="my-container header-container grid grid-cols-12 items-center gap-8">
                <div className="header-search col-span-8 flex gap-8">
                    <Link href={'/'}>
                        <img src={logo.src} alt="Book Nest" className='w-[120px]' />
                    </Link>
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search for books..."
                            className="w-full p-3 border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        <button
                            type="button"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-4 cursor-pointer rounded-full transition-all duration-200 hover:bg-[var(--background-color2)]"
                        >
                            <FiSearch className="text-xl" />
                        </button>
                    </div>
                </div>
                <div className="header-actions col-span-4 flex justify-end gap-4">
                    <Link href={'#'}>
                        <FiHeart className='icon' />
                        Wishlist
                    </Link>
                    <Link href={'#'}>
                        <FiShoppingCart className='icon' />
                        Cart
                    </Link>
                    {
                        user ? <Popover>
                            <PopoverTrigger>
                                <FiUser className='icon' />
                                My Account
                            </PopoverTrigger>
                            <PopoverContent className={"w-[200px] popup-container px-0 py-3 rounded-[2px]"} align='end'>
                                <div>
                                    <h5 className='ms-2'>My Account</h5>
                                    <hr className='mt-2 border-[var(--border-color)]' />
                                    <div className='menu-container flex flex-col *:text-sm *:p-2 mt-2 *:hover:bg-[var(--background-color2)]'>
                                        <Link href={'/dashboard'} style={{ fontFamily: "var(--font-secondary)" }}>
                                            Dashboard
                                        </Link>
                                        <Link href={'/wishlist'} style={{ fontFamily: "var(--font-secondary)" }}>
                                            Wishlist
                                        </Link>
                                        <Link href={'/account'} style={{ fontFamily: "var(--font-secondary)" }}>
                                            Account Settings
                                        </Link>
                                    </div>
                                    <div className="btn-container px-2">
                                        <button className="btn-outline w-full mt-2" onClick={() => handleLogout()}>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover> : <Link href={'/register'}>
                            <button className="btn">Create Account</button>
                        </Link>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;