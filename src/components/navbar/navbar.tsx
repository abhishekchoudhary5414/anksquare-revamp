'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import { navbarItems } from '@/data/navbar';
import { profile, social } from '@/data/details';
import { messages } from '@/data/message';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track WhatsApp clicks
    const trackWhatsAppClick = async () => {
        try {
            const clickData = {
                user_agent: navigator.userAgent,
                referrer: document.referrer,
                page_url: window.location.href,
                device_type: /Mobile|Android|iP(hone|od|ad)/.test(navigator.userAgent) ? 'mobile' : 'desktop',
                browser_info: {
                    language: navigator.language,
                    platform: navigator.platform,
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine
                }
            };

            // Send tracking data to Supabase (don't wait for it to avoid blocking the redirect)
            supabase.from('whatsapp_clicks').insert([clickData]).then(({ error }) => {
                if (error) {
                    console.error('Error tracking WhatsApp click:', error);
                }
            });
        } catch (error) {
            console.error('Error tracking WhatsApp click:', error);
        }
    };

    // WhatsApp message
    const whatsappMessage = encodeURIComponent(messages.whatsapp.default);
    const whatsappUrl = `https://wa.me/91${social.whatsapp.replace(/\D/g, '').slice(-10)}?text=${whatsappMessage}`;

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                        <div className={styles.logoBadge}>
                            <Image
                                src={profile.logo}
                                alt={profile.imageAlt}
                                width={100}
                                height={48}
                            />
                        </div>
                    </Link>

                    <button
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation Menu */}
                    <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
                        <ul className={styles.navItems}>
                            {navbarItems.map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li className={styles.mobileContactItem}>
                                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Button - Right Side */}
                    <Link href="/contact" className={styles.contactBtn} onClick={() => setIsMenuOpen(false)}>
                        Talk to us
                    </Link>
                </div>
            </nav>

            {/* WhatsApp Fixed Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                onClick={trackWhatsAppClick}
            >
                <WhatsApp className={styles.whatsappIcon} />
            </a>
        </>
    );
}