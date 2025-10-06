'use client';

import { useEffect, useState } from 'react';

interface CursorProps {
  children: React.ReactNode;
}

export default function CustomCursor({ children }: CursorProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {children}
      
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Main Cursor */}
        <div
          className={`absolute transition-all duration-300 ease-out ${
            isHovering 
              ? 'w-8 h-8 bg-white rounded-full' 
              : 'w-4 h-4 bg-white rounded-full'
          } ${isClicking ? 'scale-75' : 'scale-100'}`}
        />
        
        {/* Outer Ring */}
        <div
          className={`absolute transition-all duration-500 ease-out ${
            isHovering 
              ? 'w-16 h-16 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2' 
              : 'w-8 h-8 border border-white rounded-full -translate-x-1/2 -translate-y-1/2'
          } ${isClicking ? 'scale-50 opacity-50' : 'scale-100 opacity-100'}`}
        />
        
        {/* Trail Effect */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
          <div className="w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{ animationDelay: '0.1s' }} />
          <div className="w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-25" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
