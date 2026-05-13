import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Press releases', href: '/updates' },
      { label: 'Submit a release', href: '/create/mediaDistribution' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press room', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
]

export function FooterOverride() {
  const primary = SITE_CONFIG.tasks.find((t) => t.enabled) || SITE_CONFIG.tasks[0]

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#04004a_0%,#1c045d_48%,#0f0238_100%)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#f3c5ff]">f</span>
              </span>
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f3c5ff]/80">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{SITE_CONFIG.description}</p>
            {primary ? (
              <Link
                href={primary.route}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f3c5ff] px-4 py-2.5 text-sm font-semibold text-[#04004a] transition hover:bg-white"
              >
                <FileText className="h-4 w-4" />
                Browse {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f3c5ff]/75">{col.title}</h3>
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
