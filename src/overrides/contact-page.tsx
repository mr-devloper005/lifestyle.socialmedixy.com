import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf0f3_0%,#ffffff_38%)] text-foreground">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#921A40]">Get in touch</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[#3a0a1a]">Contact Lifestyle Social Medixy</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            For editorial questions, press release submissions, corrections, or media partnership enquiries, reach out to our team.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-[1.5rem] border border-[#921A40]/10 bg-white p-8 shadow-[0_20px_60px_rgba(146,26,64,0.08)]">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3a0a1a]">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form and our team will get back to you within 24 hours.</p>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">First name</label>
                  <input type="text" className="w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 py-3 text-sm outline-none focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10" placeholder="Jane" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">Last name</label>
                  <input type="text" className="w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 py-3 text-sm outline-none focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">Email address</label>
                <input type="email" className="w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 py-3 text-sm outline-none focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10" placeholder="jane@company.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">Subject</label>
                <select className="w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 py-3 text-sm outline-none focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10">
                  <option>Press release submission</option>
                  <option>Editorial question</option>
                  <option>Media partnership</option>
                  <option>Correction request</option>
                  <option>General enquiry</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#921A40]/80">Message</label>
                <textarea rows={4} className="w-full rounded-xl border border-[#921A40]/15 bg-[#fdf8f9] px-4 py-3 text-sm outline-none focus:border-[#C75B7A]/50 focus:ring-2 focus:ring-[#921A40]/10" placeholder="Tell us how we can help…" />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[linear-gradient(135deg,#921A40_0%,#C75B7A_100%)] py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(146,26,64,0.25)] transition hover:brightness-105"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
