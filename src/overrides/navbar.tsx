'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const mainNav = [
  { label: 'Press releases', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c045d]/10 bg-[rgba(255,255,255,0.88)] text-[#04004a] shadow-[0_8px_32px_rgba(4,0,74,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#1c045d]/12 bg-[linear-gradient(145deg,#ffffff,#f3e9ff)] shadow-sm">
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold leading-none text-[#845ec2]">f</span>
          </span>
          <span className="truncate">
            <span className="block font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.03em]">{SITE_CONFIG.name}</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:block">{siteContent.navbar.tagline}</span>
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
                  active ? 'bg-[#04004a] text-white shadow-sm' : 'text-[#1c045d]/75 hover:bg-[#faf8ff] hover:text-[#04004a]'
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1c045d]/10 text-[#1c045d] transition hover:bg-[#faf8ff] lg:h-9 lg:w-9"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link href="/login" className="hidden text-sm font-semibold text-[#1c045d]/80 hover:text-[#04004a] sm:inline">
            Log in
          </Link>
          <Link
            href="/register"
            className="hidden rounded-full border border-[#1c045d]/15 bg-white px-4 py-2 text-sm font-semibold text-[#04004a] shadow-sm transition hover:border-[#845ec2]/45 sm:inline-flex"
          >
            Sign up
          </Link>
          <Link
            href="/create/mediaDistribution"
            className="hidden rounded-full bg-[linear-gradient(135deg,#845ec2_0%,#744fb1_100%)] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#1c045d]/15 transition hover:brightness-105 md:inline-flex"
          >
            Submit release
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1c045d]/10 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#1c045d]/10 bg-[#faf8ff]/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#04004a] hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-xl px-3 py-3 text-sm font-semibold text-[#744fb1]" onClick={() => setOpen(false)}>
              Search the archive
            </Link>
            <div className="mt-2 flex flex-col gap-2 border-t border-[#1c045d]/10 pt-3">
              <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link href="/register" className="rounded-xl px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
                Sign up
              </Link>
              <Link
                href="/create/mediaDistribution"
                className="rounded-xl bg-[#845ec2] px-3 py-3 text-center text-sm font-semibold text-white"
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
