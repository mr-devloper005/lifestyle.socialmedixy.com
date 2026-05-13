import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { cn } from '@/lib/utils'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, max = 140) {
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

function postMatchesCategory(post: SitePost, slug: string | undefined) {
  if (!slug) return true
  const normalized = normalizeCategory(slug)
  if (!normalized || normalized === 'all') return true
  const opt = CATEGORY_OPTIONS.find((o) => o.slug === normalized)
  const content = post.content && typeof post.content === 'object' ? (post.content as { category?: string }) : {}
  const cat = (content.category || '').toLowerCase()
  if (opt && (cat === opt.name.toLowerCase() || cat === opt.slug)) return true
  if (cat === normalized) return true
  return post.tags?.some((t) => typeof t === 'string' && t.toLowerCase() === normalized) || false
}

function postMatchesWindow(post: SitePost, windowKey: string | undefined) {
  if (!windowKey || windowKey === 'all') return true
  const t = post.publishedAt ? new Date(post.publishedAt).getTime() : 0
  if (!t) return true
  const now = Date.now()
  const day = 86400000
  if (windowKey === '7d') return now - t <= 7 * day
  if (windowKey === '30d') return now - t <= 30 * day
  if (windowKey === '90d') return now - t <= 90 * day
  return true
}

export async function TaskListPageOverride({
  task,
  category,
  window: windowKey,
}: {
  task: TaskKey
  category?: string
  window?: string
}) {
  const posts = await fetchTaskPosts(task, 48, { fresh: true })
  const filtered = posts.filter((p) => postMatchesCategory(p, category)).filter((p) => postMatchesWindow(p, windowKey))
  const normalized = category ? normalizeCategory(category) : 'all'
  const sidebar = posts.slice(0, 5)

  const base = '/updates'
  const qs = (cat: string, win?: string) => {
    const p = new URLSearchParams()
    if (cat && cat !== 'all') p.set('category', cat)
    if (win && win !== 'all') p.set('window', win)
    const s = p.toString()
    return s ? `?${s}` : ''
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ff_0%,#ffffff_42%)] text-foreground">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#845ec2]">Archive</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[#04004a]">Press releases</h1>
          <p className="mt-4 text-muted-foreground">
            Filter by desk category or recency. Full-text search lives on the{' '}
            <Link href="/search" className="font-semibold text-[#744fb1] underline-offset-4 hover:underline">
              search page
            </Link>
            .
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-start">
          <div className="lg:w-64 lg:shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Category</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={base + qs('all', windowKey)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                  normalized === 'all' ? 'bg-[#04004a] text-white' : 'border border-[#1c045d]/12 bg-white hover:border-[#845ec2]/35'
                )}
              >
                All
              </Link>
              {CATEGORY_OPTIONS.slice(0, 12).map((c) => (
                <Link
                  key={c.slug}
                  href={base + qs(c.slug, windowKey)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                    normalized === c.slug ? 'bg-[#04004a] text-white' : 'border border-[#1c045d]/12 bg-white hover:border-[#845ec2]/35'
                  )}
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Published</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Any time' },
                { id: '7d', label: '7 days' },
                { id: '30d', label: '30 days' },
                { id: '90d', label: '90 days' },
              ].map((w) => {
                const winActive = w.id === 'all' ? !windowKey : windowKey === w.id
                return (
                <Link
                  key={w.id}
                  href={base + qs(normalized, w.id === 'all' ? undefined : w.id)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                    winActive ? 'bg-[#845ec2] text-white' : 'border border-[#1c045d]/12 bg-white hover:border-[#845ec2]/35'
                  )}
                >
                  {w.label}
                </Link>
              )})}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <form action="/search" method="get" className="mb-8 flex w-full gap-2 rounded-2xl border border-[#1c045d]/10 bg-white p-2 shadow-sm">
              <input type="hidden" name="master" value="1" />
              <input type="hidden" name="task" value="mediadistribution" />
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1c045d]/35" />
                <input
                  name="q"
                  placeholder="Search headlines, summaries, tags…"
                  className="h-11 w-full rounded-xl border border-transparent bg-[#faf8ff] pl-10 pr-3 text-sm outline-none ring-0 focus:border-[#845ec2]/40"
                  aria-label="Search press releases"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[#04004a] px-5 text-sm font-semibold text-white transition hover:bg-[#1c045d]"
              >
                Search
              </button>
            </form>

            {filtered.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((post) => (
                  <Link
                    key={post.id}
                    href={`/updates/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-[#1c045d]/10 bg-white shadow-[0_16px_48px_rgba(4,0,74,0.06)] transition hover:-translate-y-0.5 hover:border-[#845ec2]/35"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      <ContentImage src={getPostImage(post)} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1c045d]">
                        {categoryLabel(post)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#04004a] group-hover:text-[#744fb1]">{post.title}</h2>
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{excerpt(post.summary)}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#845ec2]">
                        Read release
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-[#1c045d]/25 bg-[#faf8ff]/60 p-12 text-center">
                <p className="font-medium text-[#04004a]">No releases match these filters.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try another category, widen the date window, or use search.</p>
                <Link href="/updates" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#845ec2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#744fb1]">
                  Clear filters
                </Link>
              </div>
            )}
          </div>
        </div>

        <aside className="mt-16 grid gap-6 border-t border-[#1c045d]/10 pt-10 lg:grid-cols-[1fr_280px]">
          <div />
          <div className="rounded-[1.25rem] border border-[#1c045d]/10 bg-[#faf8ff]/50 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Recently updated</p>
            <ul className="mt-4 space-y-4">
              {sidebar.map((post) => (
                <li key={post.id}>
                  <Link href={`/updates/${post.slug}`} className="group block">
                    <p className="text-sm font-semibold leading-snug text-[#04004a] group-hover:text-[#744fb1]">{post.title}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : ''}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
