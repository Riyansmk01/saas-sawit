'use client';

import { useMemo } from 'react';

interface LogoLoopProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  copies?: number;
  showDivider?: boolean;
  dividerChar?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function LogoLoop({ 
  text, 
  className = '', 
  speed = 20,
  direction = 'left',
  copies = 6,
  showDivider = true,
  dividerChar = '•',
  gradientFrom = 'from-sawit-400',
  gradientVia = 'via-primary-500',
  gradientTo = 'to-blue-600',
  fontSize = 'lg',
}: LogoLoopProps) {
  const sizeClass = useMemo(() => {
    switch (fontSize) {
      case 'sm': return 'text-2xl';
      case 'md': return 'text-3xl';
      case 'lg': return 'text-4xl';
      case 'xl': return 'text-5xl';
      default: return 'text-4xl';
    }
  }, [fontSize])

  const gradientClass = `bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo}`

  return (
    <div className={`overflow-hidden ${className}`} style={{
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)'
    }}>
      <div 
        className="flex animate-scroll"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' as any : 'normal'
        }}
      >
        {[...Array(Math.max(3, copies))].map((_, i) => (
          <div key={i} className="flex-shrink-0 px-8 flex items-center gap-6">
            <span className={`font-bold ${sizeClass} ${gradientClass} bg-clip-text text-transparent drop-shadow-sm`}>
              {text}
            </span>
            {showDivider && (
              <span className="opacity-60 text-white/60">{dividerChar}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Alternative simpler version without framer-motion
export function SimpleLogoLoop({ 
  text, 
  className = '', 
  speed = 20 
}: Omit<LogoLoopProps, 'direction'>) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className="flex animate-scroll"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 px-8">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sawit-400 via-primary-500 to-blue-600 bg-clip-text text-transparent">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
