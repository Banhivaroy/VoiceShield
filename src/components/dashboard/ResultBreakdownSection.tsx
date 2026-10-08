'use client';

import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, ChevronDown, Flag, ThumbsUp, ThumbsDown, PhoneCall, Users, AlertOctagon, Activity, Radio, Cpu } from 'lucide-react';
import { SampleClipData } from './ClipDetectionSection';

interface ResultBreakdownSectionProps {
  clipData: SampleClipData;
  onReportFalseAlarm: () => void;
}

export default function ResultBreakdownSection({
  clipData,
  onReportFalseAlarm,
}: ResultBreakdownSectionProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const isSynthetic = clipData.isSynthetic;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 shadow-xl space-y-5 flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--ink)] font-bold">
            <Shield className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm">Result</span>
          </div>
          <span className="text-[var(--ink-soft)]">From phone call</span>
        </div>

        {/* Status Alert Banner */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-[var(--panel)]/70 border border-white/15">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSynthetic ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`}></span>
            <span className="text-sm font-bold text-[var(--ink)]">
              {isSynthetic ? 'Possible AI voice' : 'Verified authentic human'}
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
            isSynthetic
              ? 'bg-red-950 text-red-300 border border-red-500/50'
              : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
          }`}>
            {clipData.score}% AI chance
          </span>
        </div>

        {/* Circular Gauge and Summary */}
        <div className="my-5 flex items-center gap-5">
          {/* Circular SVG Ring */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                className="text-white/10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - clipData.score / 100)}
                strokeLinecap="round"
                className={`transition-all duration-700 ${
                  isSynthetic ? 'text-red-500' : 'text-emerald-400'
                }`}
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-bold text-[var(--ink)] leading-none">
                {clipData.score}%
              </span>
              <span className="text-[8px] font-mono text-[var(--ink-soft)] leading-none mt-0.5">
                AI chance
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[var(--ink)] leading-tight">
              {clipData.resultTitle}
            </h4>
            <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
              {clipData.resultDesc}
            </p>
          </div>
        </div>

        {/* Why we flagged this call */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="text-[11px] font-mono text-[var(--ink-soft)] font-semibold">
            {isSynthetic ? 'Why we flagged this call:' : 'Biometric integrity markers:'}
          </div>

          <div className="space-y-2.5">
            {clipData.reasons.map((r, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <div className={`p-1 rounded-md shrink-0 mt-0.5 ${
                  isSynthetic ? 'bg-red-950/80 text-red-400 border border-red-500/30' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                }`}>
                  <Activity className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-bold text-[var(--ink-muted)]">{r.title}</div>
                  <div className="text-[var(--ink-soft)] text-[11px] leading-relaxed">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT TO DO NEXT (3 Cards) */}
        {isSynthetic && (
          <div className="mt-5 space-y-2 pt-3 border-t border-white/10">
            <div className="text-[11px] font-mono text-[var(--accent)] font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-[var(--accent)]" />
              <span>WHAT TO DO NEXT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              
              <div className="p-2.5 rounded-xl bg-[var(--panel)]/70 border border-white/15 hover:border-white/30 transition-colors space-y-1">
                <div className="font-bold text-[var(--ink-muted)] flex items-center gap-1">
                  <span>1. Call back on saved number</span>
                </div>
                <p className="text-[10px] text-[var(--ink-soft)] leading-snug">
                  Hang up and dial their known trusted contact directly.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--panel)]/70 border border-white/15 hover:border-white/30 transition-colors space-y-1">
                <div className="font-bold text-[var(--ink-muted)] flex items-center gap-1">
                  <span>2. Verify with family</span>
                </div>
                <p className="text-[10px] text-[var(--ink-soft)] leading-snug">
                  Check with someone else before sending money or OTP.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--panel)]/70 border border-white/15 hover:border-white/30 transition-colors space-y-1">
                <div className="font-bold text-[var(--ink-muted)] flex items-center gap-1">
                  <span>3. Report scam</span>
                </div>
                <p className="text-[10px] text-[var(--ink-soft)] leading-snug">
                  Dial cyber helpline 1930 to report the incident.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Collapsible Advanced Details */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="w-full flex items-center justify-between text-xs font-mono text-[var(--ink-soft)] hover:text-white cursor-pointer"
          >
            <span>Advanced details <span className="text-[var(--ink-soft)]">[Sample]</span></span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
          </button>

          {advancedOpen && (
            <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/15 text-[11px] font-mono space-y-2 text-[var(--ink-muted)]">
              <div className="flex justify-between">
                <span className="text-white/40">Laryngeal Jitter:</span>
                <span className="text-[var(--accent-text)]">0.02% (Robotic Quantization)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Formant Dispersion (F1-F4):</span>
                <span className="text-amber-400">Irregular Phase Dispersion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Attributed Architecture:</span>
                <span className="text-red-400 font-bold">Diffusion-based Vocoder v2</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Feedback Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[var(--ink-soft)]">
        <button
          onClick={onReportFalseAlarm}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px]"
        >
          <Flag className="w-3.5 h-3.5 text-white/40" />
          <span>Report false alarm</span>
        </button>

        <div className="flex items-center gap-2 text-[11px]">
          <span>Was this accurate?</span>
          <button
            onClick={() => setFeedbackGiven('yes')}
            className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
              feedbackGiven === 'yes' ? 'text-emerald-400 bg-emerald-950/60' : 'text-[var(--ink-soft)] hover:text-white'
            }`}
            title="Yes, accurate"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setFeedbackGiven('no')}
            className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
              feedbackGiven === 'no' ? 'text-red-400 bg-red-950/60' : 'text-[var(--ink-soft)] hover:text-white'
            }`}
            title="No, inaccurate"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
