import AdminRoute from '@/Components/PrivateRoutes/AdminRoute/AdminRoute';
import ManageAuthors from '@/Pages/DashboardPages/ManageAuthors/ManageAuthors';
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