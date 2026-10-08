'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, AlertTriangle, CheckCircle2, RotateCw } from 'lucide-react';
import { CallRecord } from './RecentCallsTable';
import { playSuccessChime } from '@/lib/audioSimulator';

interface CallBreakdownAndSMSProps {
  call: CallRecord;
}

export default function CallBreakdownAndSMS({ call }: CallBreakdownAndSMSProps) {
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleResendSMS = () => {
    setResendStatus('Dispatched SMS alert...');
    playSuccessChime();
    setTimeout(() => {
      setResendStatus('SMS delivered to registered mobile.');
      setTimeout(() => setResendStatus(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      
      {/* Card 1: Call Breakdown */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--ink)] font-bold">
            <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Call breakdown</span>
          </div>
          <span className="text-[var(--accent-text)] font-bold">{call.number}</span>
        </div>

        <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
          Timeline shows voice safety across the {call.duration} seconds of the incoming phone call:
        </p>

        {/* Multi-segment Timeline Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-full overflow-hidden flex bg-white/10">
            {call.resultType === 'alert' ? (
              <>
                <div className="w-[24%] bg-emerald-500 h-full" title="0-10s (Natural)" />
                <div className="w-[19%] bg-amber-400 h-full" title="10-18s (Flagged)" />
                <div className="w-[57%] bg-red-500 h-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" title="18-42s (AI voice detected)" />
              </>
            ) : call.resultType === 'warning' ? (
              <>
                <div className="w-[65%] bg-emerald-500 h-full" />
                <div className="w-[35%] bg-amber-400 h-full" />
              </>
            ) : (
              <div className="w-full bg-emerald-500 h-full" title="Natural verified biological audio" />
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--ink-soft)] pt-0.5">
            <span className="text-emerald-400">00:00 (Natural)</span>
            <span className="text-amber-400">00:10 (Flagged)</span>
            <span className="text-[var(--ink-soft)]">00:42 (End)</span>
          </div>
        </div>

        <p className="text-xs text-[var(--ink-muted)] italic pt-1">
          &ldquo;{call.timeline.description}&rdquo;
        </p>
      </div>

      {/* Card 2: Safety SMS preview */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--ink)] font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Safety SMS preview</span>
          </div>
          <span className="text-[var(--ink-soft)]">[Sample]</span>
        </div>

        {/* Message Bubble */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-[var(--ink-soft)]">
            <span>From: VoiceShield</span>
            <span>Just now</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--panel)]/80 border border-white/10 text-[var(--ink-muted)] space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>VoiceShield Alert</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
              Your call from <strong className="text-white">{call.number}</strong> may have used an AI-cloned voice. Do not send money or share OTP.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-soft)] pt-1">
          <span>{resendStatus || 'Sent automatically to your device'}</span>
          <button
            onClick={handleResendSMS}
            className="text-white hover:text-[var(--accent-text)] underline underline-offset-2 cursor-pointer transition-colors"
          >
            Resend SMS
          </button>
        </div>
      </div>

    </div>
  );
}
