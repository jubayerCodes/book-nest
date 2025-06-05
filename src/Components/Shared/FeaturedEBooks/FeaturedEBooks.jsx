import React from 'react';
import BookItem from '../BookItem/BookItem';

const FeaturedEBooks = () => {
    return (
        <>
            <section className='featured-books section'>
                <div className='my-container featured-books-container bg-white p-6 rounded'>
                    <div className='featured-books-header flex justify-between items-end'>
                        <div>
                            <span className='book-type bg-[var(--primary-color)] px-2 py-0.5 text-white text-sm rounded'>eBooks</span>
                            <h2 className='mt-1'>Best-selling and Popular Books</h2>
                        </div>
                        <button className='btn-outline'>
                            View All
                        </button>
                    </div>
                    <div className='featured-books-list grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-10 mt-8'>
                        <BookItem />
                        <BookItem />
                        <BookItem />
                        <BookItem />
                        <BookItem />
                        <BookItem />
                        <BookItem />
                        <BookItem />
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturedEBooks;