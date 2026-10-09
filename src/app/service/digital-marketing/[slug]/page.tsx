import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { digitalMarketingTypes, marketplaceServices } from '@/data/service'
import { cities, getCityBySlug } from '@/data/cities'
import CityServiceClient from '../../[slug]/[city]/city-service-client'

interface Props {
  params: {
    slug: string
  }
}

// Digital marketing services with city support
const digitalMarketingServices = [
  ...digitalMarketingTypes,
  // Include popular marketplace services
  ...marketplaceServices.filter(service =>
    ['amazon', 'flipkart', 'meesho', 'shopsy'].some(popular =>
      service.slug.toLowerCase().includes(popular.toLowerCase())
    )
  )
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const city = getCityBySlug(resolvedParams.slug)

  if (!city) {
    return {
      title: 'City Not Found - Ank Square',
      description: 'The city you are looking for could not be found.',
    }
  }

  const title = `Digital Marketing Services in ${city.name}, ${city.state} | Ank Square`
  const description = `Expert digital marketing service in ${city.name}. Professional implementation with proven results in ${city.state}. Trusted by local businesses.`

  return {
    title,
    description,
    keywords: `digital marketing in ${city.name}, digital marketing ${city.name}, marketing services ${city.state}, local digital marketing`,
    openGraph: {
      title,
      description,
      url: `https://www.anksquare.com/service/digital-marketing/${resolvedParams.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  // Return empty array - all digital-marketing city pages will be dynamic
  return []
}

export const dynamicParams = true

export default async function DigitalMarketingCityPage({ params }: Props) {
  const resolvedParams = await params
  const city = getCityBySlug(resolvedParams.slug)

  if (!city) {
    notFound()
  }

  // Use the main digital marketing service for display
  const service = {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    features: [
      'Social Media Management',
      'Content Marketing',
      'SEO Optimization',
      'Email Marketing',
      'PPC Campaigns',
      'Analytics & Reporting'
    ],
    details: {
      overview: 'Comprehensive digital marketing service designed to boost your online presence and drive business growth. Our expert team creates targeted campaigns across multiple channels including social media, search engines, email, and content platforms. We focus on measurable results and continuous optimization to maximize your ROI.',
      benefits: [
        { title: 'Increased Visibility', description: 'Reach more customers through targeted digital channels' },
        { title: 'Higher Conversion Rates', description: 'Optimized campaigns that drive quality leads and sales' },
        { title: 'Better ROI', description: 'Data-driven strategies that maximize your marketing investment' },
        { title: 'Brand Growth', description: 'Build strong brand presence and customer loyalty' },
        { title: 'Real-time Analytics', description: 'Track performance metrics and adjust strategies in real-time' },
        { title: 'Expert Support', description: 'Dedicated team providing ongoing optimization and support' }
      ],
      process: [],
      faq: [],
      pricing: []
    }
  }

  const serializableCity = {
    name: city.name,
    state: city.state
  }

  return <CityServiceClient service={service} city={serializableCity} />
}
