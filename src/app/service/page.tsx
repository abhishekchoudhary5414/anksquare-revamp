import { Metadata } from 'next'
import Services from '@/components/service/service'

export const metadata: Metadata = {
  title: 'Our Services - E-commerce Solutions & Digital Marketing | Ank Square',
  description: 'Comprehensive digital service including merchant account management, website development, and digital marketing. Expert e-commerce solutions for Indian businesses across all major platforms.',
  keywords: 'e-commerce service, merchant account management, website development, digital marketing, SEO service, online marketing, e-commerce platform management, web design India, digital marketing agency',
  openGraph: {
    title: 'Our Services - Website Development Services | Ank Square',
    description: 'Professional e-commerce account management, custom website development, and comprehensive digital marketing service for growing businesses.',
    url: 'https://www.anksquare.com/service',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Digital Marketing Solutions | Ank Square',
    description: 'Expert e-commerce management, website development, and digital marketing service.',
  },
}

export default function ServicesPage() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>

      <main id="main-content" role="main">
        {/* Services Component */}
        <Services />
      </main>
    </>
  )
}