// ===============================================================
// AI SMART RAILWAY MANAGEMENT SYSTEM - SEO CONFIGURATION & METADATA
// Developer: MOHITH S | smohith002@gmail.com
// ===============================================================

export interface SEOPageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

// Configurable Site URL with automatic fallback
export const SITE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  'https://smartrailway.in'
).replace(/\/$/, '');

// Site Branding
export const SITE_BRAND = {
  name: 'AI Smart Railway Management System',
  shortName: 'AI Train Tracker',
  tagline: 'Real-Time Railway Intelligence. Smarter Operations. Safer Journeys.',
  developerName: 'MOHITH S',
  developerEmail: 'smohith002@gmail.com',
  logoUrl: `${SITE_URL}/assets/images/logo.png`,
  ogImageUrl: `${SITE_URL}/assets/images/train_cinematic.jpg`,
  locale: 'en_IN',
  themeColor: '#000000'
};

// Core Keyword Clusters for Indian Railways & Train Tracking
export const CORE_KEYWORDS = [
  'Indian Railway Train Tracker',
  'Live Train Status',
  'Indian Train Running Status',
  'Train Location',
  'Indian Railways',
  'Train Search',
  'South Indian Train Status',
  'Train Route',
  'Train Schedule',
  'IRCTC Live Train Tracking',
  'Vande Bharat Express Live Status',
  'Chennai Train Status',
  'Coimbatore Train Status',
  'Bengaluru Train Status',
  'New Delhi Train Status',
  'CRIS Live Telemetry',
  'Indian Railway Operations Management',
  'Station Train Schedule',
  'Real-Time Train GPS Tracker'
];

// Helper to construct full canonical URL
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

// ===============================================================
// SCHEMA.ORG STRUCTURED DATA GENERATORS (VALID JSON-LD)
// ===============================================================

export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_BRAND.name,
  alternateName: ['AI Railway Tracker', 'Indian Railway Train Tracker', 'AI Smart Railway'],
  description: 'Production-ready Indian Railways Train Tracking & Operations Management System with Real-Time GIS Telemetry, Train Running Status, and AI Intelligence.',
  inLanguage: 'en-IN',
  publisher: {
    '@id': `${SITE_URL}/#organization`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/trains?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
});

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_BRAND.name,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: SITE_BRAND.logoUrl,
    caption: SITE_BRAND.name
  },
  founder: {
    '@type': 'Person',
    name: SITE_BRAND.developerName,
    email: SITE_BRAND.developerEmail
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE_BRAND.developerEmail,
    contactType: 'technical support',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'ta']
  }
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : getCanonicalUrl(item.url)
  }))
});

export const getTrainTripSchema = (train: {
  trainNumber: string;
  trainName: string;
  originStationCode: string;
  originStationName: string;
  destinationStationCode: string;
  destinationStationName: string;
  departureTime?: string;
  arrivalTime?: string;
  zone?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Trip',
  '@id': `${SITE_URL}/train/${train.trainNumber}#trip`,
  name: `${train.trainNumber} - ${train.trainName}`,
  description: `Live running status and authentic route schedule for ${train.trainName} (${train.trainNumber}) from ${train.originStationName} (${train.originStationCode}) to ${train.destinationStationName} (${train.destinationStationCode}).`,
  provider: {
    '@type': 'Organization',
    name: 'Indian Railways',
    url: 'https://indianrailways.gov.in'
  },
  itinerary: [
    {
      '@type': 'TrainStation',
      name: `${train.originStationName} (${train.originStationCode})`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      }
    },
    {
      '@type': 'TrainStation',
      name: `${train.destinationStationName} (${train.destinationStationCode})`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      }
    }
  ]
});

export const getStationSchema = (station: {
  code: string;
  name: string;
  zone: string;
  division?: string;
  latitude: number;
  longitude: number;
  platformsCount?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'TrainStation',
  '@id': `${SITE_URL}/station/${station.code.toUpperCase()}#station`,
  name: `${station.name} (${station.code.toUpperCase()}) Railway Station`,
  alternateName: [station.name, `${station.name} Junction`, `${station.name} Railway Station`],
  identifier: station.code.toUpperCase(),
  address: {
    '@type': 'PostalAddress',
    addressLocality: station.name,
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: station.latitude,
    longitude: station.longitude
  },
  isAccessibleForFree: true,
  openingHours: 'Mo-Su 00:00-23:59',
  description: `Real-time railway station live departure board, arriving trains, platform assignments, and timetable for ${station.name} (${station.code.toUpperCase()}) in ${station.zone} Railway zone.`
});

