import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import { cities, getCityBySlug, getCitySlug } from '@/data/cities'
import CityServiceClient from './city-service-client'

interface Props {
  params: {
    slug: string
    city: string
  }
}

// Combine all services for lookup
const allServices = [
  ...marketplaceServices, 
  ...websiteTypes, 
  ...digitalMarketingTypes,
  ...mainServices.map(service => ({
    ...service,
    slug: service.path.replace('/service/', ''),
    details: {
      overview: service.description,
      benefits: service.features.map(feature => ({ title: feature, description: feature })),
      process: [],
      faq: [],
      pricing: []
    }
  }))
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = allServices.find(s => s.slug === resolvedParams.slug)
  const city = getCityBySlug(resolvedParams.city)

  if (!service || !city) {
    return {
      title: 'Service Not Found - Ank Square',
      description: 'The service you are looking for could not be found.',
    }
  }

  const title = `${service.title} Services in ${city.name}, ${city.state} | Ank Square`
  const description = `Expert ${service.title} service in ${city.name}. Professional implementation with proven results in ${city.state}. Trusted by local businesses.`

  return {
    title,
    description,
    keywords: `${service.title} in ${city.name}, ${service.title} ${city.name}, ${service.title} services ${city.state}, local ${service.title}`,
    openGraph: {
      title,
      description,
      url: `https://www.anksquare.com/service/${service.slug}/${getCitySlug(city.name)}`,
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
  // Return empty - all city service pages will be dynamic
  return []
}

export const dynamicParams = true

export default async function CityServicePage({ params }: Props) {
  const resolvedParams = await params
  const service = allServices.find(s => s.slug === resolvedParams.slug)
  const city = getCityBySlug(resolvedParams.city)

  if (!service || !city) {
    notFound()
  }

  // Create serializable versions without functions
  const serializableService = {
    title: service.title,
    slug: service.slug,
    features: service.features,
    details: service.details
  }

  const serializableCity = {
    name: city.name,
    state: city.state
  }

  return <CityServiceClient service={serializableService} city={serializableCity} />
}
