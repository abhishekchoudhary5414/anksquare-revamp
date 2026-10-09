'use client';

import { useRouter } from 'next/navigation'
import Button from '@/components/button/Button'
import { EmojiEvents, Bolt, Business, TrackChanges } from '@mui/icons-material'
import styles from '../service-detail.module.css'
import cityStyles from './city-service.module.css'

interface City {
  name: string
  state: string
}

interface Service {
  title: string
  slug: string
  features: string[]
  details: {
    overview: string
    benefits: Array<{ title: string; description: string }>
    process: Array<{ step: number; title: string; description: string }>
    faq: Array<{ question: string; answer: string }>
    pricing: Array<{ plan: string; price: string; features: string[] }>
  }
}

interface CityServiceClientProps {
  service: Service
  city: City
}

export default function CityServiceClient({ service, city }: CityServiceClientProps) {
  const router = useRouter()

  const handleEnquiryClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedEnquiryService', service.title)
    }
    router.push('/enquiry')
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <main id="main-content" role="main">
        {/* City Service Header */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={cityStyles.locationBadge}>{city.name}, {city.state}</div>
              <h1 className={styles.title}>{service.title} in {city.name}</h1>
              <p className={styles.overview}>
                {service.details.overview} Serving businesses in {city.name} and across {city.state}.
              </p>
              <div className={styles.heroFeatures}>
                {service.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.ctaButtons}>
                <Button variant="primary" onClick={handleEnquiryClick}>Enquiry Now in {city.name}</Button>
                <Button variant="secondary" href={`/service/${service.slug}`}>View All Details</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Local Benefits Section */}
        <section className={cityStyles.localBenefits}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Why Choose Us in {city.name}?</h2>
            <div className={cityStyles.benefitsGrid}>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <EmojiEvents fontSize="large" />
                </div>
                <h3>Service Planning</h3>
                <p>Review your marketplace requirements and current account status with our team.</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <Bolt fontSize="large" />
                </div>
                <h3>Support Options</h3>
                <p>Ask about available support and expected response times before choosing a service.</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <Business fontSize="large" />
                </div>
                <h3>Relevant Experience</h3>
                <p>Request examples or client references relevant to your marketplace or industry.</p>
              </div>
              <div className={cityStyles.benefitCard}>
                <div className={cityStyles.icon}>
                  <TrackChanges fontSize="large" />
                </div>
                <h3>Business Requirements</h3>
                <p>Discuss your business goals, products, and platform needs with the team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section from Service */}
        <section className={styles.benefits}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Key Benefits</h2>
            <div className={styles.benefitsGrid}>
              {service.details.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.details.process.length > 0 && (
          <section className={styles.process}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Our Process</h2>
              <div className={styles.processSteps}>
                {service.details.process.map((step, index) => (
                  <div key={step.step} className={styles.stepCard}>
                    <div className={styles.stepNumber}>{step.step}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {service.details.faq.length > 0 && (
          <section className={styles.faq}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions about {service.title} in {city.name}</h2>
              <div className={styles.faqList}>
                {service.details.faq.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{faq.question}</h3>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Location CTA Section */}
        <section className={cityStyles.locationCta}>
          <div className={styles.container}>
            <h2>Ready to Grow Your Business in {city.name}?</h2>
            <p>
              Contact our team to discuss your {service.title.toLowerCase()} requirements in {city.name} and confirm which service options are available.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" onClick={handleEnquiryClick}>Contact Us Today</Button>
            </div>
          </div>
        </section>

        {/* Structured Data for Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `${service.title} in ${city.name}`,
              description: service.details.overview,
              areaServed: {
                '@type': 'City',
                name: city.name
              },
              provider: {
                '@type': 'Organization',
                name: 'Ank Square',
                url: 'https://www.anksquare.com'
              },
              serviceType: service.title,
              ...(service.details.pricing.length > 0 && {
                offers: service.details.pricing.map(plan => ({
                  '@type': 'Offer',
                  name: plan.plan,
                  price: plan.price.replace(/[^\d]/g, ''),
                  priceCurrency: 'INR',
                  description: plan.features.join(', ')
                }))
              })
            }),
          }}
        />
      </main>
    </>
  )
}
