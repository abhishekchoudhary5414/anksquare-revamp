'use client';

import React, { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
    FaQuoteLeft,
    FaStar,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './testimonial.module.css';
import Heading from '../heading/heading';
import { testimonials } from '../../data/testimonial';



const Testimonial: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className={styles.testimonialSection}>
            <div className={styles.container}>


                <Heading
                    subtitle='Testimonials'
                    title='What Our Clients '
                    titleHighlight='Say'
                ></Heading>

                <div className={styles.sliderContainer}>
                    <button
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous testimonial"
                        type="button"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next testimonial"
                        type="button"
                    >
                        <FaChevronRight />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        speed={0}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 }
                        }}
                        className={styles.swiper}
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.id}>
                                <article className={styles.testimonialCard}>
                                    <FaQuoteLeft className={styles.quoteIcon} />
                                    <p className={styles.quote}>{t.quote}</p>

                                    <div className={styles.rating}>
                                        {Array.from({ length: t.rating }, (_, i) => (
                                            <FaStar key={i} className={styles.star} />
                                        ))}
                                    </div>

                                    <div className={styles.clientInfo}>
                                        <div className={styles.clientImage}>
                                            <Image
                                                src={t.image}
                                                alt={`Testimonial from ${t.name}, ${t.position}`}
                                                width={60}
                                                height={60}
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.clientDetails}>
                                            <p className={styles.clientName}>
                                                <span>{t.name}</span>
                                            </p>
                                            <p className={styles.clientPosition}>
                                                {t.position}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
