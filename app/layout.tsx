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
      <body className={`${inter.className} antialiased bg-[radial-gradient(1200px_800px_at_50%_-200px,rgba(16,185,129,0.08),transparent),radial-gradient(1000px_600px_at_100%_0,rgba(59,130,246,0.06),transparent)]`}>
        {children}
      </body>
    </html>
  )
}
