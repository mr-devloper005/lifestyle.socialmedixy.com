import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: `Pricing | ${SITE_CONFIG.name}`,
    description: 'Choose a distribution tier for your press releases—transparent limits, clear analytics, and optional add-ons.',
    openGraphTitle: `Pricing | ${SITE_CONFIG.name}`,
    openGraphDescription: 'Basic, Pro, and Premium plans with comparison by distribution depth, analytics, and media reach.',
    keywords: ['press release pricing', 'PR distribution plans', 'media wire pricing'],
  })
}

const PLANS = [
  {
    name: 'Basic',
    price: '$399',
    cadence: 'per release',
    blurb: 'Foundations for teams validating a wire workflow.',
    popular: false,
    features: ['Core wire formatting', 'National syndication map (standard)', 'Pickup summary email', 'Business-day support'],
    cta: { label: 'Get started', href: '/register' },
  },
  {
    name: 'Pro',
    price: '$659',
    cadence: 'per release',
    blurb: 'The balanced option for frequent launches and campaigns.',
    popular: true,
    features: [
      'Everything in Basic',
      'Expanded endpoint map + vertical boosts',
      'Analytics dashboard (export-ready)',
      'Embargo scheduling',
      'Priority review queue',
    ],
    cta: { label: 'Choose Pro', href: '/register' },
  },
  {
    name: 'Premium',
    price: 'Custom',
    cadence: 'talk to us',
    blurb: 'For brands that need bespoke routing and analyst support.',
    popular: false,
    features: [
      'Everything in Pro',
      'Named routing & beat targeting',
      'Stakeholder digest templates',
      'Quarterly readout with recommendations',
      'Dedicated distribution lead',
    ],
    cta: { label: 'Contact sales', href: '/contact' },
  },
]

const COMPARE = [
  { label: 'Distribution depth', basic: 'Standard map', pro: 'Expanded + vertical boosts', premium: 'Custom routing' },
  { label: 'Analytics', basic: 'Summary email', pro: 'Full dashboard', premium: 'Dashboard + analyst readouts' },
  { label: 'Media reach signals', basic: 'Core', pro: 'Advanced', premium: 'Custom KPI pack' },
  { label: 'Embargo & scheduling', basic: '—', pro: 'Included', premium: 'Included + escalation' },
]

const ADDONS = [
  { title: 'Extra vertical boost', body: 'Temporary amplification for finance, health, or tech desks during launch windows.' },
  { title: 'Logo & multimedia pack', body: 'Richer assets in downstream syndication with QA for attachment safety.' },
  { title: 'Executive media training', body: 'One working session for spokespersons before high-stakes announcements.' },
]

const FAQ = [
  {
    q: 'Do plans include drafting or editing?',
    a: 'Plans cover distribution, routing, and reporting. Editorial services can be added as a professional service where available.',
  },
  {
    q: 'Can we switch tiers between releases?',
    a: 'Yes—choose the tier that matches each announcement. Historical releases keep the analytics from their original tier.',
  },
  {
    q: 'How do analytics align with our internal reporting?',
    a: 'Exports use standard formats so you can merge pickup summaries into your existing comms stack without rework.',
  },
  {
    q: 'Is there a trial?',
    a: 'Teams can start with Basic for a single release to validate formatting and timing before scaling to Pro or Premium.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ff_0%,#ffffff_40%)] text-foreground">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#845ec2]">Pricing</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[#04004a] sm:text-5xl">
            Plans that scale with your news cycle
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Pick a tier by distribution depth and analytics—then layer add-ons when a launch needs extra lift.
          </p>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[1.35rem] border p-7 shadow-[0_20px_60px_rgba(4,0,74,0.06)] ${
                plan.popular
                  ? 'border-[#845ec2] bg-[linear-gradient(180deg,#ffffff_0%,#faf5ff_100%)] ring-2 ring-[#845ec2]/25'
                  : 'border-[#1c045d]/10 bg-white'
              }`}
            >
              {plan.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#04004a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  Most popular
                </span>
              ) : null}
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#04004a]">{plan.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#04004a]">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#845ec2]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.popular
                    ? 'bg-[linear-gradient(135deg,#845ec2_0%,#744fb1_100%)] text-white shadow-lg shadow-[#1c045d]/15 hover:brightness-105'
                    : 'border border-[#1c045d]/15 bg-white text-[#04004a] hover:border-[#845ec2]/45'
                }`}
              >
                {plan.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-24">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#04004a]">Feature comparison</h2>
          <p className="mt-2 text-muted-foreground">A quick read across the dimensions teams ask about first.</p>
          <div className="mt-8 overflow-x-auto rounded-[1.25rem] border border-[#1c045d]/10 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#1c045d]/10 bg-[#faf8ff]/80">
                  <th className="px-5 py-4 font-semibold text-[#04004a]">Capability</th>
                  <th className="px-5 py-4 font-semibold text-[#04004a]">Basic</th>
                  <th className="px-5 py-4 font-semibold text-[#845ec2]">Pro</th>
                  <th className="px-5 py-4 font-semibold text-[#04004a]">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className="border-b border-[#1c045d]/8 last:border-0">
                    <td className="px-5 py-4 font-medium text-[#1c045d]">{row.label}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.basic}</td>
                    <td className="px-5 py-4 text-[#04004a]">{row.pro}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#04004a]">Add-ons</h2>
          <p className="mt-2 text-muted-foreground">Layer these when a story needs more than standard routing.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ADDONS.map((a) => (
              <div key={a.title} className="rounded-[1.15rem] border border-[#1c045d]/10 bg-[#faf8ff]/50 p-6">
                <h3 className="font-semibold text-[#04004a]">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#04004a]">FAQ</h2>
          <Accordion type="single" collapsible className="mt-6 w-full rounded-[1.25rem] border border-[#1c045d]/10 bg-white px-2">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-[#1c045d]/10 px-3">
                <AccordionTrigger className="text-left font-semibold text-[#04004a] hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  )
}
