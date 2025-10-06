'use client';

import { useRef, useEffect, useState } from 'react';

interface MagnetButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export default function MagnetButton({ 
  children, 
  className = '', 
  strength = 0.3,
  disabled = false 
}: MagnetButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHovered, strength]);

  return (
    <div
      ref={buttonRef}
      className={`relative overflow-hidden magnet-button ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Background with gradient animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 ${
          isHovered ? 'animate-gradient-x' : ''
        }`}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      
      {/* Shimmer effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent ${
          isHovered ? 'animate-shimmer' : 'opacity-0'
        }`}
      />
      
      {/* Content */}
      <div className="relative z-10 px-6 py-3 text-white font-semibold">
        {children}
      </div>
      
      {/* Electric border effect */}
      <div
        className={`absolute inset-0 border-2 ${
          isHovered ? 'animate-electric-border' : 'border-transparent'
        }`}
      />
    </div>
  );
}

// Alternative version with CSS-only magnet effect
export function CSSMagnetButton({ 
  children, 
  className = '', 
  disabled = false 
}: Omit<MagnetButtonProps, 'strength'>) {
  return (
    <div
      className={`magnet-button relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-gradient-x" />
      <div className="relative z-10 px-6 py-3 text-white font-semibold">
        {children}
      </div>
    </div>
  );
}
