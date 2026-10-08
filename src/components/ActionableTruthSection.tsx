'use client';

import React, { useState } from 'react';
import { Target, Activity, ShieldAlert, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';

export default function ActionableTruthSection() {
  const [isThreatMode, setIsThreatMode] = useState(true);

  return (
    <section id="forensics" className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>ACTIONABLE FORENSICS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight leading-tight">
              No vague warnings. Clear, actionable truth.
            </h2>

            <p className="text-sm sm:text-base text-[var(--ink-soft)] font-normal leading-relaxed">
              We don&apos;t give binary 50/50 guesses. Every call is scored across multi-layer acoustic telemetry with an immediate, plain-English guidance protocol.
            </p>

            {/* 3 Value Propositions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[var(--panel)]/40 border border-white/15">
                <div className="p-2 rounded-lg bg-[var(--panel)]/60 border border-white/20 text-[var(--accent)] shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)] mb-0.5">Deterministic Threat Score</h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    Instant percentage calculated from 14 distinct acoustic anomalies across spectral, temporal, and bio-frequency domains.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[var(--panel)]/40 border border-white/15">
                <div className="p-2 rounded-lg bg-[var(--panel)]/60 border border-white/20 text-[var(--accent)] shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)] mb-0.5">Biometric Discrepancy Breakdown</h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    Highlights artificial vocal tract length, missing breath cadence, robotic pitch flattening, and missing turbulent micro-inhalations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[var(--panel)]/40 border border-white/15">
                <div className="p-2 rounded-lg bg-[var(--panel)]/60 border border-white/20 text-[var(--accent)] shrink-0 mt-0.5">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)] mb-0.5">Immediate Countermeasure Protocol</h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    Clear 3-step action directive pushed to the phone screen immediately so elderly or stressed recipients know exactly what to do.
                  </p>
                </div>
              </div>
            </div>

            {/* Toggle demo button */}
            <div className="pt-2">
              <button
                onClick={() => setIsThreatMode(!isThreatMode)}
                className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-[var(--panel)] border border-white/20 hover:border-white/35 text-[var(--accent-text)] hover:bg-[var(--panel)]/50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Simulate: {isThreatMode ? 'Switch to Safe Biological Call' : 'Switch to Synthetic Spoof'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Live Threat Diagnostic Box */}
          <div className="lg:col-span-6">
            <div className={`rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-[#040816] border p-6 sm:p-8 shadow-2xl transition-all duration-500 ${
              isThreatMode
                ? 'border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.2)]'
                : 'border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]'
            }`}>
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-[var(--glass-line)]">
                <div className="text-xs font-mono text-[var(--ink-soft)]">
                  <span>TELEMETRY DIAGNOSTIC // </span>
                  <span className="text-[var(--accent)] font-bold">RUN #V-8941</span>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 ${
                  isThreatMode
                    ? 'bg-red-950/80 text-red-300 border border-red-500/60'
                    : 'bg-violet-950/80 text-violet-300 border border-white/20'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isThreatMode ? 'bg-red-400 animate-ping' : 'bg-violet-400'}`}></span>
                  <span>{isThreatMode ? 'FLAGGED: HIGH RISK' : 'VERIFIED: SAFE CALLER'}</span>
                </div>
              </div>

              {/* Gauge and Probability */}
              <div className="py-6 flex flex-col sm:flex-row items-center justify-around gap-6 border-b border-[var(--glass-line)]">
                
                {/* Circular Gauge */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-[var(--ink-muted)]"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={isThreatMode ? 251.2 * (1 - 0.92) : 251.2 * (1 - 0.04)}
                      strokeLinecap="round"
                      className={`transition-all duration-1000 ${
                        isThreatMode ? 'text-red-500' : 'text-violet-400'
                      }`}
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                      {isThreatMode ? '92%' : '4%'}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--ink-soft)]">
                      {isThreatMode ? 'Synthetic' : 'Authentic'}
                    </span>
                  </div>
                </div>

                {/* Score Summary */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                    CONFIDENCE MATRIX
                  </div>
                  <h3 className="text-lg font-bold text-[var(--ink)]">
                    {isThreatMode ? 'ElevenLabs Generative Clone' : 'Natural Human Vocal Cord Pattern'}
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)]">
                    {isThreatMode
                      ? 'Telemetry detected synthetic diffusion vocoder artifacts.'
                      : 'Verified bio-acoustic micro-vibrations match human anatomy.'}
                  </p>
                </div>
              </div>

              {/* Metrics Table */}
              <div className="py-4 space-y-2.5 text-xs font-mono border-b border-[var(--glass-line)]">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--ink-soft)]">Laryngeal Tremor Absence:</span>
                  <span className={isThreatMode ? 'text-red-400 font-bold' : 'text-violet-400 font-bold'}>
                    {isThreatMode ? '98.2% SYNTHETIC (CRITICAL)' : 'NORMAL (1.4% VARIATION)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--ink-soft)]">Acoustic Formant Spread:</span>
                  <span className={isThreatMode ? 'text-amber-400 font-bold' : 'text-violet-400 font-bold'}>
                    {isThreatMode ? '4.1% MATCH (HIGH RISK)' : '98.8% MATCH (BIOLOGICAL)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--ink-soft)]">Pitch Continuity Jitter:</span>
                  <span className={isThreatMode ? 'text-red-400 font-bold' : 'text-violet-400 font-bold'}>
                    {isThreatMode ? 'ARTIFICIAL FLATNESS' : 'NATURAL HUMAN DYNAMICS'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[var(--ink-soft)]">Model Fingerprint:</span>
                  <span className="text-[var(--accent-text)] font-bold">
                    {isThreatMode ? 'ElevenLabs Multilingual v2' : 'Authentic Human Speaker'}
                  </span>
                </div>
              </div>

              {/* PROTOCOL DIRECTIVE */}
              <div className="mt-5 p-4 rounded-2xl bg-[var(--panel)]/80 border border-white/15">
                <div className="text-[11px] font-mono font-bold text-[var(--accent)] mb-2.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>PROTOCOL DIRECTIVE:</span>
                </div>
                <div className="space-y-1.5 text-xs text-[var(--ink-muted)]">
                  {isThreatMode ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-red-950 text-red-400 border border-red-500/50 flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Hang up immediately. Do not transfer funds or OTP.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-red-950 text-red-400 border border-red-500/50 flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Authenticate contact via out-of-band known number.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-red-950 text-red-400 border border-red-500/50 flex items-center justify-center text-[10px] font-bold">3</span>
                        <span>Forward caller audio hash to National Cyber Fraud Portal.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-violet-950 text-violet-300 border border-white/20 flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Speaker identity verified with 99.8% confidence.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-violet-950 text-violet-300 border border-white/20 flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Safe to proceed with sensitive conversation.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
