'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

interface HighRiskAlertBannerProps {
  onInspectAlert: () => void;
  onDismiss: () => void;
  isDismissed: boolean;
}

export default function HighRiskAlertBanner({
  onInspectAlert,
  onDismiss,
  isDismissed,
}: HighRiskAlertBannerProps) {
  if (isDismissed) return null;

  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-red-950/60 via-[#180a0f]/80 to-red-950/40 backdrop-blur-md border border-red-500/30 p-4 sm:p-5 shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
      
      {/* Left: Icon & Text */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-red-950/90 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono text-[10px] font-extrabold tracking-wider uppercase shadow-[0_0_10px_rgba(239,68,68,0.4)]">
              HIGH RISK ALERT
            </span>
            <span className="text-xs font-mono text-[var(--ink-soft)]">
              Recent incoming call
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--ink-muted)] font-medium">
            Suspicious cloned voice detected on a recent phone call from{' '}
            <span className="font-mono text-white font-bold">+91 98201 •••••</span>{' '}
            (<span className="text-red-400 font-bold">92% AI chance</span>).
          </p>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3 self-end md:self-center shrink-0">
        <button
          onClick={onInspectAlert}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-1.5"
        >
          <span>Inspect alert</span>
        </button>

        <button
          onClick={onDismiss}
          className="px-3 py-2 rounded-xl text-xs text-[var(--ink-soft)] hover:text-white transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>

    </div>
  );
}
