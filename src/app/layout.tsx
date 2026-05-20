import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getGoogleFontsHref, getSiteFontVariables } from '@/config/site.font'

export async function generateMetadata(): Promise<Metadata> {
  const base = await buildSiteMetadata()
  return {
    ...base,
    icons: {
      icon: [
        { url: '/favicon.png?v=2', type: 'image/png' },
        { url: '/favicon.ico', type: 'image/x-icon' },
      ],
      apple: [
        { url: '/apple-icon.png?v=2', type: 'image/png' },
      ],
      shortcut: '/favicon.png?v=2',
    },
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe, brandPack } = getFactoryState()
  const googleFontsHref = getGoogleFontsHref()
  const siteFontVariables = getSiteFontVariables()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {googleFontsHref ? <link rel="stylesheet" href={googleFontsHref} /> : null}
        {/* Explicit favicon links with cache-bust — overrides any stale browser cache */}
        <link rel="icon" type="image/png" href="/favicon.png?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.png?v=2" />
      </head>
      <body
        data-site-shell={recipe.homeLayout}
        data-motion-pack={recipe.motionPack}
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}`}
        style={siteFontVariables}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
