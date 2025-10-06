'use client';

import { useState, useEffect } from 'react';

interface RotatingTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  direction?: 'clockwise' | 'counterclockwise';
  axis?: 'x' | 'y' | 'z';
  pauseOnHover?: boolean;
  showAll?: boolean;
}

export default function RotatingText({ 
  texts, 
  className = '',
  speed = 2,
  direction = 'clockwise',
  axis = 'y',
  pauseOnHover = true,
  showAll = false
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (showAll) return;
    
    const interval = setInterval(() => {
      if (!isHovered || !pauseOnHover) {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [texts.length, speed, isHovered, pauseOnHover, showAll]);

  const getRotation = () => {
    const baseRotation = (currentIndex * 360) / texts.length;
    const directionMultiplier = direction === 'clockwise' ? 1 : -1;
    
    switch (axis) {
      case 'x':
        return { rotateX: baseRotation * directionMultiplier };
      case 'y':
        return { rotateY: baseRotation * directionMultiplier };
      case 'z':
        return { rotateZ: baseRotation * directionMultiplier };
      default:
        return { rotateY: baseRotation * directionMultiplier };
    }
  };

  if (showAll) {
    return (
      <div className={`relative ${className}`}>
        {texts.map((text, index) => (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${index * (360 / texts.length)}deg)`,
              opacity: 1,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <span className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {text}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateY(${getRotation().rotateY}deg)`,
        transition: 'transform 0.8s ease-in-out',
      }}
    >
      {/* Current text */}
      <div
        className="flex items-center justify-center transition-all duration-300"
        key={currentIndex}
        style={{
          opacity: 1,
          transform: 'scale(1)',
        }}
      >
        <span className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          {texts[currentIndex]}
        </span>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {texts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-green-500 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 3D Carousel version
export function RotatingTextCarousel({ 
  texts, 
  className = '',
  speed = 2 
}: Omit<RotatingTextProps, 'direction' | 'axis' | 'pauseOnHover' | 'showAll'>) {
  return (
    <div
      className={`relative w-64 h-32 ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        animation: `rotate-carousel ${speed * texts.length}s linear infinite`,
      }}
    >
      {texts.map((text, index) => (
        <div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotateY(${index * (360 / texts.length)}deg) translateZ(100px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {text}
          </span>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes rotate-carousel {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}

// Simple CSS-only version
export function CSSRotatingText({ 
  texts, 
  className = '',
  speed = 2 
}: Omit<RotatingTextProps, 'direction' | 'axis' | 'pauseOnHover' | 'showAll'>) {
  return (
    <div className={`css-rotating-text ${className}`}>
      {texts.map((text, index) => (
        <span 
          key={index} 
          className="rotating-text-item"
          style={{
            animationDelay: `${index * speed}s`,
          }}
        >
          {text}
        </span>
      ))}
      
      <style jsx>{`
        .css-rotating-text {
          position: relative;
          height: 3rem;
          overflow: hidden;
        }
        
        .rotating-text-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rotate-text ${speed * texts.length}s infinite;
        }
        
        @keyframes rotate-text {
          0%, 20% { opacity: 1; transform: translateY(0); }
          25%, 45% { opacity: 0; transform: translateY(-100%); }
          50%, 70% { opacity: 0; transform: translateY(100%); }
          75%, 100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
