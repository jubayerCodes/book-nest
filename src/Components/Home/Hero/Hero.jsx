'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import "./Hero.css"

// TODO: make it dynamic
import hero1 from "@/assets/images/books1.jpg";

const Hero = () => {

    return (
        <>
            <Swiper pagination={true} loop={true} modules={[Pagination]} className="mySwiper hero-swiper">
                <SwiperSlide>
                    <img src={hero1.src} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={hero1.src} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={hero1.src} alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Hero;