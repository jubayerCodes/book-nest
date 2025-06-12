"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const AuthorRoute = ({ children }) => {
    const { role, loading } = useSelector(state => state.auth)

    const router = useRouter()

    if (loading) {
        return <div>Loading...</div>
    }

    if (role !== 'author') {
        return router.push("/")
    }

    return children;
};

export default AuthorRoute;