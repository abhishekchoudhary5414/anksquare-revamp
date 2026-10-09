'use client'
import styles from './About.module.css'
import Heading from '../../components/heading/heading'
import Button from '../../components/button/Button'
import Image from 'next/image'
import { service } from '@/data/details'

const About = () => {
  return (
    <section className={styles.about} aria-labelledby="about-heading" itemScope itemType="https://schema.org/AboutPage">
      <div className={styles.container}>
        <Heading
          id="about-heading"
          subtitle="About Us"
          title="Empowering Ecommerce Through "
          titleHighlight="Digital Expertise"
        />


        <div className={styles.content}>
          <div
            className={styles.imageSection}
          >
            <div className={styles.imageBorder}>
              <Image
                src="/assets/illustrations/about-team.svg"
                alt=""
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.illustration}
              />
            </div>
            <div className={styles.experience}>
              <span className={styles.number}>5+</span>
              <span className={styles.text}>Years of Excellence</span>
            </div>
          </div>

          <div
            className={styles.textSection}
          >
            <p className={styles.description}>
              At Ank square, we blend creativity with technology to deliver
              exceptional digital solutions. Our passionate team is dedicated to
              transforming your ideas into impressive digital realities.
            </p>

            <div className={styles.features}>
              {Object.values(service).map((service, index) => (
                <div
                  key={index}
                  className={styles.featureItem}
                >
                  <span className={styles.featureIcon}>{service.icon}</span>
                  <div>
                    <h3 className={styles.featureTitle}>{service.title}</h3>
                    <p className={styles.featureDescription}>
                      {service.features.join(' • ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cta}>
              <Button href="/contact" variant="primary">
                Let&apos;s Work Together
              </Button>
              <Button href="/service" variant="secondary">
                View Our Portfolio
              </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About