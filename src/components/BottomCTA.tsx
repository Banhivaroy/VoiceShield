'use client';

import React from 'react';
import { Shield, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface BottomCTAProps {
  onOpenGetProtected: () => void;
}

export default function BottomCTA({ onOpenGetProtected }: BottomCTAProps) {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Box */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-950 border border-cyan-500/40 p-8 sm:p-12 lg:p-16 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden">
          
          {/* Cyber light flare */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#050507]0/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050507]/80 border border-cyan-500/30 text-xs font-mono text-[var(--accent-text)]">
                <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>DEPLOY IN UNDER 60 SECONDS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] tracking-tight leading-tight">
                Secure your family&apos;s phone calls today.
              </h2>

              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed font-normal">
                Zero-latency real-time voice defense. Protect your loved ones, senior citizens, and enterprise accounts from voice cloning scams.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[var(--ink-soft)]">
                <span className="flex items-center gap-1.5 text-[var(--accent-text)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Instant Activation
                </span>
                <span className="flex items-center gap-1.5 text-[var(--accent-text)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Zero Call Recording
                </span>
                <span className="flex items-center gap-1.5 text-[var(--accent-text)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  14-Day Free Trial
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={onOpenGetProtected}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:shadow-[0_0_45px_rgba(6,182,212,0.9)] transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Get Protected Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
