"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from "./clients.module.css";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { clients } from '@/data/client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import Heading from '../../components/heading/heading';
import Button from '../../components/button/Button';

interface ClientsProps {
    isSlider?: boolean;
}

const getClientWorkLinkText = (clientName: string) => {
    const firstName = clientName.split(' ')[0];
    const possessive = firstName.endsWith('s') ? `${firstName}'` : `${firstName}'s`;

    return `${possessive} work`;
};

const Clients: React.FC<ClientsProps> = ({ isSlider = true }) => {
    const swiperRef = useRef<SwiperType | null>(null);

    if (!isSlider) {
        // Grid layout for client listing page
        return (
            <section className={styles.clientSection}>
                <div className={styles.container}>
                    <Heading
                        subtitle='Clients'
                        title='Our '
                        titleHighlight='Clients'
                    />
                    <div className={styles.gridContainer}>
                        {clients.map((client) => (
                            <div key={client.id} className={styles.clientCard}>
                                <div className={styles.logoContainer}>
                                    <Image
                                        src={`/assets/client${client.logo}`}
                                        alt={client.name}
                                        width={120}
                                        height={60}
                                        className={styles.clientLogo}
                                    />
                                </div>
                                <div className={styles.clientInfo}>
                                    <h3 className={styles.clientName}>{client.name}</h3>
                                    <p className={styles.projectType}>{client.project}</p>
                                    <div className={styles.testimonialWrapper}>
                                        <FormatQuoteIcon className={styles.quoteIcon} />
                                        <p className={styles.testimonial}>{client.testimonial}</p>
                                    </div>
                                </div>

                                <div className={styles.ctaButton}>
                                    <Button className={styles.ctaButtonPrimary}
                                        variant='primary' href={`/client/${client.slug}`}>
                                        {getClientWorkLinkText(client.name)}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.clientSection}>
            <div className={styles.container}>
                <Heading
                    subtitle='Clients'
                    title='Our '
                    titleHighlight='Clients'
                >
                </Heading>
                <div className={styles.sliderContainer}>
                    <button
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        speed={0}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className={styles.swiper}
                    >
                        {clients.map((client) => (
                            <SwiperSlide key={client.id}>
                                <div className={styles.clientCard}>
                                    <div className={styles.logoContainer}>
                                        <Image
                                            src={`/assets/client${client.logo}`}
                                            alt={client.name}
                                            width={120}
                                            height={60}
                                            className={styles.clientLogo}
                                        />
                                    </div>
                                    <div className={styles.clientInfo}>
                                        <h3 className={styles.clientName}>{client.name}</h3>
                                        <p className={styles.projectType}>{client.project}</p>
                                        <div className={styles.testimonialWrapper}>
                                            <FormatQuoteIcon className={styles.quoteIcon} />
                                            <p className={styles.testimonial}>{client.testimonial}</p>
                                        </div>
                                    </div>

                                    <div className={styles.ctaButton}>
                                        <Button className={styles.ctaButtonPrimary}
                                            variant='primary' href={`/client/${client.slug}`}>
                                            {getClientWorkLinkText(client.name)}
                                        </Button>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Clients;