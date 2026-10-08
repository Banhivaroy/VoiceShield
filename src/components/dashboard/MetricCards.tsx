'use client';

import React from 'react';
import { Phone, Bell, Zap, Database, ShieldCheck } from 'lucide-react';

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Card 1: Calls checked today */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 hover:border-white/35 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] relative overflow-hidden group flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all" />
        <div className="flex items-center justify-between text-xs text-[var(--ink-soft)] font-mono mb-2">
          <span>Calls checked today</span>
          <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
        </div>
        <div className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">
          18
        </div>
        <div className="text-[11px] text-[var(--ink-soft)] mt-1">
          Normal daily volume
        </div>
      </div>

      {/* Card 2: Alerts detected */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-red-950/40 to-slate-950/80 backdrop-blur-md border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.1)] relative overflow-hidden group flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent group-hover:via-red-500/50 transition-all" />
        <div className="flex items-center justify-between text-xs text-[var(--ink-soft)] font-mono mb-2">
          <span>Alerts detected</span>
          <Bell className="w-3.5 h-3.5 text-red-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-red-400 tracking-tight">1</span>
          <span className="text-xs font-semibold text-red-300">Possible AI clone</span>
        </div>
        <div className="text-[11px] text-[var(--ink-soft)] mt-1">
          Checked within past 24h
        </div>
      </div>

      {/* Card 3: Average check time */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 hover:border-white/35 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] relative overflow-hidden group flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all" />
        <div className="flex items-center justify-between text-xs text-[var(--ink-soft)] font-mono mb-2">
          <span>Average check time <span className="text-[var(--ink-soft)]/70">[Sample]</span></span>
          <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
        </div>
        <div className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">
          0.8<span className="text-xl font-normal text-[var(--ink-soft)]">s</span>
        </div>
        <div className="text-[11px] text-[var(--accent-text)] font-mono mt-1">
          Instant on-device scan
        </div>
      </div>

      {/* Card 4: Audio saved */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 hover:border-white/35 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] relative overflow-hidden group flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all" />
        <div className="flex items-center justify-between text-xs text-[var(--ink-soft)] font-mono mb-2">
          <span>Audio saved <span className="text-[var(--ink-soft)]/70">[Sample]</span></span>
          <Database className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">0</span>
          <span className="text-sm font-semibold text-emerald-300">bytes</span>
        </div>
        <div className="text-[11px] text-[var(--ink-soft)] mt-1">
          Deleted right after checking
        </div>
      </div>

    </div>
  );
}
