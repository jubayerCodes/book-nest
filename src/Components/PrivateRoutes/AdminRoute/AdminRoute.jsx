"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {

    const { role, loading } = useSelector(state => state.auth)

    console.log(role, loading);
    const router = useRouter()

    if (loading) {
        return <div>Loading...</div>
    }

    if (role !== 'admin') {
        return router.push("/")
    }

    return children;
};

export default AdminRoute;