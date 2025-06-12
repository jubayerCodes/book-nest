import AdminRoute from '@/Components/PrivateRoutes/AdminRoute/AdminRoute';
import ManageCategories from '@/Pages/DashboardPages/Admin/ManageCategories/ManageCategories';
import React from 'react';

const ManageCategoriesPage = () => {
    return (
        <>
            <AdminRoute>
                <ManageCategories />
            </AdminRoute>
        </>
    );
};

export default ManageCategoriesPage;