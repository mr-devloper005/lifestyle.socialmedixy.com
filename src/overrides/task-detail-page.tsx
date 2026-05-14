import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Mail, Linkedin, Twitter, Facebook, Link2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { defaultAuthorProfile } from '@/config/site.identity'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getContent = (post: SitePost) => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as Record<string, unknown>
}

const getImageUrls = (post: SitePost, content: Record<string, unknown>) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => typeof url === 'string' && isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo as string)) return [content.logo as string]
  return [] as string[]
}

function categoryLabel(post: SitePost, content: Record<string, unknown>) {
  const c = content.category
  if (typeof c === 'string' && c.trim()) return c.trim()
  const t = post.tags?.find((x) => typeof x === 'string' && x !== 'mediaDistribution')
  return typeof t === 'string' ? t : 'Press release'
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts('mediaDistribution', 10, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 4)
  const content = getContent(post)
  const rawBody = (typeof content.body === 'string' && content.body.trim()) || post.summary || ''
  const html = formatRichHtml(rawBody, '')
  const dek =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary && post.summary.trim() && post.summary !== rawBody ? post.summary : '') ||
    ''
  const images = getImageUrls(post, content)
  const hero = images[0]
  const author = post.authorName || (typeof content.author === 'string' ? content.author : '') || defaultAuthorProfile.name
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''
  const cat = categoryLabel(post, content)
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const pageUrl = `${baseUrl}/updates/${post.slug}`
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(pageUrl)

  const tagList = Array.isArray(post.tags) ? post.tags.filter((t): t is string => typeof t === 'string' && t !== 'mediaDistribution') : []

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_35%)] text-foreground">
      <NavbarShell />

      <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:pt-12">
        <nav className="text-xs font-medium text-muted-foreground">
          <Link href="/" className="hover:text-[#921A40]">
            Home
          </Link>
          <span className="mx-2 text-[#921A40]/30">/</span>
          <Link href="/updates" className="hover:text-[#921A40]">
            Press releases
          </Link>
          <span className="mx-2 text-[#921A40]/30">/</span>
          <span className="text-[#3a0a1a]/80">{cat}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">{cat}</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.12] tracking-[-0.03em] text-[#3a0a1a] sm:text-4xl lg:text-[2.35rem]">
              {post.title}
            </h1>

            {dek ? (
              <p className="mt-6 border-l-[3px] border-[#921A40] bg-[#fdf8f9]/80 py-3 pl-5 pr-4 text-lg italic leading-relaxed text-[#3a0a1a]/85">
                {dek}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>
                By <span className="font-medium text-[#3a0a1a]">{author}</span>
              </span>
              {date ? <span className="text-[#921A40]/50">·</span> : null}
              {date ? <span>{date}</span> : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#921A40]/12 bg-white text-[#921A40] shadow-sm transition hover:border-[#C75B7A]/45 hover:bg-[#fdf0f3]"
                aria-label="Share on X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#921A40]/12 bg-white text-[#921A40] shadow-sm transition hover:border-[#C75B7A]/45 hover:bg-[#fdf0f3]"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#921A40]/12 bg-white text-[#921A40] shadow-sm transition hover:border-[#C75B7A]/45 hover:bg-[#fdf0f3]"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${shareUrl}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#921A40]/12 bg-white text-[#921A40] shadow-sm transition hover:border-[#C75B7A]/45 hover:bg-[#fdf0f3]"
                aria-label="Email this release"
              >
                <Mail className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#921A40]/20 px-3 py-2 text-xs text-muted-foreground">
                <Link2 className="h-3.5 w-3.5" />
                {pageUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>

            {hero ? (
              <div className="relative mt-10 aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-[1.25rem] border border-[#921A40]/10 bg-muted shadow-[0_24px_70px_rgba(146,26,64,0.08)]">
                <ContentImage src={hero} alt="" fill className="object-cover" priority />
              </div>
            ) : null}

            <RichContent html={html} className="article-content mt-10 max-w-none text-[1.05rem] leading-[1.75] text-[#3a0a1a]/90" />

            {tagList.length ? (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-[#921A40]/10 pt-8">
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#C75B7A]/35 bg-[#fdf8f9] px-3 py-1 text-xs font-medium text-[#921A40]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="space-y-6 lg:pt-2">
            <div className="rounded-[1.25rem] border border-[#921A40]/10 bg-white p-6 shadow-[0_16px_48px_rgba(146,26,64,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Published on</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-[#3a0a1a]">{SITE_CONFIG.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{SITE_CONFIG.description}</p>
              <Link
                href="/updates"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C75B7A] hover:text-[#921A40]"
              >
                More releases
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="rounded-[1.25rem] border border-[#921A40]/10 bg-[#fdf8f9]/50 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Related releases</p>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={`/updates/${item.slug}`} className="group block text-sm font-semibold leading-snug text-[#3a0a1a] hover:text-[#921A40]">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.25rem] border border-[#921A40]/10 bg-[linear-gradient(135deg,#921A40_0%,#C75B7A_100%)] p-6 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">Submit your release</p>
              <p className="mt-3 text-lg font-semibold">Reach thousands of journalists</p>
              <p className="mt-2 text-sm text-white/75">Publish your press release on Lifestyle Social Medixy and get in front of the right media contacts.</p>
              <Link
                href="/create/mediaDistribution"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#921A40] transition hover:bg-[#D9ABAB]"
              >
                Submit release →
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  )
}
