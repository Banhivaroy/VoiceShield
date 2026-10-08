'use client';

import React from 'react';
import { Smartphone, Building2, ArrowRight, ShieldCheck, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

interface DefendOnYourTermsProps {
  onOpenGetProtected: () => void;
  onOpenEnterprise: () => void;
}

export default function DefendOnYourTerms({
  onOpenGetProtected,
  onOpenEnterprise,
}: DefendOnYourTermsProps) {
  return (
    <section className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>DUAL-LAYER ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              Defend on your terms.
            </h2>
          </div>
          <p className="text-sm text-[var(--ink-soft)] max-w-md">
            Deploy end-to-end telemetry across personal devices, family cellular plans, or enterprise contact center SIP trunks.
          </p>
        </div>

        {/* The Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Individuals & Families */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-[#040919] border border-white/15 hover:border-white/35 p-8 transition-all hover:shadow-[0_0_35px_rgba(255,255,255,0.08)] flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#050507]0/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono tracking-wider text-[var(--accent)] uppercase bg-[var(--panel)]/60 border border-white/20 px-3 py-1 rounded-full">
                  FOR INDIVIDUALS & FAMILIES
                </span>
                <div className="w-10 h-10 rounded-xl bg-[var(--panel)]/50 border border-white/20 flex items-center justify-center text-[var(--accent)]">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[var(--ink)] mb-3 tracking-tight">
                WhatsApp &amp; Phone Call Defense
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6 font-normal">
                Protects your family against grandchild emergency scams, WhatsApp voice note clones, and extortion calls before wire transfers or panic occurs.
              </p>

              {/* Accuracy Pill */}
              <div className="p-4 rounded-2xl bg-[var(--panel)]/30 border border-white/15 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">99.4% Voice Clone Detection Rate</div>
                  <div className="text-xs text-[var(--ink-soft)]">Works silently in background with instant overlay alerts</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-[var(--glass-line)]/80 flex items-center justify-between">
              <button
                onClick={onOpenGetProtected}
                className="text-sm font-bold text-[var(--accent-text)] hover:text-cyan-200 flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
              >
                <span>Get Protected</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">Android • iOS • WhatsApp</span>
            </div>
          </div>

          {/* Card 2: Enterprise & Call Centers */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-[#040919] border border-white/15 hover:border-white/35 p-8 transition-all hover:shadow-[0_0_35px_rgba(255,255,255,0.08)] flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono tracking-wider text-violet-300 uppercase bg-violet-950/60 border border-white/20 px-3 py-1 rounded-full">
                  FOR ENTERPRISE &amp; CALL CENTERS
                </span>
                <div className="w-10 h-10 rounded-xl bg-violet-950/50 border border-white/20 flex items-center justify-center text-violet-300">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[var(--ink)] mb-3 tracking-tight">
                Live Call Prevention Engine
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6 font-normal">
                Continuous analyzing of inbound contact center calls to eliminate voice-cloned CEO fraud, executive wire requests, and biometric bypass attempts.
              </p>

              {/* Console Highlight Pill */}
              <div className="p-4 rounded-2xl bg-violet-950/30 border border-white/15 mb-8 flex items-center gap-3">
                <Terminal className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">Centralized Threat Intelligence Console</div>
                  <div className="text-xs text-[var(--ink-soft)]">Zero-latency SIP proxy, Twilio Flex &amp; Genesys connectors</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-[var(--glass-line)]/80 flex items-center justify-between">
              <button
                onClick={onOpenEnterprise}
                className="text-sm font-bold text-violet-300 hover:text-violet-200 flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
              >
                <span>Explore Live Forensics</span>
                <ArrowRight className="w-4 h-4 text-violet-400" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">SIP • WebRTC • REST API</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
