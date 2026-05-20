import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Layers3,
  LineChart,
  Newspaper,
  Radio,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { cn } from '@/lib/utils'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, max = 160) {
  const value = (text || '').trim()
  if (!value) return ''
  return value.length > max ? value.slice(0, max - 1).trimEnd() + '…' : value
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' &&
    post?.content &&
    Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=600&width=900'
}

function categoryLabel(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : ''
  if (typeof c === 'string' && c.trim()) return c.trim()
  const t = post.tags?.find((x) => typeof x === 'string' && x !== 'mediaDistribution')
  return typeof t === 'string' ? t : 'Press release'
}

const MEDIA_CHANNELS = [
  'National Newswires',
  'Trade Publications',
  'Digital News Desks',
  'Search & Discovery',
  'Industry Journals',
  'Regional Press',
]

const FEATURES = [
  {
    title: 'Global media distribution',
    body: 'Reach thousands of journalists, editors, and media outlets across every major industry vertical with a single submission.',
    icon: Globe2,
  },
  {
    title: 'Verified media database',
    body: 'Connect with the right journalists and editorial desks. Our verified media database ensures your story lands with context.',
    icon: Users,
  },
  {
    title: 'Real-time analytics',
    body: 'Track pickup signals, monitor media coverage, and generate stakeholder-ready reports with live distribution analytics.',
    icon: LineChart,
  },
]

const STEPS = [
  { n: '01', title: 'Write & format', body: 'Use our structured composer with AP-style guidance, embargo controls, and multi-media attachments.' },
  { n: '02', title: 'Target & distribute', body: 'Select industry categories, geographic targets, and distribution depth for maximum media reach.' },
  { n: '03', title: 'Track & report', body: 'Monitor pickup in real time, share live coverage links, and export reports for leadership.' },
]

const HOME_CATEGORIES = CATEGORY_OPTIONS.filter((c) =>
  ['business', 'technology', 'health', 'finance', 'news', 'education', 'travel', 'entertainment'].includes(c.slug)
)

