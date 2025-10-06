import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sawit Harvest - Sistem Pencatatan Panen Sawit',
  description: 'Platform SaaS untuk pencatatan dan monitoring hasil panen sawit (TBS) dengan laporan otomatis dan multi-user support.',
  keywords: 'sawit, panen, TBS, tandan buah segar, pertanian, monitoring, laporan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
