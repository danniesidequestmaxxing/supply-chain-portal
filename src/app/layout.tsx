import type { Metadata } from 'next'
import { JetBrains_Mono, DM_Sans } from 'next/font/google'
import { IndustryProvider } from '@/store/industry-context'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SCIQ — Supply Chain Intelligence',
  description: 'Multi-industry supply chain and valuation intelligence platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrains.variable} ${dmSans.variable} antialiased`}>
        <IndustryProvider>
          {children}
        </IndustryProvider>
      </body>
    </html>
  )
}
