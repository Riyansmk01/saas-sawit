'use client';

import { useEffect, useRef } from 'react';

interface Thread {
  id: number;
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  color: string;
  opacity: number;
}

interface AnimatedThreadsProps {
  className?: string;
  threadCount?: number;
  speed?: number;
  colors?: string[];
  interactive?: boolean;
}

export default function AnimatedThreads({ 
  className = '',
  threadCount = 50,
  speed = 1,
  colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'],
  interactive = true
}: AnimatedThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const threadsRef = useRef<Thread[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize threads
    const initThreads = () => {
      threadsRef.current = Array.from({ length: threadCount }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.01) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    initThreads();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      threadsRef.current.forEach((thread) => {
        // Update thread position
        thread.x += Math.cos(thread.angle) * thread.speed;
        thread.y += Math.sin(thread.angle) * thread.speed;

        // Wrap around screen
        if (thread.x < 0) thread.x = canvas.width;
        if (thread.x > canvas.width) thread.x = 0;
        if (thread.y < 0) thread.y = canvas.height;
        if (thread.y > canvas.height) thread.y = 0;

        // Mouse interaction
        if (interactive) {
          const dx = mouseRef.current.x - thread.x;
          const dy = mouseRef.current.y - thread.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            thread.angle += (Math.atan2(dy, dx) - thread.angle) * force * 0.1;
          }
        }

        // Draw thread
        ctx.save();
        ctx.globalAlpha = thread.opacity;
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(thread.x, thread.y);
        
        // Draw thread segments
        for (let i = 0; i < thread.length; i++) {
          const segmentX = thread.x + Math.cos(thread.angle) * i;
          const segmentY = thread.y + Math.sin(thread.angle) * i;
          ctx.lineTo(segmentX, segmentY);
        }
        
        ctx.stroke();
        ctx.restore();

        // Draw connections between nearby threads
        threadsRef.current.forEach((otherThread) => {
          if (thread.id === otherThread.id) return;
          
          const dx = thread.x - otherThread.x;
          const dy = thread.y - otherThread.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (150 - distance) / 150 * 0.1;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(thread.x, thread.y);
            ctx.lineTo(otherThread.x, otherThread.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [threadCount, speed, colors, interactive]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}

// Alternative SVG version
export function SVGAnimatedThreads({ 
  className = '',
  threadCount = 20,
  speed = 1,
  colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']
}: Omit<AnimatedThreadsProps, 'interactive'>) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <svg className="w-full h-full">
        {Array.from({ length: threadCount }, (_, i) => (
          <path
            key={i}
            d={`M ${Math.random() * 100}% ${Math.random() * 100}% Q ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}%`}
            stroke={colors[i % colors.length]}
            strokeWidth="2"
            fill="none"
            opacity={0.3}
            className="animate-thread-move"
            style={{
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// CSS-only version
export function CSSAnimatedThreads({ 
  className = '',
  threadCount = 30 
}: Pick<AnimatedThreadsProps, 'className' | 'threadCount'>) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {Array.from({ length: threadCount }, (_, i) => (
        <div
          key={i}
          className="absolute w-px bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            height: `${Math.random() * 200 + 100}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
