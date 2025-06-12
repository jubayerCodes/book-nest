import AdminRoute from '@/Components/PrivateRoutes/AdminRoute/AdminRoute';
import ManageAuthors from '@/Pages/DashboardPages/Admin/ManageAuthors/ManageAuthors';
import React from 'react';

const ManageAuthorsPage = () => {
    return (
        <>
            <AdminRoute>
                <ManageAuthors />
            </AdminRoute>
        </>
    );
};

export default ManageAuthorsPage;