const TESTIMONIALS = [
  {
    quote: 'Lifestyle Social Medixy gave our announcements the professional credibility they deserved. Pickup rates doubled within the first month.',
    role: 'VP of Communications',
    org: 'Fortune 500 company',
  },
  {
    quote: 'The clean reading pages and structured metadata made it easy for journalists to find and cite our releases accurately.',
    role: 'PR Director',
    org: 'Global tech firm',
  },
  {
    quote: 'Finally a press release platform that feels like it was built for media professionals, not just marketers.',
    role: 'Senior Editor',
    org: 'Industry publication',
  },
]

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { fresh: true })
  const grid = posts.slice(0, 6)
  const featuredPost = posts[0]
  const secondaryPosts = posts.slice(1, 4)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_38%)] text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#921A40]/10">
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(217,171,171,0.45)_0%,transparent_68%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(146,26,64,0.15)_0%,transparent_70%)] blur-2xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="fe-section">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#921A40]/15 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#921A40]/80 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#921A40]" />
              {siteContent.hero.badge}
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#3a0a1a] sm:text-5xl lg:text-[3.15rem]">
              The world's most trusted platform for official press releases.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{siteContent.hero.description}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#921A40_0%,#C75B7A_55%,#921A40_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(146,26,64,0.3)] transition hover:brightness-105"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 opacity-90" />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#921A40]/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#921A40] transition hover:bg-[#fdf0f3]"
              >
                Browse releases
              </Link>
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['50,000+', 'Media outlets reached'],
                ['200+', 'Industry categories'],
                ['24/7', 'Live monitoring'],
              ].map(([a, b]) => (
                <div key={b} className="rounded-2xl border border-[#921A40]/10 bg-white/70 p-4 shadow-[0_12px_40px_rgba(146,26,64,0.06)] backdrop-blur">
                  <dt className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#921A40]">{a}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="fe-section relative lg:justify-self-end" style={{ animationDelay: '80ms' }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(145deg,#ffffff_0%,#fdf0f3_48%,#f5d0d8_100%)] p-1 shadow-[0_28px_80px_rgba(146,26,64,0.18)]">
              <div className="rounded-[1.75rem] bg-[#921A40] p-6 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">Live distribution</p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">Media pulse</p>
                  </div>
                  <span className="rounded-full bg-[#C75B7A]/30 px-3 py-1 text-[11px] font-semibold text-[#D9ABAB]">Active</span>
                </div>
                <div className="mt-6 space-y-3">
                  {['Wire formatting', 'Editorial routing', 'Pickup tracking'].map((label, i) => (
                    <div key={label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                      <span className="flex items-center gap-2 text-white/85">
                        <CheckCircle2 className={cn('h-4 w-4', i === 0 ? 'text-[#D9ABAB]' : 'text-white/35')} />
                        {label}
                      </span>
                      <span className="text-xs font-medium text-white/45">{i === 0 ? 'Active' : i === 1 ? 'Queued' : 'Tracking'}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-[#C75B7A]/35 bg-[linear-gradient(135deg,rgba(199,91,122,0.35)_0%,rgba(146,26,64,0.65)_100%)] p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">Coverage index</p>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">High</p>
                    </div>
                    <BarChart3 className="h-10 w-10 text-[#D9ABAB]/90" />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70">
                    Live metrics follow the same structured reporting path as your distribution dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED CHANNELS */}
      <section className="border-b border-[#921A40]/8 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Trusted media surfaces</p>
          <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
            {MEDIA_CHANNELS.map((label) => (
              <div
                key={label}
                className="flex min-h-[44px] min-w-[140px] flex-1 items-center justify-center rounded-xl border border-[#921A40]/10 bg-[#fdf8f9] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#921A40]/70 sm:min-w-0 sm:flex-none"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED RELEASE */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="fe-section mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Featured release</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a] sm:text-4xl">Breaking from the wire</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <Link
              href={`/updates/${featuredPost.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-[#921A40]/10 bg-white shadow-[0_20px_60px_rgba(146,26,64,0.08)] transition hover:-translate-y-0.5 hover:border-[#C75B7A]/35"
            >
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-muted">
                <ContentImage src={getPostImage(featuredPost)} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#921A40]/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[#921A40] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                  {categoryLabel(featuredPost)}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-white sm:text-3xl">{featuredPost.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/80">{excerpt(featuredPost.summary)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#D9ABAB]">
                    Read full release <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-4">
              {secondaryPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex gap-4 overflow-hidden rounded-[1.25rem] border border-[#921A40]/10 bg-white p-4 shadow-sm transition hover:border-[#C75B7A]/35"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <ContentImage src={getPostImage(post)} alt="" fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#921A40]">{categoryLabel(post)}</span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#3a0a1a] group-hover:text-[#921A40]">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="fe-section text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Platform</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a] sm:text-4xl">Everything media professionals need.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Distribution reach, verified media targeting, and real-time analytics — built for PR teams that demand results.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-[1.35rem] border border-[#921A40]/10 bg-white p-7 shadow-[0_20px_60px_rgba(146,26,64,0.06)] transition hover:-translate-y-0.5 hover:border-[#C75B7A]/35 hover:shadow-[0_24px_70px_rgba(146,26,64,0.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fdf0f3_0%,#f5d0d8_100%)] text-[#921A40] shadow-inner">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#3a0a1a]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-[#921A40]/10 bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_100%)] py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">How it works</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a]">From draft to headline in three steps.</h2>
            <p className="mt-4 text-muted-foreground">A streamlined workflow that mirrors how professional PR teams actually write, approve, and distribute press releases.</p>
          </div>
          <ol className="space-y-4">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4 rounded-2xl border border-[#921A40]/10 bg-white/90 p-5 shadow-sm backdrop-blur">
                <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#921A40]/85">{s.n}</span>
                <div>
                  <p className="font-semibold text-[#3a0a1a]">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Categories</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a]">Browse by industry</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Find press releases by sector — from technology and finance to health and entertainment.</p>
          </div>
          <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-semibold text-[#C75B7A] hover:text-[#921A40]">
            Full archive
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {HOME_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/updates?category=${encodeURIComponent(c.slug)}`}
              className="rounded-full border border-[#921A40]/12 bg-white px-4 py-2 text-sm font-medium text-[#921A40]/85 shadow-sm transition hover:border-[#C75B7A]/45 hover:bg-[#fdf0f3]"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* LATEST RELEASES GRID */}
      <section className="border-t border-[#921A40]/10 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">{siteContent.taskSectionHeading}</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a]">Latest from the wire</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{siteContent.taskSectionDescriptionSuffix}</p>
            </div>
            <Link
              href="/updates"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#921A40]/15 px-5 py-2.5 text-sm font-semibold text-[#921A40] transition hover:bg-[#fdf0f3]"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {grid.length ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-[#921A40]/10 bg-[#fdf8f9]/40 shadow-[0_16px_50px_rgba(146,26,64,0.06)] transition hover:-translate-y-0.5 hover:border-[#C75B7A]/35"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <ContentImage src={getPostImage(post)} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#921A40] shadow-sm backdrop-blur">
                      {categoryLabel(post)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#3a0a1a] group-hover:text-[#921A40]">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{excerpt(post.summary)}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#C75B7A]">
                      Read release
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[1.5rem] border border-dashed border-[#921A40]/25 bg-[#fdf8f9]/50 p-12 text-center text-muted-foreground">
              <Newspaper className="mx-auto h-12 w-12 text-[#D9ABAB]" />
              <p className="mt-4 font-medium text-[#3a0a1a]">No releases published yet.</p>
              <p className="mt-2 text-sm">When your feed is connected, the latest headlines will appear here automatically.</p>
              <Link href="/create/mediaDistribution" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#921A40] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#C75B7A]">
                Submit the first release
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_100%)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Trusted by media professionals</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a]">What PR teams say about Lifestyle Social Medixy</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <blockquote
                key={`${idx}-${t.role}`}
                className="flex h-full flex-col rounded-[1.35rem] border border-[#921A40]/10 bg-white p-7 shadow-[0_18px_55px_rgba(146,26,64,0.06)]"
              >
                <ShieldCheck className="h-8 w-8 text-[#921A40]/80" />
                <p className="mt-5 flex-1 text-sm leading-relaxed text-[#3a0a1a]/85">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-[#921A40]/10 pt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="font-semibold text-[#3a0a1a]">{t.role}</span>
                  <span className="mx-2 text-[#921A40]/25">·</span>
                  {t.org}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden border-t border-[#921A40]/10 bg-[#921A40] py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(199,91,122,0.45)_0%,transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D9ABAB]/90">{siteContent.cta.badge}</p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{siteContent.cta.title}</h2>
            <p className="mt-3 max-w-xl text-sm text-white/70">{siteContent.cta.description}</p>
          </div>
          <div className="flex shrink-0 items-center sm:mr-[50px]">
            <Link
              href={siteContent.cta.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#D9ABAB] pl-6 pr-4 py-3 text-sm font-semibold text-[#921A40] shadow-lg shadow-black/20 transition hover:bg-white"
            >
              {siteContent.cta.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
