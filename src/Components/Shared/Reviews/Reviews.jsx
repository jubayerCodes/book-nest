import { Rating } from '@smastrom/react-rating';
import React from 'react';

const Reviews = () => {
    return (
        <section className='section reviews'>
            <div className="my-container">
                <h2>Ratings and Book Reviews (183)</h2>
                <div className='rating-items mt-2'>
                    <div className='rating-item'>
                        <div className='flex flex-col items-start justify-start gap-2'>
                            <h5>
                                Overall rating
                            </h5>
                            <h5>
                                4.7 out of 5
                            </h5>
                            <span className='flex gap-2 items-center text-sm'>
                                <Rating style={{ maxWidth: 100 }} value={4} readOnly /> (5)
                            </span>
                        </div>
                    </div>
                    <div className='rating-item'>
                        <div className='rating-fraction-items'>
                            <div className='rating-fraction-item'>
                                <span>5 STARS</span>
                                <div className="progress">
                                    <div className="progress-indicator" style={{ width: '70%' }}></div>
                                </div>
                                <span>2021</span>
                            </div>
                            <div className='rating-fraction-item'>
                                <span>4 STARS</span>
                                <div className="progress">
                                    <div className="progress-indicator" style={{ width: '70%' }}></div>
                                </div>
                                <span>2021</span>
                            </div>
                            <div className='rating-fraction-item'>
                                <span>3 STARS</span>
                                <div className="progress">
                                    <div className="progress-indicator" style={{ width: '70%' }}></div>
                                </div>
                                <span>2021</span>
                            </div>
                            <div className='rating-fraction-item'>
                                <span>2 STARS</span>
                                <div className="progress">
                                    <div className="progress-indicator" style={{ width: '70%' }}></div>
                                </div>
                                <span>2021</span>
                            </div>
                            <div className='rating-fraction-item'>
                                <span>1 STARS</span>
                                <div className="progress">
                                    <div className="progress-indicator" style={{ width: '70%' }}></div>
                                </div>
                                <span>2021</span>
                            </div>
                        </div>
                    </div>
                    <div className='rating-item'>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <h6 className='text-lg text-[var(--heading-color)] font-semibold'>Share your thoughts</h6>
                            <button className="btn">Write your Review</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-container mt-8">
                <div className="reviews-header pb-6 border-b border-[var(--border-color)]">
                    <h5>All Reviews</h5>
                </div>
                <div className="reviews-container">
                    <div className="review-item">
                        <div className="review-title">
                            <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                            <h5>Absolutely fantastic science fiction!!!</h5>
                        </div>
                        <p className="review-desc">
                            A wonderfully entertaining read that will have you laughing, learning and perhaps your face will be leaking too!! For fans of The Martian, you will definitely want to pick this book up, it's just a delightful story. I don't want to give too much detail here as I so enjoyed how you learn the events of the story right alongside the main character, Ryland Grace. Ryland is the sole survivor of a space mission that will save the human race......or not, because he really can't remember anything. Bummer.
                        </p>
                        <div className="review-footer">
                            by <span className='reviewer'>Donna B.</span> on <span className='date'>May 4, 2021</span>
                        </div>
                    </div>
                    <div className="review-item">
                        <div className="review-title">
                            <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                            <h5>Absolutely fantastic science fiction!!!</h5>
                        </div>
                        <p className="review-desc">
                            A wonderfully entertaining read that will have you laughing, learning and perhaps your face will be leaking too!! For fans of The Martian, you will definitely want to pick this book up, it's just a delightful story. I don't want to give too much detail here as I so enjoyed how you learn the events of the story right alongside the main character, Ryland Grace. Ryland is the sole survivor of a space mission that will save the human race......or not, because he really can't remember anything. Bummer.
                        </p>
                        <div className="review-footer">
                            by <span className='reviewer'>Donna B.</span> on <span className='date'>May 4, 2021</span>
                        </div>
                    </div>
                    <div className="review-item">
                        <div className="review-title">
                            <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                            <h5>Absolutely fantastic science fiction!!!</h5>
                        </div>
                        <p className="review-desc">
                            A wonderfully entertaining read that will have you laughing, learning and perhaps your face will be leaking too!! For fans of The Martian, you will definitely want to pick this book up, it's just a delightful story. I don't want to give too much detail here as I so enjoyed how you learn the events of the story right alongside the main character, Ryland Grace. Ryland is the sole survivor of a space mission that will save the human race......or not, because he really can't remember anything. Bummer.
                        </p>
                        <div className="review-footer">
                            by <span className='reviewer'>Donna B.</span> on <span className='date'>May 4, 2021</span>
                        </div>
                    </div>
                    <div className="review-item">
                        <div className="review-title">
                            <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                            <h5>Absolutely fantastic science fiction!!!</h5>
                        </div>
                        <p className="review-desc">
                            A wonderfully entertaining read that will have you laughing, learning and perhaps your face will be leaking too!! For fans of The Martian, you will definitely want to pick this book up, it's just a delightful story. I don't want to give too much detail here as I so enjoyed how you learn the events of the story right alongside the main character, Ryland Grace. Ryland is the sole survivor of a space mission that will save the human race......or not, because he really can't remember anything. Bummer.
                        </p>
                        <div className="review-footer">
                            by <span className='reviewer'>Donna B.</span> on <span className='date'>May 4, 2021</span>
                        </div>
                    </div>
                    <div className="review-item">
                        <div className="review-title">
                            <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                            <h5>Absolutely fantastic science fiction!!!</h5>
                        </div>
                        <p className="review-desc">
                            A wonderfully entertaining read that will have you laughing, learning and perhaps your face will be leaking too!! For fans of The Martian, you will definitely want to pick this book up, it's just a delightful story. I don't want to give too much detail here as I so enjoyed how you learn the events of the story right alongside the main character, Ryland Grace. Ryland is the sole survivor of a space mission that will save the human race......or not, because he really can't remember anything. Bummer.
                        </p>
                        <div className="review-footer">
                            by <span className='reviewer'>Donna B.</span> on <span className='date'>May 4, 2021</span>
                        </div>
                    </div>
                </div>
                <button className="btn-secondary mt-6">
                    Load More
                </button>
            </div>
        </section>
    );
};

export default Reviews;