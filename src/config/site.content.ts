import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press wire & syndication',
  },
  footer: {
    tagline: 'Distribution analytics for modern comms teams',
  },
  hero: {
    badge: 'National syndication',
    title: ['Reach journalists and readers where decisions are made.'],
    description:
      'feedopr routes your story through a curated distribution network with structured reporting—built for teams that need clarity, not clutter.',
    primaryCta: {
      label: 'Submit press release',
      href: '/create/mediaDistribution',
    },
    secondaryCta: {
      label: 'View latest releases',
      href: '/online-media',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'distribution desk',
    featureCardTitle: 'Wire-ready formatting and predictable timelines.',
    featureCardDescription:
      'Draft, review, and publish with fields tuned for press workflows—without turning the homepage into a generic blog template.',
  },
  home: {
    metadata: {
      title: 'feedopr — Press release distribution & syndication',
      description:
        'Distribute announcements to thousands of digital endpoints, monitor pickup signals, and keep teams aligned with analytics built for comms.',
      openGraphTitle: 'feedopr — Press release distribution',
      openGraphDescription:
        'Syndicated distribution, media targeting, and reporting in one calm, operator-friendly surface.',
      keywords: [
        'press release distribution',
        'media syndication',
        'PR wire',
        'earned media',
        'announcements',
        'feedopr',
      ],
    },
    introBadge: 'Why teams choose feedopr',
    introTitle: 'Built for distribution—not for decorative homepages.',
    introParagraphs: [
      'The surface is tuned for scanning headlines, comparing categories, and opening clean reading pages—matching how editorial and comms teams actually work.',
      'Behind the UI, the same task routes and publishing flows stay compatible with the wider platform—so you can grow without a redesign later.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Structured press pages with shareable metadata.',
      'Archive views with filters that stay fast on mobile.',
      'Analytics framing that highlights reach—not vanity charts.',
    ],
    primaryLink: {
      label: 'Browse releases',
      href: '/online-media',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to ship your next announcement?',
    title: 'Submit a release, track pickup, and keep stakeholders in the loop.',
    description:
      'Start with a straightforward composer, publish to your wire, and use search-friendly pages that stay easy to read on every device.',
    primaryCta: {
      label: 'Submit press release',
      href: '/create/mediaDistribution',
    },
    secondaryCta: {
      label: 'Compare plans',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest press releases',
  taskSectionDescriptionSuffix: 'Fresh announcements from the feedopr wire.',
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
