'use client'
import styles from './hero.module.css'
import Button from '@/components/button/Button'
import { FaShoppingCart, FaCode, FaChartLine, FaTools } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import Image from 'next/image'
import { certificates } from '@/data/certificates';


export interface HeroCard {
  id: number
  title: string
  icon: IconType
}

export const heroCards: HeroCard[] = [
  {
    id: 1,
    title: 'E-commerce Solutions',
    icon: FaShoppingCart
  },
  {
    id: 2,
    title: 'Web Development',
    icon: FaCode
  },
  {
    id: 3,
    title: 'Digital Growth',
    icon: FaChartLine
  },
  {
    id: 4,
    title: 'Technical Support',
    icon: FaTools
  }
]



const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={styles.textContent}
          >
            <h1 id="hero-title" className={styles.title}>
              Grow Your Business with{' '}
              <span className={styles.highlight}>Web Development & Marketplace Solutions</span>
            </h1>

            <p className={styles.description}>
              Ank Square helps businesses grow online with professional web development and marketplace account management. We support Amazon and Flipkart sellers with account setup,
              product listing optimization, and daily account management. We also build custom, responsive websites to strengthen your online presence and help your brand stand out.
            </p>

            <div className={styles.cta} role="group" aria-label="Primary actions">
              <Button href="/service" variant="primary">
                Explore Our Solutions
              </Button>
              <Button href="/contact" variant="secondary">
                Get in Touch
              </Button>
            </div>
          </div>

          <div
            className={styles.imageContainer}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/illustrations/hero-commerce.svg"
                alt="Digital solutions illustration showcasing e-commerce and marketplace management"
                width={750}
                height={500}
                priority
                className={styles.heroIllustration}
              />
            </div>
          </div>
        </div>

        <div className={styles.stats} aria-label="Company statistics">
          {[
            { number: '500+', text: 'Projects Completed' },
            { number: '300+', text: 'Happy Clients' },
            { number: '5+', text: 'Years Experience' }
          ].map((stat, index) => (
            <div
              key={index}
              className={styles.stat}
            >
              <div className={styles.statNumber} aria-label={stat.text}>{stat.number}</div>
              <div className={styles.statText}>{stat.text}</div>
            </div>
          ))}
        </div>


        <div
          className={styles.certificateSection}
        >
          <h2 className={styles.certSectionTitle}>Work With Certified E-Commerce Account Management Partners</h2>
          <div className={styles.certContainer}>
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={styles.certificateCard}
              >
                <div className={styles.certImageWrapper}>
                  <Image
                    src={cert.logo}
                    alt={cert.alt}
                    width={180}
                    height={90}
                    className={styles.certImage}
                  />
                </div>
                <div className={styles.certContent}>
                  <p className={styles.certTitle}>{cert.title}</p>
                  <p className={styles.certDescription}>{cert.description}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero