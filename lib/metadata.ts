import type { Metadata, ResolvingMetadata } from 'next';
import { site } from './siteConfig';

/**
 * SEO Configuration
 */
export const seoConfig = {
  siteName: site.name,
  domain: site.domain,
  description: 'Modern web application template with Next.js, Tailwind CSS, and Supabase',
  ogImage: '/og.jpg',
  twitterCard: 'summary_large_image',
  twitterHandle: site.social.find(s => s.label === 'X')?.href || '',
  locale: 'en_US',
  type: 'website',
} as const;

/**
 * Generate base metadata for all pages
 */
export function generateBaseMetadata(overrides?: Partial<Metadata>): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${seoConfig.domain}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seoConfig.siteName,
      template: `%s | ${seoConfig.siteName}`,
    },
    description: seoConfig.description,
    openGraph: {
      title: seoConfig.siteName,
      description: seoConfig.description,
      url: baseUrl,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type: seoConfig.type,
      images: [
        {
          url: seoConfig.ogImage,
          width: 1200,
          height: 630,
          alt: seoConfig.siteName,
        },
      ],
    },
    twitter: {
      card: seoConfig.twitterCard,
      title: seoConfig.siteName,
      description: seoConfig.description,
      images: [seoConfig.ogImage],
      creator: seoConfig.twitterHandle,
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
    manifest: `${baseUrl}/site.webmanifest`,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    ...overrides,
  };
}

/**
 * Generate page-specific metadata
 */
export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string[];
}

export function generatePageMetadata(options: PageMetadataOptions, parent?: ResolvingMetadata): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${seoConfig.domain}`;
  const fullUrl = `${baseUrl}${options.path}`;
  const imageUrl = options.image || seoConfig.ogImage;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    openGraph: {
      title: options.title,
      description: options.description,
      url: fullUrl,
      type: options.type || 'website',
      images: options.image ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ] : undefined,
    },
    twitter: {
      title: options.title,
      description: options.description,
      images: options.image ? [imageUrl] : undefined,
    },
    ...(options.noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Predefined metadata for each page
 */
export const pageMetadata = {
  home: {
    title: 'Home',
    description: 'Welcome to TemplateAppV2 - Your modern web application solution with cutting-edge technology and seamless user experience.',
    path: '/',
    keywords: ['web application', 'template', 'nextjs', 'saas', 'modern web'],
  },
  services: {
    title: 'Services',
    description: 'Explore our comprehensive range of web development and consulting services designed to help your business succeed online.',
    path: '/services',
    keywords: ['web development', 'consulting', 'services', 'saas development', 'custom solutions'],
  },
  pricing: {
    title: 'Pricing',
    description: 'Choose the perfect plan for your needs. From free tier to enterprise solutions, we have options for every business.',
    path: '/pricing',
    keywords: ['pricing', 'plans', 'saas pricing', 'subscription', 'cost'],
  },
  about: {
    title: 'About Us',
    description: 'Learn about our story, mission, and the team behind TemplateAppV2. We are passionate about creating exceptional web experiences.',
    path: '/about',
    keywords: ['about us', 'team', 'company', 'mission', 'values'],
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with our team. We are here to help you with your web development needs and answer any questions.',
    path: '/contact',
    keywords: ['contact', 'support', 'help', 'inquiry', 'consultation'],
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Access your personalized dashboard to manage your account, view analytics, and configure your settings.',
    path: '/dashboard',
    noIndex: true,
  },
  auth: {
    title: 'Authentication',
    description: 'Sign in to your account or create a new one to access all features of TemplateAppV2.',
    path: '/auth',
    noIndex: true,
  },
} as const;