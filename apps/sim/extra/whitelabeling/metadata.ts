import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/core/utils/urls'

/**
 * Constantes de configuration de la marque
 */
const BRAND_CONFIG = {
  name: 'Sim',
  logoUrl: '/logo/426-240/primary/small.png',
  faviconUrl: '/favicon/favicon.ico',
  primaryColor: '#701FFC', // Couleur par défaut du thème Sim
}

/**
 * Génère les métadonnées dynamiques basées sur la marque
 */
export function generateBrandedMetadata(override: Partial<Metadata> = {}): Metadata {
  const defaultTitle = BRAND_CONFIG.name
  const summaryFull = `Sim is an open-source AI agent workflow builder. Developers at trail-blazing startups to Fortune 500 companies deploy agentic workflows on the Sim platform. 60,000+ developers already use Sim to build and deploy AI agent workflows and connect them to 100+ apps. Sim is SOC2 and HIPAA compliant, ensuring enterprise-grade security for AI automation.`
  const summaryShort = `Sim is an open-source AI agent workflow builder for production workflows.`

  return {
    title: {
      template: `%s | ${BRAND_CONFIG.name}`,
      default: defaultTitle,
    },
    description: summaryShort,
    applicationName: BRAND_CONFIG.name,
    authors: [{ name: BRAND_CONFIG.name }],
    generator: 'Next.js',
    keywords: [
      'AI agent',
      'AI agent builder',
      'AI agent workflow',
      'AI workflow automation',
      'visual workflow editor',
      'AI agents',
      'workflow canvas',
      'intelligent automation',
      'AI tools',
      'workflow designer',
      'artificial intelligence',
      'business automation',
      'AI agent workflows',
      'visual programming',
    ],
    referrer: 'origin-when-cross-origin',
    creator: BRAND_CONFIG.name,
    publisher: BRAND_CONFIG.name,
    metadataBase: new URL(getBaseUrl()),
    alternates: {
      canonical: '/',
      languages: { 'en-US': '/' },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: getBaseUrl(),
      title: defaultTitle,
      description: summaryFull,
      siteName: BRAND_CONFIG.name,
      images: [
        {
          url: BRAND_CONFIG.logoUrl,
          width: 2130,
          height: 1200,
          alt: BRAND_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: summaryFull,
      images: [BRAND_CONFIG.logoUrl],
      creator: '@simdotai',
      site: '@simdotai',
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
        { url: BRAND_CONFIG.faviconUrl, sizes: 'any', type: 'image/png' },
      ],
      apple: '/favicon/apple-touch-icon.png',
      shortcut: BRAND_CONFIG.faviconUrl,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: BRAND_CONFIG.name,
    },
    formatDetection: { telephone: false },
    category: 'technology',
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': BRAND_CONFIG.primaryColor,
      'msapplication-config': '/favicon/browserconfig.xml',
    },
    ...override,
  }
}

/**
 * Données structurées pour SEO
 */
export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: BRAND_CONFIG.name,
    description:
      'Sim is an open-source AI agent workflow builder. Developers at trail-blazing startups to Fortune 500 companies deploy agentic workflows on the Sim platform. 60,000+ developers already use Sim to build and deploy AI agent workflows and connect them to 100+ apps. Sim is SOC2 and HIPAA compliant, ensuring enterprise-level security.',
    url: getBaseUrl(),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    applicationSubCategory: 'AIWorkflowAutomation',
    areaServed: 'Worldwide',
    availableLanguage: ['en'],
    offers: { '@type': 'Offer', category: 'SaaS' },
    creator: { '@type': 'Organization', name: BRAND_CONFIG.name, url: 'https://sim.ai' },
    featureList: [
      'Visual AI Agent Builder',
      'Workflow Canvas Interface',
      'AI Agent Automation',
      'Custom AI Workflows',
    ],
  }
}
