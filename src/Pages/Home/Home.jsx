
import Hero from '@/Components/Home/Hero/Hero';
import FeaturedBooks from '@/Components/Shared/FeaturedBooks/FeaturedBooks';
import FeaturedEBooks from '@/Components/Shared/FeaturedEBooks/FeaturedEBooks';
import React from 'react';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedBooks />
            <FeaturedEBooks />
        </>
    );
};

export default Home;