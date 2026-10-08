'use client';

import React, { useState } from 'react';
import { HardDrive, Fingerprint, EyeOff, ShieldCheck, FileCheck, Check, ArrowRight } from 'lucide-react';

interface PrivacyPromiseProps {
  onOpenAuditModal: () => void;
}

export default function PrivacyPromise({ onOpenAuditModal }: PrivacyPromiseProps) {
  const promises = [
    {
      icon: HardDrive,
      title: 'RAM-Only Processing',
      desc: 'Audio is processed exclusively in volatile enclave memory; buffers are cryptographically shredded within 12 milliseconds of scoring.',
    },
    {
      icon: Fingerprint,
      title: 'Zero Voice Printing',
      desc: 'We do not build biometric profiles of legitimate speakers; our neural network detects generative artifacts, never storing acoustic identity.',
    },
    {
      icon: EyeOff,
      title: 'No Model Retraining',
      desc: 'Your private personal conversations are mathematically isolated and never fed into dataset pipelines or generative training loops.',
    },
    {
      icon: ShieldCheck,
      title: 'Open Audit Ledger',
      desc: 'Third-party zero-knowledge proofs verify zero-retention compliance across every active telemetry session in real-time.',
    },
  ];

  return (
    <section className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>ZERO-KNOWLEDGE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            Our Cryptographic Privacy Promise
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-soft)]">
            Since the audio data does not leave your volatile enclave, your conversations remain strictly confidential.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-[#040816] border border-white/15 hover:border-white/35 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.06)] flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--panel)]/60 border border-white/20 flex items-center justify-center text-[var(--accent)] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--ink)] mb-2 tracking-tight group-hover:text-[var(--accent-text)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[var(--glass-line)]/80 flex items-center justify-between text-[11px] font-mono text-[var(--accent)]">
                  <span>VERIFIED SECURE</span>
                  <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View Cryptographic Ledger Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAuditModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--panel)] border border-white/20 text-xs font-mono text-[var(--accent-text)] hover:bg-[var(--panel)]/50 hover:border-white/40 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            <FileCheck className="w-4 h-4 text-[var(--accent)]" />
            <span>View Live Cryptographic Zero-Knowledge Audit Ledger</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>
        </div>

      </div>
    </section>
  );
}
