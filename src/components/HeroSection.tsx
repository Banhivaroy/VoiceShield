'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenGetProtected: () => void;
  onOpenDemo: () => void;
}

export default function HeroSection({ onOpenGetProtected, onOpenDemo }: HeroSectionProps) {
  const video1 = useRef<HTMLVideoElement>(null);
  const video2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Entrance Anim Script
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('anim');
    const startAnim = () => document.documentElement.classList.add('go');
    if (document.fonts) document.fonts.ready.then(startAnim);
    else setTimeout(startAnim, 900);
    setTimeout(() => {
      document.documentElement.classList.remove('anim', 'go');
    }, 2600);
  }, []);

  useEffect(() => {
    // Video crossfade script
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const v1 = video1.current;
    const v2 = video2.current;
    if (!v1 || !v2) return;
    
    let active = v1;
    let inactive = v2;
    const FADE = 0.9;
    let swapping = false;
    
    v1.play().catch(() => {});
    
    const onTimeUpdate = () => {
      if (swapping || active.duration - active.currentTime > FADE) return;
      swapping = true;
      inactive.currentTime = 0;
      inactive.play();
      inactive.classList.add('is-active');
      inactive.style.opacity = '1';
      active.classList.remove('is-active');
      active.style.opacity = '0';
      
      setTimeout(() => {
        active.pause();
        const temp = active;
        active = inactive;
        inactive = temp;
        swapping = false;
      }, FADE * 1000 + 100);
    };
    
    v1.addEventListener('timeupdate', onTimeUpdate);
    v2.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      v1.removeEventListener('timeupdate', onTimeUpdate);
      v2.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  return (
    <section className="relative w-[100vw] h-[100dvh] overflow-hidden bg-transparent">
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,calc(100dvh*1.6))] h-[max(62.5vw,100dvh)]"
        style={{
          maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
        }}
        role="img" 
        aria-label="Violet dot-matrix globe slowly rotating against a starfield"
      >
        <video 
          ref={video1}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto" 
          disablePictureInPicture 
          aria-hidden="true" 
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
          className="is-active absolute inset-0 w-full h-full object-cover object-[51%_8%] opacity-100 transition-opacity duration-[900ms] ease-linear pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4" type="video/mp4" />
        </video>
        <video 
          ref={video2}
          muted 
          loop 
          playsInline 
          preload="auto" 
          disablePictureInPicture 
          aria-hidden="true" 
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp"
          className="absolute inset-0 w-full h-full object-cover object-[51%_8%] opacity-0 transition-opacity duration-[900ms] ease-linear pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="font-medium text-[44px] md:text-[calc(var(--u)*89)] text-[var(--ink)] tracking-[calc(var(--u)*-1)] leading-[calc(var(--u)*90)]">
          <div className="ln"><div className="ln-i">Is that</div></div>
          <div className="ln ln-2"><div className="ln-i"><span className="text-[var(--accent-text)]">really</span> them?</div></div>
        </h1>
        
        <p className="hidden-start mt-[calc(var(--u)*16)] text-[16px] md:text-[calc(var(--u)*17.4)] text-[#f6f6f6] font-light max-w-[46ch] leading-[calc(var(--u)*27)] mx-auto" style={{ transition: 'opacity 0.85s var(--e-reveal), filter 0.85s var(--e-reveal)', transitionDelay: '0.58s' }}>
          Real-time deepfake audio defense for phone calls and audio streams. Verify identity before sending money or disclosing sensitive data.
        </p>

        <div className="hidden-start flex items-center justify-center gap-[calc(var(--u)*7)] mt-[calc(var(--u)*22)]">
          <button onClick={onOpenGetProtected} className="h-[44px] md:h-[calc(var(--u)*39)] px-6 rounded-full bg-[var(--white-btn)] border border-white/30 hover:border-white text-[var(--btn-ink)] hover:bg-[#fff] flex items-center justify-center gap-2 font-medium text-[14px] md:text-[calc(var(--u)*13.3)]" style={{ transition: 'opacity 0.7s var(--e-reveal), transform 0.7s var(--e-reveal)', transitionDelay: '0.90s' }}>
            Get Protected Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onOpenDemo} className="h-[44px] md:h-[calc(var(--u)*39)] px-6 rounded-full bg-[var(--glass-fill)] text-[#d9d9d9] border border-white/20 backdrop-blur-[2px] hover:border-white/40 flex items-center justify-center gap-2 font-medium text-[14px] md:text-[calc(var(--u)*13.3)]" style={{ transition: 'opacity 0.7s var(--e-reveal), transform 0.7s var(--e-reveal)', transitionDelay: '0.97s' }}>
            Watch 60s Demo
          </button>
        </div>
      </div>
    </section>
  );
}