// ===============================================================
// DEFAULT PAGE METADATA DEFINITIONS
// ===============================================================

export const DEFAULT_PAGE_SEO: Record<string, SEOPageMetadata> = {
  landing: {
    title: 'AI Smart Railway Management System | Live Indian Railways Train Tracker',
    description: 'Track Indian Railways trains in real time with live GPS telemetry, GIS operational maps, delay alerts, authentic route schedules, and AI copilot intelligence.',
    keywords: CORE_KEYWORDS,
    canonicalUrl: getCanonicalUrl('/'),
    ogType: 'website',
    structuredData: [getWebSiteSchema(), getOrganizationSchema()]
  },
  trains: {
    title: 'National Train Fleet (13,198+ Trains) | Indian Railways Live Train Tracker & Search',
    description: 'Search all 13,198+ Indian Railways trains including Vande Bharat, Rajdhani, Shatabdi, Superfast, and Express trains. Real-time live status, delay tracking, and route timetable.',
    keywords: [
      'Indian Railway Train Tracker',
      'Train Search',
      'Live Train Status',
      'Indian Train Running Status',
      'Train Route',
      'Train Schedule',
      'South Indian Train Status',
      'Vande Bharat Live Status'
    ],
    canonicalUrl: getCanonicalUrl('/trains'),
    ogType: 'website',
    structuredData: [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'National Train Fleet', url: '/trains' }
      ])
    ]
  },
  stations: {
    title: 'Indian Railway Stations Directory & Live Departure Boards | Station Tracker',
    description: 'Search Indian Railway stations across all 17 railway zones. Live arrivals, departures, platform assignments, and train schedules for Chennai Central, Coimbatore, New Delhi, Bengaluru, and all major stations.',
    keywords: [
      'Indian Railways',
      'Train Station Search',
      'Chennai Train Status',
      'Coimbatore Train Status',
      'South Indian Train Status',
      'Railway Station Timetable',
      'Station Live Departures'
    ],
    canonicalUrl: getCanonicalUrl('/stations'),
    ogType: 'website',
    structuredData: [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Stations Directory', url: '/stations' }
      ])
    ]
  },
  map: {
    title: 'GIS Live Railway Operations Map | Real-Time Train GPS Tracking',
    description: 'Interactive real-time GIS map for Indian Railways with live train GPS telemetry, signal aspect monitors, speed tracking, and zonal network coverage.',
    keywords: [
      'Train Location',
      'Indian Railway Train Tracker',
      'Live Train Status',
      'GIS Train Map',
      'Indian Railways GPS Map',
      'Live Train Position'
    ],
    canonicalUrl: getCanonicalUrl('/map'),
    ogType: 'website',
    structuredData: [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Live GIS Map', url: '/map' }
      ])
    ]
  },
  cinematic: {
    title: 'Universal 3D Cinematic Train Visualizer | Indian Railways 3D Telemetry',
    description: 'Procedural 3D simulation and real-time telemetry HUD visualizer for Indian Railways train sets and locomotives.',
    keywords: ['3D Train Tracking', 'Indian Railways Visualizer', 'Train Location', 'Live Train Status'],
    canonicalUrl: getCanonicalUrl('/cinematic'),
    ogType: 'website'
  },
  command: {
    title: 'Railway Command & Control Center | Multi-Role Operations Dashboard',
    description: 'Production-grade enterprise command center for Indian Railways operations controllers, station masters, and running crew.',
    keywords: ['Railway Operations Dashboard', 'Command Center', 'Indian Railways Management'],
    canonicalUrl: getCanonicalUrl('/command'),
    ogType: 'website'
  },
  copilot: {
    title: 'Railway AI Copilot | Intelligent Operations Assistant & Train Route Guide',
    description: 'Ask AI questions about train routes, delay predictions, station schedules, safety protocols, and operational procedures for Indian Railways.',
    keywords: ['Railway AI Copilot', 'Train Search', 'Indian Railway Train Tracker', 'Train Route'],
    canonicalUrl: getCanonicalUrl('/copilot'),
    ogType: 'website'
  },
  analytics: {
    title: 'Operational Analytics & Fleet Punctuality | AI Smart Railway',
    description: 'Real-time performance metrics, punctuality indicators, delay pattern analytics, and rolling stock telemetry for Indian Railways.',
    keywords: ['Railway Analytics', 'Train Punctuality', 'Indian Railways Performance'],
    canonicalUrl: getCanonicalUrl('/analytics'),
    ogType: 'website'
  }
};
