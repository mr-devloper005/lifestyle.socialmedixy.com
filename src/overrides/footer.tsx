import Link from 'next/link'
import Image from 'next/image'
import { FileText, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const columns = [
  {
    title: 'Media',
    links: [
      { label: 'Press releases', href: '/updates' },
      { label: 'Submit a release', href: '/create/mediaDistribution' },
      { label: 'Search archive', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Cookie policy', href: '/cookies' },
    ],
  },
]

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  const primary = SITE_CONFIG.tasks.find((t) => t.enabled) || SITE_CONFIG.tasks[0]

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#921A40_0%,#5C0F28_48%,#3a0a1a_100%)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                <Image src="/logo.png" alt={SITE_CONFIG.name} width={44} height={44} className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D9ABAB]/80">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{SITE_CONFIG.description}</p>
            {primary ? (
              <Link
                href={primary.route}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D9ABAB] px-4 py-2.5 text-sm font-semibold text-[#921A40] transition hover:bg-white"
              >
                <FileText className="h-4 w-4" />
                Browse {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D9ABAB]/75">{col.title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/75 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white/80">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
