import type { Metadata } from 'next'

export const homepageMetadata: Metadata = {
  title: 'Ank Square | Web Development & E-commerce Solutions',
  description: 'Grow your business with Ank Square’s web development, merchant account management, SEO-friendly websites and professional seller support.',
  keywords: [
        'web development services',
        'website development',
        'custom website development',
        'responsive website design',
        'SEO-friendly website development',
        'e-commerce solutions',
        'ecommerce website development',
        'Amazon seller account management',
        'Flipkart seller account management',
        'merchant account management',
        'digital marketing services',
        'SEO services',
  ],

  openGraph: {
    title: 'Ank Square Private Limited– Web Development & Merchant Account Management Services for Your Business Growth',
    description: 'Expert merchant account management, custom website development, and digital marketing solutions. 500+ projects completed with 300+ happy clients.',
    url: 'https://www.anksquare.com',
    siteName: 'Ank Square Private Limited',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ank Square – Web Development & Merchant Account Management Services for Your Business Growth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ank Square Private Limited– Web Development & Merchant Account Management Services for Your Business Growth',
    description: 'Expert merchant account management, custom website development, and digital marketing solutions.',
    images: ['/og-image.jpg'],
  },
}