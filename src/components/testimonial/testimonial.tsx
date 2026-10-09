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
                                <article className={styles.testimonialCard} itemScope itemType="https://schema.org/Review">
                                    <FaQuoteLeft className={styles.quoteIcon} />
                                    <p className={styles.quote} itemProp="reviewBody">{t.quote}</p>

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
                                            <p className={styles.clientName} itemProp="author" itemScope itemType="https://schema.org/Person">
                                                <span itemProp="name">{t.name}</span>
                                            </p>
                                            <p className={styles.clientPosition} itemProp="jobTitle">
                                                {t.position}
                                            </p>
                                        </div>
                                    </div>
                                    <meta itemProp="reviewRating" content={t.rating.toString()} />
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Ank Square",
                        "review": testimonials.map(t => ({
                            "@type": "Review",
                            "author": {
                                "@type": "Person",
                                "name": t.name,
                                "jobTitle": t.position
                            },
                            "reviewBody": t.quote,
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": t.rating,
                                "bestRating": 5
                            }
                        }))
                    })
                }}
            />
        </section>
    );
};

export default Testimonial;
