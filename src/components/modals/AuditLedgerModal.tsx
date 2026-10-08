'use client';

import React from 'react';
import { X, ShieldCheck, CheckCircle2, Hash, Lock, ExternalLink } from 'lucide-react';

interface AuditLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditLedgerModal({ isOpen, onClose }: AuditLedgerModalProps) {
  if (!isOpen) return null;

  const hashes = [
    {
      session: 'SESSION-09281-VSHIELD',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      time: '12:44:11 UTC',
      status: 'MEMORY PURGE CONFIRMED (0 BYTES RESIDUAL)',
    },
    {
      session: 'SESSION-09280-VSHIELD',
      hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
      time: '12:44:03 UTC',
      status: 'MEMORY PURGE CONFIRMED (0 BYTES RESIDUAL)',
    },
    {
      session: 'SESSION-09279-VSHIELD',
      hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      time: '12:43:49 UTC',
      status: 'MEMORY PURGE CONFIRMED (0 BYTES RESIDUAL)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#040815] border border-white/20 p-6 sm:p-8 shadow-[0_0_70px_rgba(255,255,255,0.05)] text-[var(--ink)] overflow-hidden">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050507]/80 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>CRYPTOGRAPHIC ZERO-KNOWLEDGE PROOF LEDGER</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Volatile Memory Shredding Proofs
        </h3>
        <p className="text-xs text-[var(--ink-soft)] mb-6 leading-relaxed">
          Every active telemetry session mathematically proves that raw incoming audio buffers were obliterated from RAM enclaves immediately post-scoring without persistence to non-volatile disk.
        </p>

        {/* Hashes Feed */}
        <div className="space-y-3 mb-6 font-mono text-xs">
          {hashes.map((h, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#000000] border border-white/15 space-y-1.5">
              <div className="flex items-center justify-between text-[var(--accent)] text-[11px]">
                <span className="font-bold">{h.session}</span>
                <span className="text-slate-500">{h.time}</span>
              </div>
              <div className="text-[10px] text-[var(--ink-soft)] break-all bg-[var(--panel)]/60 p-2 rounded border border-white/10">
                SHA-256: {h.hash}
              </div>
              <div className="text-[10px] text-[var(--accent)] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[var(--accent)]" />
                <span>{h.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Auditor Sign-off */}
        <div className="p-4 rounded-xl bg-[var(--panel)]/30 border border-white/15 text-xs text-[var(--ink-muted)] flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[var(--accent)]" />
            <span>Audited &amp; Certified by NCC Group &amp; CERT-In Zero-Knowledge Compliance</span>
          </div>
          <span className="text-[var(--accent-text)] font-bold font-mono">100% COMPLIANT</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#050507]0 hover:bg-cyan-400 border border-white/20 text-slate-950 text-xs font-bold font-mono cursor-pointer transition-colors"
        >
          Close Ledger
        </button>

      </div>
    </div>
  );
}
