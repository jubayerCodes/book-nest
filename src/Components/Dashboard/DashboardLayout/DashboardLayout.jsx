import React from 'react';
import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/Components/ui/sidebar"

const DashboardLayout = ({ children }) => {
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