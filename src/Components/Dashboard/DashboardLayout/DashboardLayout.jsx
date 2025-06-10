"use client"
import React, { useEffect } from 'react';
import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/Components/ui/sidebar"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {

    const { user, loading } = useSelector(state => state.auth)
    const router = useRouter()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return router.push("/login")
    }

    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)"
                    }
                }>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default DashboardLayout;