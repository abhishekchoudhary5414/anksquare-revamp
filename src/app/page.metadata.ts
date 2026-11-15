import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Ank Square - Digital Services for Business Growth | Merchant Account Management & Website Development',
    description: 'Transform your business with Ank Square\'s expert digital services. We specialize in merchant account management for Amazon, Flipkart & more, custom website development, and digital marketing solutions. 5+ years experience, 500+ projects completed.',
    keywords: [
      'digital services',
      'merchant account management',
      'website development',
      'digital marketing',
      'SEO services',
      'Amazon seller account',
      'Flipkart seller account',
      'e-commerce solutions',
      'business growth',
      'online marketplace management',
      'web development company',
      'digital marketing agency',
      'merchant account setup',
      'e-commerce consulting'
    ],
    authors: [{ name: 'Ank Square' }],
    creator: 'Ank Square',
    publisher: 'Ank Square',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.anksquare.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Ank Square - Digital Services for Business Growth',
      description: 'Expert merchant account management, custom website development, and digital marketing solutions. 500+ projects completed with 300+ happy clients.',
      url: 'https://www.anksquare.com',
      siteName: 'Ank Square',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: 'https://www.anksquare.com/og-image.jpg',
          width: 1024,
          height: 535,
          alt: 'Ank Square - Grow Your Online Business (Marketplace Management, Website Development, Digital Marketing)',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ank Square - Digital Services for Business Growth',
      description: 'Expert merchant account management, custom website development, and digital marketing solutions.',
      images: ['https://www.anksquare.com/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}