import Link from 'next/link';
import React from 'react';
import './Breadcrumb.css'

const Breadcrumb = ({ path, subPath, className }) => {
    return (
        <section className={`${className}`}>
            <div className="my-container breadcrumb-container">
                <Link href={'/'}>
                    Home
                </Link>
                /
                <Link href={'/books'}>
                    books
                </Link>
                /
                <span>Lecture Dakhil English 2nd Part - Lecture</span>
            </div>
        </section >
    );
};

export default Breadcrumb;