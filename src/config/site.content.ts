import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Official press releases & media coverage',
  },
  footer: {
    tagline: 'Trusted media coverage for every industry',
  },
  hero: {
    badge: 'Verified press releases',
    title: ['Breaking news and official announcements from the world\'s leading organizations.'],
    description:
      'Lifestyle Social Medixy delivers verified press releases, corporate announcements, and media coverage directly to journalists, editors, and decision-makers worldwide.',
    primaryCta: {
      label: 'Submit press release',
      href: '/create/mediaDistribution',
    },
    secondaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
    searchPlaceholder: 'Search press releases',
    focusLabel: 'Breaking',
    featureCardBadge: 'media desk',
    featureCardTitle: 'Official releases with verified sourcing and structured formatting.',
    featureCardDescription:
      'Every release is formatted for wire distribution, indexed for search, and optimized for media pickup across all major news surfaces.',
  },
  home: {
    metadata: {
      title: 'Lifestyle Social Medixy — Official Press Releases & Media Coverage',
      description:
        'Access verified press releases, corporate announcements, and breaking news from organizations worldwide. Your trusted source for official media coverage.',
      openGraphTitle: 'Lifestyle Social Medixy — Official Press Releases',
      openGraphDescription:
        'Verified press releases, corporate announcements, and media coverage from leading organizations worldwide.',
      keywords: [
        'press release',
        'media coverage',
        'corporate announcements',
        'breaking news',
        'PR wire',
        'official releases',
        'Lifestyle Social Medixy',
      ],
    },
    introBadge: 'Why media teams choose Lifestyle Social Medixy',
    introTitle: 'The most trusted source for official press releases.',
    introParagraphs: [
      'Every release on Lifestyle Social Medixy is verified, structured for wire distribution, and optimized for maximum media pickup across digital and print surfaces.',
      'Our platform connects PR professionals with journalists, editors, and media outlets—ensuring your story reaches the right audience at the right time.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Verified press pages with full media metadata.',
      'Category-filtered archive for fast editorial research.',
      'Distribution analytics showing real pickup signals.',
    ],
    primaryLink: {
      label: 'Browse releases',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Contact editorial',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to reach the media?',
    title: 'Submit your press release and get in front of journalists worldwide.',
    description:
      'Publish your announcement on Lifestyle Social Medixy and reach thousands of journalists, editors, and media outlets with a single submission.',
    primaryCta: {
      label: 'Submit press release',
      href: '/create/mediaDistribution',
    },
  },
  taskSectionHeading: 'Latest press releases',
  taskSectionDescriptionSuffix: 'Fresh announcements from verified organizations.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press releases',
    description: 'Browse syndicated announcements, launches, and updates.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press release archive',
    paragraphs: [
      'Scan headlines by category, open clean reading pages, and share direct links with stakeholders.',
      'Filters keep the archive usable on phones—without sacrificing density for desktop reviewers.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
}
