import React from 'react';
import './SingleBook.css'


// TODO: Temporary Img
import bookCover from '@/assets/images/books/Lecture_Dakhil_English_2nd_Part_-Lecture-7cbd8-326988.jpg';
import Link from 'next/link';

const SingleBook = ({ params }) => {
    return (
        <>
            <section className="section book-details">
                <div className="book-details-container my-container">
                    <div className="book-details-left flex gap-8">
                        <div className="book-cover-container">
                            <img src={bookCover.src} alt="Book Cover" className="book-cover" />
                        </div>
                        <div className="book-info-container">
                            <h3 className="book-title">Lecture Dakhil English 2nd Part - Lecture</h3>
                            <p className="book-category">
                                <Link href="#" className="book-category-link">Category Name</Link>
                            </p>
                            <p className="book-author">by <Link href="#">Author Name</Link></p>
                            <div className="summary">
                                <p>THE #1 NEW YORK TIMES BESTSELLER FROM THE AUTHOR OF THE MARTIAN • Soon to be a major motion picture starring Ryan Gosling, directed by Phil Lord and Christopher Miller, with a screenplay by Drew Goddard

                                    **From the author of The Martian, a lone astronaut must save the earth from disaster in this “propulsive” (Entertainment Weekly), cinematic thriller full of suspense, humor, and fascinating science.

                                    HUGO AWARD FINALIST • ONE OF THE YEAR’S BEST BOOKS: Bill Gates, GatesNotes, New York Public Library, Parade, Newsweek, Polygon, Shelf Awareness, She Reads, Kirkus Reviews, Library Journal • New York Times Readers Pick: 100 Best Books of the 21st Century</p>
                            </div>
                        </div>
                    </div>
                    <div className="book-details-right">

                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleBook;