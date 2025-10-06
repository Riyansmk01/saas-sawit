'use client';

import { useEffect, useState } from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  animated?: boolean;
}

export default function ElectricBorder({ 
  children, 
  className = '',
  intensity = 'medium',
  color = '#10B981',
  animated = true 
}: ElectricBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const intensityMap = {
    low: { duration: 3, opacity: 0.3, blur: 2 },
    medium: { duration: 2, opacity: 0.6, blur: 1 },
    high: { duration: 1, opacity: 1, blur: 0.5 }
  };

  const config = intensityMap[intensity];

  return (
    <div
      className={`relative electric-border ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Electric border effect */}
      <div
        className={`absolute inset-0 rounded-lg ${
          animated ? 'animate-electric-flow' : ''
        }`}
        style={{
          background: `linear-gradient(45deg, ${color}, transparent, ${color}, transparent, ${color})`,
          backgroundSize: '400% 400%',
          filter: `blur(${config.blur}px)`,
          opacity: isHovered ? config.opacity : config.opacity * 0.5,
        }}
      />
      
      {/* Inner glow */}
      <div
        className="absolute inset-1 rounded-lg transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${color}20, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0.4,
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg">
        {children}
      </div>
      
      {/* Electric sparks */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Alternative CSS-only version
export function CSSElectricBorder({ 
  children, 
  className = '',
  color = '#10B981'
}: Omit<ElectricBorderProps, 'intensity' | 'animated'>) {
  return (
    <div className={`electric-border relative ${className}`}>
      <div className="absolute inset-0 rounded-lg electric-border-bg" />
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg">
        {children}
      </div>
      
      <style jsx>{`
        .electric-border-bg {
          background: linear-gradient(45deg, ${color}, transparent, ${color}, transparent, ${color});
          background-size: 400% 400%;
          animation: electric-flow 2s linear infinite;
          filter: blur(1px);
        }
        
        @keyframes electric-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .electric-border:hover .electric-border-bg {
          animation-duration: 1s;
          filter: blur(0.5px);
        }
      `}</style>
    </div>
  );
}
