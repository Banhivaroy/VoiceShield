'use client';

import React from 'react';
import { Zap, Languages, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export default function MetricsHighlights() {
  const highlights = [
    {
      icon: Zap,
      title: '<80ms Latency',
      desc: 'Instant biometric verification during live phone calls without conversational lag or delay.',
      accent: 'text-[var(--accent)]',
      border: 'hover:border-white/40',
    },
    {
      icon: Languages,
      title: 'English, हिन्दी, বাংলা, தமிழ்',
      desc: 'Calibrated for Indian regional accents, colloquial phonemes, and non-Western cadence.',
      accent: 'text-[var(--accent-text)]',
      border: 'hover:border-white/40',
    },
    {
      icon: ShieldAlert,
      title: 'SIM & Spoof Defense',
      desc: 'Telecom-grade carrier signature validation and caller ID spoofing cross-verification.',
      accent: 'text-[var(--accent)]',
      border: 'hover:border-white/40',
    },
    {
      icon: Lock,
      title: 'Zero-Risk Privacy',
      desc: 'Ephemeral processing in secure RAM enclaves; audio buffers purged within 12 milliseconds.',
      accent: 'text-[var(--accent)]',
      border: 'hover:border-white/40',
    },
  ];

  return (
    <section className="py-12 bg-transparent border-b border-[var(--glass-line)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-white/15 ${item.border} transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.06)] group relative overflow-hidden`}
              >
                {/* Glowing top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all" />

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--panel)]/40 border border-white/15 group-hover:border-white/35 transition-colors">
                    <IconComponent className={`w-5 h-5 ${item.accent}`} />
                  </div>
                  <h3 className="text-base font-bold text-[var(--ink)] tracking-tight">{item.title}</h3>
                </div>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
