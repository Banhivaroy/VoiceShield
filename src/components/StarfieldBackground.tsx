'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  hasGlow: boolean;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const colors = [
      '255, 255, 255',      // Pure white
      '255, 255, 255',      // Pure white (weighted higher)
      '196, 181, 253',      // Soft violet
      '167, 139, 250',      // Muted violet accent
      '207, 250, 254',      // Soft cyan
    ];

    const initStars = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Star count proportional to screen area
      const count = Math.max(160, Math.floor((width * height) / 3800));
      stars = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let radius = 0.6 + Math.random() * 0.7; // ~0.6px to 1.3px
        let hasGlow = false;

        if (rand > 0.94) {
          radius = 1.6 + Math.random() * 0.8; // Bright focal stars
          hasGlow = true;
        } else if (rand > 0.80) {
          radius = 1.1 + Math.random() * 0.5; // Medium stars
        }

        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = 0.25 + Math.random() * 0.65;
        const twinkleSpeed = 0.012 + Math.random() * 0.025;
        const phase = Math.random() * Math.PI * 2;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha,
          twinkleSpeed,
          phase,
          color,
          hasGlow,
        });
      }
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw each star
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Gentle twinkle calculation using sine wave
        const alphaVariation = Math.sin(tick * star.twinkleSpeed + star.phase) * 0.35;
        const alpha = Math.min(1, Math.max(0.12, star.baseAlpha + alphaVariation));

        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;

        if (star.hasGlow) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${star.color}, ${alpha * 0.8})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    initStars();
    render();

    const handleResize = () => {
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000000]"
      aria-hidden="true"
    >
      {/* Canvas for dynamic stars */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block" 
      />
    </div>
  );
}
