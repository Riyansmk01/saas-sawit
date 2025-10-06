'use client';

import { useEffect, useState } from 'react';

interface LogoLoopProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export default function LogoLoop({ 
  text, 
  className = '', 
  speed = 20,
  direction = 'left' 
}: LogoLoopProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className="flex animate-scroll"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 px-8">
            <span className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {text}
            </span>
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
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 px-8">
            <span className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
