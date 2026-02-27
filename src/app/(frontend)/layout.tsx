import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { AcademyNav } from '@/components/AcademyNav'
import { AcademyFooter } from '@/components/AcademyFooter'
import { CustomCursor } from '@/components/CustomCursor'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTracks } from '@/utilities/academy-data'
import type { Header, Footer, Setting, Track } from '@/payload-types'

// ── Google Font: Inter – our primary UI typeface ──────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const headerData = (await getCachedGlobal('header', 1)()) as unknown as Header
  const footerData = (await getCachedGlobal('footer', 1)()) as unknown as Footer
  const settingsData = (await getCachedGlobal('settings', 1)()) as unknown as Setting
  const tracksData = (await getTracks()) as Track[]

  return (
    <html
      className={cn(inter.variable, GeistSans.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <CustomCursor />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <AcademyNav data={headerData} settings={settingsData} />
          <main className="flex-1">
            {children}
          </main>
          <AcademyFooter data={footerData} settings={settingsData} tracks={tracksData} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
