import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEO(props: SEOProps): Metadata {
  const {
    title = "Ank Square - Digital Services for Business Growth",
    description = "Transform your business with Ank Square's expert digital service. We specialize in merchant account management, website development, and digital marketing solutions.",
    keywords = ["digital service", "merchant account management", "website development", "digital marketing"],
    image = "/og-image.jpg",
    url = "https://www.anksquare.com",
    type = "website",
    author,
    section,
    tags,
  } = props;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: "Ank Square" }],
    openGraph: {
      title,
      description,
      url,
      siteName: "Ank Square",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };

  if (type === 'article' && props.publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: props.publishedTime,
      modifiedTime: props.modifiedTime,
      authors: props.author,
      section: props.section,
      tags: props.tags,
    };
  }

  return metadata;
}

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: "Ank Square | Web Development & Merchant Services",
    description: "Transform your business with Ank Square’s expert web development and merchant account management services. Get SEO-friendly websites and professional seller support.",
    keywords: ["web development services", "website development", "custom website development", "merchant account management", "Amazon seller account management", "Flipkart seller account management", "e-commerce solutions","digital marketing services", "SEO services", "ecommerce website development"],
  },

  service: {
    title: "Digital Services - Merchant Account Management, Website Development & Digital Marketing | Ank Square",
    description: "Comprehensive digital service including merchant account management for major platforms, custom website development, and results-driven digital marketing solutions.",
    keywords: ["digital services", "web development services", "merchant account management", "Amazon seller account management", "Flipkart seller account management", "digital marketing services", "SEO services", "e-commerce solutions", "ecommerce website development"],
  },

  about: {
    title: "About Ank Square - Digital Services Expert & Founder Mukesh Kumar",
    description: "Learn about Ank Square's mission to empower businesses with innovative digital solutions. Founded by Mukesh Kumar with 5+ years of experience in digital service.",
    keywords: ["Ank Square", "Ank Square Private Limited", "digital services company", "web development company", "business growth solutions"],
  },

  contact: {
    title: "Contact Ank Square - Get Your Digital Services Quote Today",
    description: "Ready to grow your business? Contact Ank Square for expert merchant account management, website development, and digital marketing service.",
    keywords: ["contact Ank Square", "digital service quote", "business consultation", "web development consultation"], 
  },
};