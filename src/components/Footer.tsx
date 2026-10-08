'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenAuditModal?: () => void;
  onOpenEnterprise?: () => void;
}

// 4-Quadrant Emblem matching the reference image
function FourArcEmblem({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="11" 
      strokeLinecap="round" 
      className={className}
    >
      {/* Top arc */}
      <path d="M 37 19 A 34 34 0 0 1 63 19" />
      {/* Bottom arc */}
      <path d="M 37 81 A 34 34 0 0 0 63 81" />
      {/* Left arc */}
      <path d="M 19 37 A 34 34 0 0 0 19 63" />
      {/* Right arc */}
      <path d="M 81 37 A 34 34 0 0 1 81 63" />
    </svg>
  );
}

export default function Footer({ onOpenAuditModal, onOpenEnterprise }: FooterProps) {
  return (
    <footer className="w-full relative overflow-hidden bg-transparent pt-12 pb-16 text-white selection:bg-white/20">
      
      {/* 1. Top Crosshair Line (✕ ─── ✕ ─── ✕ ─── ✕ ─── ✕) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="flex items-center justify-between text-white/30">
          <span className="text-white/40 text-sm font-light select-none">✕</span>
          <div className="flex-1 h-[1px] bg-white/10 mx-3" />
          <span className="text-white/40 text-sm font-light select-none">✕</span>
          <div className="flex-1 h-[1px] bg-white/10 mx-3" />
          <span className="text-white/40 text-sm font-light select-none">✕</span>
          <div className="flex-1 h-[1px] bg-white/10 mx-3" />
          <span className="text-white/40 text-sm font-light select-none">✕</span>
          <div className="flex-1 h-[1px] bg-white/10 mx-3" />
          <span className="text-white/40 text-sm font-light select-none">✕</span>
        </div>
      </div>

      {/* 2. Top Watermark Emblem & Rosette Pattern */}
      <div className="relative w-full flex flex-col items-center justify-center mb-[-24px] pointer-events-none">
        {/* Rosette Sacred Geometry Pattern Background */}
        <div 
          className="absolute w-[640px] h-[220px] -top-16 opacity-35 overflow-hidden flex items-center justify-center"
          style={{
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
          }}
        >
          <svg width="640" height="220" viewBox="0 0 640 220" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.85">
            {/* Interlocking geometric rosette circles */}
            {[-120, -60, 0, 60, 120].map((dx, idx) => (
              <g key={idx} transform={`translate(${320 + dx}, 110)`}>
                <circle cx="0" cy="0" r="42" />
                <circle cx="0" cy="-24" r="42" />
                <circle cx="0" cy="24" r="42" />
                <circle cx="-21" cy="-12" r="42" />
                <circle cx="21" cy="-12" r="42" />
                <circle cx="-21" cy="12" r="42" />
                <circle cx="21" cy="12" r="42" />
              </g>
            ))}
          </svg>
        </div>

        {/* Large Central 4-Arc Emblem */}
        <div className="relative z-10 text-white/35">
          <FourArcEmblem className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
      </div>

      {/* 3. Central Framed Panel */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <div className="relative border border-white/10 bg-[#09090b]/80 backdrop-blur-md">
          
          {/* Architectural Drafting Left & Right Inset Lines */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-6 w-[1px] bg-white/5 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-4 sm:right-6 w-[1px] bg-white/5 pointer-events-none" />

          {/* Card Body */}
          <div className="px-6 sm:px-16 pt-14 pb-12 sm:pb-16 flex flex-col items-center text-center space-y-7">
            
            {/* Brand Logo & Emblem */}
            <div className="flex items-center gap-2 text-white">
              <FourArcEmblem className="w-5 h-5 text-white" />
              <span className="text-base font-semibold tracking-tight text-white">VoiceShield</span>
            </div>

            {/* Headline in Editorial Serif */}
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif text-white tracking-tight font-normal leading-snug max-w-2xl">
              LET's MAKE INDIA FREE FROM CYBER ATTACKS.
            </h2>
            

            {/* Three Columns: Contact, Connect, Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 pt-4 text-left w-full max-w-2xl">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Contact</span>
                <a 
                  href="mailto:contact@voiceshield.ai" 
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 group font-sans"
                >
                  contact@voiceshield.ai
                  <span className="text-white/40 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">↗</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Connect</span>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 group font-sans"
                >
                  LinkedIn
                  <span className="text-white/40 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">↗</span>
                </a>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">Navigate</span>
                <div className="flex flex-row sm:flex-col gap-3 sm:gap-1 text-xs sm:text-sm font-sans">
                  <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link>
                  <Link href="/settings" className="text-white/80 hover:text-white transition-colors">Settings</Link>
                  <Link href="/login" className="text-white/80 hover:text-white transition-colors">Sign In</Link>
                </div>
              </div>
            </div>

          </div>

          {/* Card Legal Bottom Bar */}
          <div className="border-t border-white/10 px-6 py-6 text-center text-[11px] sm:text-xs text-white/45 space-y-2 font-sans">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/60 mb-2">
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <span>•</span>
              <Link href="/settings" className="hover:text-white transition-colors">Settings</Link>
              <span>•</span>
              <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              <span>•</span>
              <button 
                type="button"
                onClick={onOpenAuditModal} 
                className="hover:text-white transition-colors cursor-pointer hover:underline"
              >
                Privacy policy
              </button>
            </div>
            <div>
              © 2026 VoiceShield Ltd. Registered in India &amp; Wales: #15919823. ICO Registered, reference: ZB819711
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Radiating Perspective Grid Lines */}
      <div className="relative w-full max-w-4xl mx-auto h-32 overflow-hidden pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 130" fill="none">
          {/* Angled perspective lines radiating downwards from card base */}
          <line x1="400" y1="0" x2="400" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="380" y1="0" x2="350" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="420" y1="0" x2="450" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="330" y1="0" x2="220" y2="130" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="470" y1="0" x2="580" y2="130" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="280" y1="0" x2="160" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="520" y1="0" x2="640" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* Node vertex dots */}
          <circle cx="160" cy="90" r="2.5" fill="rgba(255,255,255,0.22)" />
          <circle cx="640" cy="90" r="2.5" fill="rgba(255,255,255,0.22)" />
          <circle cx="350" cy="130" r="2" fill="rgba(255,255,255,0.25)" />
          <circle cx="450" cy="130" r="2" fill="rgba(255,255,255,0.25)" />
        </svg>
      </div>

    </footer>
  );
}
