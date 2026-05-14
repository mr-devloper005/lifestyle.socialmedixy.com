'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const mainNav = [
  { label: 'Press Releases', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#921A40]/12 bg-[rgba(255,255,255,0.92)] text-[#3a0a1a] shadow-[0_8px_32px_rgba(146,26,64,0.08)] backdrop-blur-xl">
      {/* Breaking news ticker */}
      <div className="bg-[#921A40] px-4 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
        <span className="mr-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D9ABAB]" />
          LIVE
        </span>
        Official press releases &amp; verified media coverage — updated continuously
      </div>

      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#921A40]/20 bg-white shadow-sm">
            <Image src="/logo.png" alt={SITE_CONFIG.name} width={40} height={40} className="h-full w-full object-contain" />
          </span>
          <span className="truncate">
            <span className="block font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-[#921A40]">{SITE_CONFIG.name}</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[#921A40]/60 sm:block">{siteContent.navbar.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-[#921A40] text-white shadow-sm'
                    : 'text-[#921A40]/75 hover:bg-[#fdf0f3] hover:text-[#921A40]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#921A40]/15 text-[#921A40] transition hover:bg-[#fdf0f3] lg:h-9 lg:w-9"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link href="/login" className="hidden text-sm font-semibold text-[#921A40]/80 hover:text-[#921A40] sm:inline">
            Log in
          </Link>
          <Link
            href="/register"
            className="hidden rounded-full border border-[#921A40]/20 bg-white px-4 py-2 text-sm font-semibold text-[#921A40] shadow-sm transition hover:border-[#C75B7A]/45 sm:inline-flex"
          >
            Sign up
          </Link>
          <Link
            href="/create/mediaDistribution"
            className="hidden rounded-full bg-[linear-gradient(135deg,#921A40_0%,#C75B7A_100%)] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#921A40]/20 transition hover:brightness-105 md:inline-flex"
          >
            Submit release
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#921A40]/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#921A40]/10 bg-[#fdf8f9]/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#3a0a1a] hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-xl px-3 py-3 text-sm font-semibold text-[#C75B7A]" onClick={() => setOpen(false)}>
              Search the archive
            </Link>
            <div className="mt-2 flex flex-col gap-2 border-t border-[#921A40]/10 pt-3">
              <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link href="/register" className="rounded-xl px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
                Sign up
              </Link>
              <Link
                href="/create/mediaDistribution"
                className="rounded-xl bg-[#921A40] px-3 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Submit release
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
