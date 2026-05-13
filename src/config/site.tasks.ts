export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press releases',
    route: '/online-media',
    description: 'Syndicated announcements, launches, and newsroom updates.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/online-media',
} as const
