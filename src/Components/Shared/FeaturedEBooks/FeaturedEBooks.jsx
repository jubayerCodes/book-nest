"use client"

import React, { useEffect, useRef, useState } from 'react';
import BookItem from '../BookItem/BookItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const FeaturedEBooks = () => {

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const [swiperReady, setSwiperReady] = useState(false);

    useEffect(() => {
        setSwiperReady(true);
    }, []);

    return (
        <>
            <section className='featured-books'>
                <div className='my-container featured-books-container bg-white py-10 relative'>
                    <div className='featured-books-header flex justify-between items-end'>
                        <div>
                            <span className='book-type bg-[var(--primary-color)] px-2 py-0.5 text-white text-sm rounded-[2px]'>eBooks</span>
                            <h2 className='mt-1'>Best-selling eBooks</h2>
                        </div>
                        <button className='btn-link'>
                            View All
                        </button>
                    </div>

                    <div className="featured-books-items mt-8">
                        {swiperReady && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                slidesPerView={6}
                                slidesPerGroup={6}
                                spaceBetween={30}
                                autoplay={{ pauseOnMouseEnter: true }}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                onBeforeInit={(swiper) => {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }}
                                className="mySwiper featured-books-swiper"
                            >
                                {Array.from({ length: 24 })?.map((_, i) => (
                                    <SwiperSlide key={i}>
                                        <BookItem />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                    </div>

                    <button ref={nextRef} className="nav-btn nav-next"><FaAngleRight /></button>
                    <button ref={prevRef} className="nav-btn nav-prev"><FaAngleLeft /></button>
                </div>
            </section>
        </>
    );
};

export default FeaturedEBooks;