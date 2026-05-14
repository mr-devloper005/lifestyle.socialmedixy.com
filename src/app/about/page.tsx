import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { ArrowRight, Globe2, Newspaper, ShieldCheck, Users } from 'lucide-react'

const stats = [
  { label: 'Media outlets reached', value: '50,000+' },
  { label: 'Press releases published', value: '200k+' },
  { label: 'Industry categories', value: '200+' },
  { label: 'Countries covered', value: '80+' },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Verified & credible',
    description: 'Every press release on Lifestyle Social Medixy is reviewed for authenticity and formatted to meet professional wire standards.',
  },
  {
    icon: Globe2,
    title: 'Global reach',
    description: 'Our distribution network spans 50,000+ media outlets, journalists, and editorial desks across every major industry.',
  },
  {
    icon: Users,
    title: 'Built for PR professionals',
    description: 'From solo PR consultants to Fortune 500 communications teams, our platform scales to every workflow.',
  },
  {
    icon: Newspaper,
    title: 'Media-first design',
    description: 'Clean reading pages, structured metadata, and shareable links designed for how journalists actually consume press releases.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_38%)] text-foreground">
      <NavbarShell />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#921A40]/10 bg-[#921A40] py-20 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(199,91,122,0.45)_0%,transparent_55%)]" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D9ABAB]/90">About us</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              The world's most trusted press release platform
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 rounded-full bg-[#D9ABAB] px-6 py-3 text-sm font-semibold text-[#921A40] transition hover:bg-white"
              >
                Browse releases
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-[#921A40]/10 bg-white py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#921A40]/10 bg-[#fdf8f9] p-6 text-center shadow-sm">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#921A40]">{s.value}</p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Our mission</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a] sm:text-4xl">
                Connecting organizations with the media that matters.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Lifestyle Social Medixy was founded on the belief that every organization — from startups to global enterprises — deserves a professional, credible platform to share their story with the world.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We built the platform that PR professionals actually want to use: clean, fast, and designed around how journalists consume press releases.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-[1.25rem] border border-[#921A40]/10 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdf0f3] text-[#921A40]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[#3a0a1a]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#921A40]/10 bg-[#fdf0f3] py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[#3a0a1a]">
              Ready to reach the media?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Submit your press release today and connect with thousands of journalists, editors, and media outlets worldwide.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create/mediaDistribution"
                className="inline-flex items-center gap-2 rounded-full bg-[#921A40] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(146,26,64,0.25)] transition hover:bg-[#C75B7A]"
              >
                Submit press release
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 rounded-full border border-[#921A40]/20 bg-white px-7 py-3.5 text-sm font-semibold text-[#921A40] transition hover:bg-[#fdf0f3]"
              >
                Browse releases
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
