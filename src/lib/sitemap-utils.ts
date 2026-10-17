import { MetadataRoute } from 'next'
import { marketplaceServices, websiteTypes, digitalMarketingTypes, mainServices } from '@/data/service'
import { blogPosts } from '@/data/blog'

export interface SitemapUrl {
  url: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

/**
 * Generate all sitemap URLs for the website
 */
export function generateAllSitemapUrls(): SitemapUrl[] {
  const baseUrl = 'https://www.anksquare.com'

  // Static pages
  const staticPages: SitemapUrl[] = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/client`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonial`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  staticPages.push({
    url: `${baseUrl}/enquiry`,
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  // Service pages
  const servicePages: SitemapUrl[] = [
    ...marketplaceServices,
    ...websiteTypes,
    ...digitalMarketingTypes,
    ...mainServices.map(service => ({
      ...service,
      slug: service.path.replace('/service/', ''),
    }))
  ].map(service => ({
    url: `${baseUrl}/service/${service.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Client project pages
  const clientPages: SitemapUrl[] = [
    'sharma-interiors',
    'sah-constructions',
    'achintya-enterprises',
    'sl-engineerings'
  ].map(client => ({
    url: `${baseUrl}/client/${client}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Blog pages
  const blogPages: SitemapUrl[] = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const allUrls = [
    ...staticPages,
    ...servicePages,
    ...clientPages,
    ...blogPages,
  ]

  const uniqueUrls = new Map<string, SitemapUrl>()
  for (const url of allUrls) {
    if (!uniqueUrls.has(url.url)) {
      uniqueUrls.set(url.url, url)
    }
  }

  return [...uniqueUrls.values()]
}

/**
 * Split URLs into chunks for multiple sitemaps
 * Each sitemap can have up to 50,000 URLs
 */
export function chunkSitemapUrls(urls: SitemapUrl[], chunkSize: number = 50000): SitemapUrl[][] {
  const chunks: SitemapUrl[][] = []
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize))
  }
  return chunks
}

/**
 * Get the number of sitemap chunks needed
 */
export function getNumberOfSitemapChunks(): number {
  const allUrls = generateAllSitemapUrls()
  const chunks = chunkSitemapUrls(allUrls)
  return chunks.length
}

/**
 * Get a specific chunk of URLs by index (1-based)
 */
export function getSitemapChunk(chunkIndex: number): SitemapUrl[] {
  const allUrls = generateAllSitemapUrls()
  const chunks = chunkSitemapUrls(allUrls)
  
  if (chunkIndex < 1 || chunkIndex > chunks.length) {
    return []
  }
  
  return chunks[chunkIndex - 1]
}

/**
 * Convert SitemapUrl to MetadataRoute.Sitemap format
 */
export function convertToMetadataRoute(urls: SitemapUrl[]): MetadataRoute.Sitemap {
  return urls.map(url => ({
    url: url.url,
    changeFrequency: url.changeFrequency,
    priority: url.priority,
  }))
}
