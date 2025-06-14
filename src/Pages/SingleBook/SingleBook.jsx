import React from 'react';
import './SingleBook.css'


// TODO: Temporary Img
import bookCover from '@/assets/images/books/Lecture_Dakhil_English_2nd_Part_-Lecture-7cbd8-326988.jpg';
import Link from 'next/link';
import { FaRegEye } from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating';
import pageIcon from "@/assets/icons/document.png"
import bookIcon from "@/assets/icons/open-book.png"
import timeIcon from "@/assets/icons/time.png"
import Reviews from '@/Components/Shared/Reviews/Reviews';
import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';

const SingleBook = ({ params }) => {
    return (
        <>
            <Breadcrumb className={'mt-4 mb-12'} />
            <section className="section book-details">
                <div className="book-details-container my-container grid grid-cols-10 gap-8">
                    <div className="book-details-left grid grid-cols-4 gap-8 col-span-8">
                        <div className="book-cover-container">
                            <img src={bookCover.src} alt="Book Cover" className="book-cover w-full" />
                            <div className='mt-4'>
                                <Link href={'#'} className='preview-btn text-[var(--secondary-color)] inline-flex gap-1 items-center hover:underline text-sm font-[var(--font-primary)]'>
                                    <FaRegEye className='text-[var(--primary-color)]' /> Preview Now
                                </Link>

                                <hr className='my-2 border-[var(--border-color)]' />

                                <span className='flex gap-2 items-center text-sm'>
                                    <Rating style={{ maxWidth: 60 }} value={4} readOnly /> (5)
                                </span>

                            </div>
                        </div>
                        <div className="book-info-container col-span-3">
                            <h3 className="book-title">Lecture Dakhil English 2nd Part - Lecture</h3>
                            <p className="book-category">
                                <Link href="#" className="book-category-link hover:underline">Category Name</Link>
                            </p>
                            <p className="book-author">by <Link href="#" className=' hover:underline'>Author Name</Link></p>
                            <div className="summary">
                                <h5 className='mb-2 text-[var(--heading-color)]'>Summary</h5>
                                <p>
                                    THE #1 NEW YORK TIMES BESTSELLER FROM THE AUTHOR OF THE MARTIAN • Soon to be a major motion picture starring Ryan Gosling, directed by Phil Lord and Christopher Miller, with a screenplay by Drew Goddard
                                </p>
                                <br />
                                <p>
                                    **From the author of The Martian, a lone astronaut must save the earth from disaster in this “propulsive” (Entertainment Weekly), cinematic thriller full of suspense, humor, and fascinating science.
                                </p>
                                <br />
                                <p>
                                    HUGO AWARD FINALIST • ONE OF THE YEAR’S BEST BOOKS: Bill Gates, GatesNotes, New York Public Library, Parade, Newsweek, Polygon, Shelf Awareness, She Reads, Kirkus Reviews, Library Journal • New York Times Readers Pick: 100 Best Books of the 21st Century
                                </p>
                            </div>
                            <div className="about">
                                <h5 className='mb-4 text-[var(--heading-color)'>About</h5>
                                <div className='about-items'>
                                    <div className='about-item'>
                                        <img src={pageIcon.src} alt="Page Icon" />
                                        <div>
                                            <span className='about-info'>350</span>
                                            <span className='about-title font-medium'>Pages</span>
                                        </div>
                                    </div>
                                    <div className='about-item'>
                                        <img src={timeIcon.src} alt="Time Icon" />
                                        <div>
                                            <span className='about-info'>11 - 12</span>
                                            <span className='about-title font-medium'>Hours to read</span>
                                        </div>
                                    </div>
                                    <div className='about-item'>
                                        <img src={bookIcon.src} alt="Page Icon" />
                                        <div>
                                            <span className='about-info'>149k</span>
                                            <span className='about-title font-medium'>Total words</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book-details-right col-span-2">
                        <div className="book-price-container bg-white p-4 rounded-[2px] border border-[var(--border-color2)]">
                            <div className='flex items-center justify-between mb-4'>
                                <h4 className='text-base font-semibold'>Price</h4>
                                <span className="price text-base">$10.99</span>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button className='btn w-full'>Add to Card</button>
                                <button className='btn-secondary w-full'>Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Reviews />
        </>
    );
};

export default SingleBook;