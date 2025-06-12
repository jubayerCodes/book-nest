import AdminRoute from '@/Components/PrivateRoutes/AdminRoute/AdminRoute';
import ManageAdmins from '@/Pages/DashboardPages/ManageAdmins/ManageAdmins';
import React from 'react';

const ManageAdminsPage = () => {
    return (
        <>
            <AdminRoute>
                <ManageAdmins />
            </AdminRoute>
        </>
    );
};

export default ManageAdminsPage;