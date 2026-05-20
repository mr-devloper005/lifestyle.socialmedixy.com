export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'o9tkhaqzaq',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Lifestyle Social Medixy',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Official press releases & media coverage',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Lifestyle Social Medixy is your trusted source for official press releases, breaking announcements, and verified media coverage across all industries.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'lifestyle.socialmedixy.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lifestyle.socialmedixy.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
