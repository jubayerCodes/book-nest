import React from 'react';
import bookImg from "@/assets/images/books/Lecture_Dakhil_English_2nd_Part_-Lecture-7cbd8-326988.jpg"
import { Rating } from '@smastrom/react-rating';
import Link from 'next/link';

const BookItem = () => {
    return (
        <>
            <div className='book-item'>
                <div className='relative'>
                    <Link href={'/books/121'}>
                        <div className="book-cover relative">
                            <img src={bookImg.src} alt="Book Cover" className='book-img' />
                        </div>
                    </Link>
                    <button className="cart-btn">Add to Cart</button>
                </div>
                <div className="book-info">
                    <Link href={'/books/121'}>
                        <h4 className='book-title'>Lecture Dakhil English 2nd Part - Exam-2025</h4>
                    </Link>
                    <p className='book-author'>Lecture</p>
                    <div className="flex gap-1">
                        <Rating style={{ maxWidth: 60 }} value={4} readOnly />
                        (5)
                    </div>
                    <div className="prices flex items-end gap-2">
                        <span className="price">$10.99</span>
                        <span className='price discount'>$15.99</span>
                    </div>
                </div>
            </div>

            
        </>
    );
};

export default BookItem;