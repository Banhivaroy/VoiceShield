'use client';

import React, { useState } from 'react';
import { Waves, Filter, Cpu, ShieldCheck, ArrowRight, X, Activity, Zap, Check } from 'lucide-react';

export default function ForensicPipeline() {
  const [activeStageDetail, setActiveStageDetail] = useState<number | null>(null);

  const stages = [
    {
      num: '01',
      title: 'Acoustic Inspector',
      icon: Waves,
      desc: 'Ingests high-resolution audio stream and performs real-time Fast Fourier Transforms (FFT). Separates vocal timbre from carrier compression artifacts.',
      actionText: '+ View FFT Breakdown',
      deepDive: {
        heading: 'Fast Fourier Transform & Timbre Isolation',
        specs: [
          '44.1 kHz sampling rate decomposition',
          'Cepstral peak prominence analysis (CPPS)',
          'High-frequency harmonic distortion isolation',
          'Bandwidth separation: 300Hz - 3400Hz (telephony pass)',
        ],
        metric: 'Processing latency: 12ms',
      },
    },
    {
      num: '02',
      title: 'Signal Purification',
      icon: Filter,
      desc: 'Denoises background ambient hum, cancels reverberations, and normalizes decibel spikes without altering biological formant profiles.',
      actionText: '+ Purification Matrix',
      deepDive: {
        heading: 'Noise Cancellation & Formant Integrity',
        specs: [
          'Stationary & non-stationary noise suppression',
          'Preserves first 4 vowel formants (F1-F4)',
          'Echo cancellation without phase artifacts',
          'Dynamic range compression normalization',
        ],
        metric: 'SNR Improvement: +24dB',
      },
    },
    {
      num: '03',
      title: 'Tri-Vector Analysis',
      icon: Cpu,
      desc: 'Analyzes glottal pulse symmetry, micro-tremor bio-patterns, and synthetic spectral smearing characteristic of generative diffusion models.',
      actionText: '+ Neural Weighting Specs',
      deepDive: {
        heading: 'Biometric Tri-Vector Neural Weights',
        specs: [
          'Glottal open quotient & phase closure detection',
          'Physiological vocal cord micro-tremor verification',
          'Diffusion vocoder artifact identification',
          'Cross-attentional acoustic transformer inference',
        ],
        metric: 'Inference runtime: 34ms on Edge NPU',
      },
    },
    {
      num: '04',
      title: 'Verdict & Memory Wipe',
      icon: ShieldCheck,
      desc: 'Generates deterministic threat score (<80ms) and executes an instant zero-fill wipe of raw audio buffers from RAM enclaves.',
      actionText: '+ Zero-Knowledge Proof',
      deepDive: {
        heading: 'Cryptographic Verdict & Memory Purge',
        specs: [
          'Deterministic confidence score output (0-100%)',
          'Immediate DoD 5220.22-M style volatile RAM purge',
          'Signed SHA-256 cryptographic audit receipt',
          'Zero-knowledge proof logged to tamperproof ledger',
        ],
        metric: 'Purge time: <1.4ms post-verdict',
      },
    },
  ];

  return (
    <section id="pipeline" className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>DEEPFAKE DETECTION PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            Forensic Telemetry in 4 Stages
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-soft)]">
            Our proprietary multi-stage neural network extracts micro-acoustic artifacts left behind by generative voice models.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/15 hover:border-white/35 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] group"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[#050507]/80 border border-white/20 px-2.5 py-1 rounded-md">
                    {stage.num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[var(--panel)] border border-[var(--glass-line)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-2 tracking-tight group-hover:text-[var(--accent-text)] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed font-normal mb-6">
                    {stage.desc}
                  </p>
                </div>

                {/* Clickable Deep Dive Trigger */}
                <button
                  onClick={() => setActiveStageDetail(idx)}
                  className="pt-3 border-t border-[var(--glass-line)]/80 text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-text)] flex items-center justify-between w-full group/btn cursor-pointer transition-colors"
                >
                  <span>{stage.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Production Stage Detail Interactive Modal */}
      {activeStageDetail !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--panel)]/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#050507] border border-white/20 p-6 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
            <button
              onClick={() => setActiveStageDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--panel)] text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[var(--accent)] text-xs font-mono mb-2">
              <span className="px-2 py-0.5 rounded bg-[#050507]/80 border border-white/20">
                STAGE {stages[activeStageDetail].num}
              </span>
              <span>TELEMETRY SPECIFICATION</span>
            </div>

            <h3 className="text-xl font-bold text-[var(--ink)] mb-3">
              {stages[activeStageDetail].deepDive.heading}
            </h3>

            <p className="text-xs text-[var(--ink-muted)] mb-4">
              {stages[activeStageDetail].desc}
            </p>

            <div className="space-y-2 mb-6 p-4 rounded-xl bg-[var(--panel)]/60 border border-[var(--glass-line)]">
              {stages[activeStageDetail].deepDive.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                  <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--glass-line)] text-xs font-mono">
              <span className="text-[var(--ink-soft)]">Benchmark Runtime:</span>
              <span className="text-[var(--accent)] font-bold">{stages[activeStageDetail].deepDive.metric}</span>
            </div>

            <button
              onClick={() => setActiveStageDetail(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#050507]0 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
            >
              Close Technical Spec
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
