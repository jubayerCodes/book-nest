import AuthorRoute from '@/Components/PrivateRoutes/AuthorRoute/AuthorRoute';
import MyBooks from '@/Pages/DashboardPages/Author/MyBooks/MyBooks';
import React from 'react';

const MyBooksPage = () => {
    return (
        <>
            <AuthorRoute>
                <MyBooks />
            </AuthorRoute>
        </>
    );
};

export default MyBooksPage;