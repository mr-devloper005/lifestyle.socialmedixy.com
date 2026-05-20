import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_38%)] text-foreground">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">

          {/* Left panel — brand side */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#921A40_0%,#C75B7A_60%,#5C0F28_100%)] p-8 text-white shadow-[0_28px_80px_rgba(146,26,64,0.25)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,171,171,0.25)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                <Image src="/logo.png" alt={SITE_CONFIG.name} width={48} height={48} className="h-full w-full object-contain" />
              </span>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-[-0.03em]">
                Start reaching the media today
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Create your free account and submit your first press release to thousands of journalists and media outlets worldwide.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  'Free account — no credit card required',
                  'Reach 50,000+ verified media contacts',
                  'Live pickup tracking & analytics',
                  'AP-style formatting guidance built in',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9ABAB]" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                {SITE_CONFIG.name}
              </p>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="rounded-[2rem] border border-[#921A40]/12 bg-white p-8 shadow-[0_20px_60px_rgba(146,26,64,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Get started</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-[#3a0a1a]">
              Create your free account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#921A40] hover:text-[#C75B7A]">
                Sign in
              </Link>
            </p>

            <form className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="h-12 w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 text-sm outline-none transition focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="h-12 w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 text-sm outline-none transition focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 text-sm outline-none transition focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">
                  Organization / Company
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  className="h-12 w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 text-sm outline-none transition focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className="h-12 w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 text-sm outline-none transition focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#921A40_0%,#C75B7A_100%)] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(146,26,64,0.3)] transition hover:brightness-105"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-xl border border-[#921A40]/10 bg-[#fdf8f9] p-4 text-center text-xs text-muted-foreground">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="font-semibold text-[#921A40] hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="font-semibold text-[#921A40] hover:underline">Privacy Policy</Link>.
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  )
}
