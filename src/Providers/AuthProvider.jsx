"use client"
import { observeAuthState } from '@/lib/firebase/authObserver';
import React, { useEffect } from 'react';
import { useStore } from 'react-redux';

const AuthProvider = ({ children }) => {
    const store = useStore();

    useEffect(() => {
        observeAuthState(store);
    }, [store]);
    return children
};

export default AuthProvider;