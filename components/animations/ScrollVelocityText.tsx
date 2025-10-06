'use client';

import { useEffect, useState, useRef } from 'react';

interface ScrollVelocityTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  trigger?: 'scroll' | 'hover' | 'always';
}

export default function ScrollVelocityText({ 
  children, 
  className = '',
  speed = 1,
  direction = 'up',
  trigger = 'scroll'
}: ScrollVelocityTextProps) {
  const [velocity, setVelocity] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Transform based on direction
  const getTransform = () => {
    const baseTransform = velocity * speed;
    switch (direction) {
      case 'up':
        return { y: baseTransform };
      case 'down':
        return { y: -baseTransform };
      case 'left':
        return { x: baseTransform };
      case 'right':
        return { x: -baseTransform };
      default:
        return { y: baseTransform };
    }
  };

  useEffect(() => {
    if (trigger !== 'scroll') return;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      const newVelocity = Math.min(Math.max(deltaY * 0.1, -50), 50);
      
      setVelocity(newVelocity);
      setLastScrollY(currentScrollY);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateVelocity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, trigger]);

  useEffect(() => {
    if (trigger === 'always') {
      setVelocity(10);
    }
  }, [trigger]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (trigger !== 'hover') return;
    
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;
    
    setVelocity(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
  };

  const transform = getTransform();
  
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate(${transform.x || 0}px, ${transform.y || 0}px)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Main content */}
      <div
        className="relative z-10 transition-all duration-300"
        style={{
          transform: `scale(${isHovered ? 1.05 : 1}) rotate(${velocity * 0.1}deg)`,
        }}
      >
        {children}
      </div>
      
      {/* Velocity indicator */}
      {trigger === 'scroll' && (
        <div
          className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full transition-all duration-200"
          style={{
            transform: `scale(${Math.abs(velocity) * 0.1 + 0.5})`,
            opacity: Math.abs(velocity) * 0.02 + 0.3,
          }}
        />
      )}
      
      {/* Trail effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, ${Math.abs(velocity) * 0.01}), transparent 70%)`,
        }}
      />
    </div>
  );
}

// Alternative version with CSS transforms
export function CSSScrollVelocityText({ 
  children, 
  className = '',
  speed = 1 
}: Omit<ScrollVelocityTextProps, 'direction' | 'trigger'>) {
  return (
    <div className={`scroll-velocity-text ${className}`}>
      {children}
      
      <style jsx>{`
        .scroll-velocity-text {
          transition: transform 0.1s ease-out;
        }
        
        .scroll-velocity-text:hover {
          transform: translateY(-${speed * 5}px) scale(1.05);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .scroll-velocity-text {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
