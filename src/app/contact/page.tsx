import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const organizationTypes = [
  'Please Select',
  'Individual / Freelancer',
  'Small Business',
  'Mid-size Company',
  'Enterprise / Corporation',
  'Non-profit Organization',
  'Government / Public Sector',
  'Media / Press',
  'Other',
]

const subjectOptions = [
  'Please Select',
  'General Inquiry',
  'Technical Support',
  'Billing & Payments',
  'Partnership Opportunity',
  'Press / Media',
  'Feature Request',
  'Report an Issue',
  'Other',
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Page heading */}
        <h1 className="mb-10 text-center text-4xl font-semibold tracking-[-0.03em] text-[#1c045d]">
          Contact Us
        </h1>

        {/* Single column: form only */}
        <div className="grid gap-8">

          {/* ── Form card ── */}
          <div className="rounded-2xl border border-[rgba(28,4,93,0.1)] bg-[#f4f6f9] p-7 shadow-sm">

            {/* Row 1: Contact Name + Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c045d]">
                  Contact Name <span className="text-[#845ec2]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="h-10 rounded-lg border border-[rgba(28,4,93,0.15)] bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#845ec2] focus:outline-none focus:ring-2 focus:ring-[#845ec2]/20"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c045d]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="h-10 rounded-lg border border-[rgba(28,4,93,0.15)] bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#845ec2] focus:outline-none focus:ring-2 focus:ring-[#845ec2]/20"
                />
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1c045d]">
                Email <span className="text-[#845ec2]">*</span>
              </label>
              <input
                type="email"
                required
                className="h-10 rounded-lg border border-[rgba(28,4,93,0.15)] bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#845ec2] focus:outline-none focus:ring-2 focus:ring-[#845ec2]/20"
              />
            </div>

            {/* Help text */}
            <p className="mt-5 text-xs font-medium text-[#5b4a8a]">
              Help Us Understand Your Needs A Little More.
            </p>

            {/* Row 3: Organization type + Subject */}
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c045d]">
                  What type of organization are you? <span className="text-[#845ec2]">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    defaultValue=""
                    className="h-10 w-full appearance-none rounded-lg border border-[rgba(28,4,93,0.15)] bg-white px-3 pr-8 text-sm text-foreground focus:border-[#845ec2] focus:outline-none focus:ring-2 focus:ring-[#845ec2]/20 cursor-pointer"
                  >
                    {organizationTypes.map((opt) => (
                      <option key={opt} value={opt === 'Please Select' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#845ec2]">▾</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c045d]">
                  Subject: How may we help you? <span className="text-[#845ec2]">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    defaultValue=""
                    className="h-10 w-full appearance-none rounded-lg border border-[rgba(28,4,93,0.15)] bg-white px-3 pr-8 text-sm text-foreground focus:border-[#845ec2] focus:outline-none focus:ring-2 focus:ring-[#845ec2]/20 cursor-pointer"
                  >
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt === 'Please Select' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#845ec2]">▾</span>
                </div>
              </div>
            </div>

            {/* Row 4: Message */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1c045d]">
                Message / Comment <span className="text-[#845ec2]">*</span>
              </label>
              <textarea
                required
                rows={5}
                className="rounded-lg border border-[rgba(28,4,93,0.15)] bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#845ec2] focus:outline-none focus:ring-2 focus:ring-[#845ec2]/20 resize-none"
              />
            </div>

            {/* reCAPTCHA placeholder */}
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-[rgba(28,4,93,0.12)] bg-white px-4 py-3 w-fit">
              <input type="checkbox" id="recaptcha" className="h-4 w-4 accent-[#845ec2]" />
              <label htmlFor="recaptcha" className="text-xs text-[#444]">I&apos;m not a robot</label>
              <div className="ml-4 flex flex-col items-center">
                <div className="h-8 w-8 rounded bg-[#f4f6f9] border border-[rgba(28,4,93,0.1)] flex items-center justify-center">
                  <span className="text-[10px] text-[#845ec2] font-bold">rC</span>
                </div>
                <span className="text-[8px] text-muted-foreground mt-0.5">reCAPTCHA</span>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#7B52AB] px-10 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(123,82,171,0.3)] transition hover:bg-[#6a4496] hover:shadow-[0_6px_24px_rgba(123,82,171,0.4)]"
              >
                Submit Now
              </button>
            </div>
          </div>

        </div>

        {/* ── FAQ Banner ── */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#1c045d_0%,#744fb1_60%,#845ec2_100%)] px-8 py-10 shadow-[0_8px_40px_rgba(28,4,93,0.25)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold leading-snug text-white sm:text-xl">
                Please take a moment to check out our FAQs<br className="hidden sm:block" />
                for quick answers to common questions.
              </p>
            </div>
            <Link
              href="/help"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border-2 border-white px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1c045d]"
            >
              VIEW FAQs
            </Link>
          </div>
          {/* Decorative question marks */}
          <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 select-none text-white/10 text-[120px] font-bold leading-none hidden lg:block" aria-hidden>
            ??
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
