import AdminRoute from '@/Components/PrivateRoutes/AdminRoute/AdminRoute';
import ManageUsers from '@/Pages/DashboardPages/ManageUsers/ManageUsers';
import React from 'react';

const ManageUsersPage = () => {
    return (
        <>
            <AdminRoute>
                <ManageUsers />
            </AdminRoute>
        </>
    );
};

export default ManageUsersPage;