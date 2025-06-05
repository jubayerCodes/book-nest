import React from 'react';
import './FeaturedBooks.css';

const FeaturedBooks = () => {
    return (
        <section className='featured-books section'>
            <div className='my-container featured-books-container'>
                <div className='featured-books-header'>
                    <div>
                        <span className='book-type'>Books</span>
                        <h2>Best-selling and Popular Books</h2>
                    </div>
                    <button>
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBooks;