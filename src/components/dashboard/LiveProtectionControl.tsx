'use client';

import React, { useState } from 'react';
import { Pause, Play, Shield, Clock, Lock, CheckCircle2 } from 'lucide-react';

export default function LiveProtectionControl() {
  const [isActive, setIsActive] = useState(true);
  const [sensitivity, setSensitivity] = useState<'extra' | 'balanced'>('extra');
  const [isPaused, setIsPaused] = useState(false);

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
      
      {/* Left Column: Toggle & Sensitivity */}
      <div className="space-y-3.5">
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              isActive && !isPaused ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                isActive && !isPaused ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <div>
            <div className="text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span>Live call protection</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                isActive && !isPaused
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
              }`}>
                ● Status: {isPaused ? 'Paused for 1h' : isActive ? 'Active & Protected' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Sensitivity Pills & Pause */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-[var(--ink-soft)] font-mono text-[11px]">Sensitivity:</span>

          <div className="inline-flex rounded-lg border border-white/15 bg-[var(--panel)]/60 p-0.5">
            <button
              onClick={() => setSensitivity('extra')}
              className={`px-3 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                sensitivity === 'extra'
                  ? 'bg-white/15 border border-white/25 text-white font-bold shadow-sm'
                  : 'text-[var(--ink-soft)] hover:text-white'
              }`}
            >
              Extra careful
            </button>
            <button
              onClick={() => setSensitivity('balanced')}
              className={`px-3 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                sensitivity === 'balanced'
                  ? 'bg-white/15 border border-white/25 text-white font-bold shadow-sm'
                  : 'text-[var(--ink-soft)] hover:text-white'
              }`}
            >
              Balanced
            </button>
          </div>

          <button
            onClick={handleTogglePause}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
              isPaused
                ? 'bg-amber-950/70 border-amber-500/40 text-amber-300'
                : 'bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-muted)] hover:border-white/30 hover:text-white'
            }`}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3 text-[var(--ink-soft)]" />}
            <span>{isPaused ? 'Resume protection' : 'Pause for 1 hour'}</span>
          </button>
        </div>

      </div>

      {/* Right Column: Status & Retention */}
      <div className="space-y-1.5 text-xs font-mono self-start md:self-center border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 shrink-0">
        <div className="flex items-center gap-2 text-[var(--ink-soft)]">
          <Clock className="w-3.5 h-3.5 text-white/40" />
          <span>Last checked call: <strong className="text-white">12 mins ago</strong></span>
        </div>
        <div className="flex items-center gap-2 text-[var(--ink-soft)]">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Audio retention: <strong className="text-emerald-400 font-bold">Deleted immediately</strong></span>
        </div>
      </div>

    </div>
  );
}
