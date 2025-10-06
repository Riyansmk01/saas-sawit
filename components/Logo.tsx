'use client';

import Link from 'next/link'

interface LogoProps {
  size?: number
  withText?: boolean
  className?: string
}

export default function Logo({ size = 28, withText = true, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`} aria-label="Sawit Harvest Home">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Palm leaf stylized */}
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#lg2)" opacity="0.12" />
        <path d="M30 46c0-10 5-18 14-22" stroke="url(#lg1)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M28 42c0-7 3-13 9-16" stroke="url(#lg1)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M26 38c0-5 2-8 6-10" stroke="url(#lg1)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M24 34c0-3 1-5 3-6" stroke="url(#lg1)" strokeWidth="4" strokeLinecap="round"/>
        {/* Trunk */}
        <path d="M30 46v6" stroke="#0F766E" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      {withText && (
        <span className="text-xl font-extrabold gradient-text tracking-tight">Sawit Harvest</span>
      )}
    </Link>
  )
}


