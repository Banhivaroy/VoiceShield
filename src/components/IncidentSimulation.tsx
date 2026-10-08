'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AlertOctagon, Play, Pause, Volume2, ShieldCheck, Siren, Radio, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { playAlertBeep, startVoiceSimulation } from '@/lib/audioSimulator';

export default function IncidentSimulation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(14);
  const stopAudioRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 32) {
            setIsPlaying(false);
            if (stopAudioRef.current) stopAudioRef.current();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlayback = () => {
    if (isPlaying) {
      if (stopAudioRef.current) {
        stopAudioRef.current();
        stopAudioRef.current = null;
      }
      setIsPlaying(false);
    } else {
      playAlertBeep();
      const stopper = startVoiceSimulation(true);
      stopAudioRef.current = stopper;
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>REAL-WORLD ATTACK SIMULATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              The Urgent Grandchild Scam
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/50 border border-red-500/30 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            <span>INCIDENT RECORD #INC-89241 (DELHI NCR)</span>
          </div>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: Scam Transcript & Audio Reconstruction */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-[#040815] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-red-400 bg-red-950/60 border border-red-500/40 px-3 py-1 rounded-md w-fit mb-5">
                <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                <span>ACTUAL ATTACK AUDIO RECONSTRUCTION</span>
              </div>

              {/* Speech quote */}
              <div className="relative p-5 rounded-2xl bg-[var(--panel)]/60 border border-[var(--glass-line)] text-[var(--ink)] text-base sm:text-lg italic leading-relaxed mb-4">
                <span className="text-3xl text-[var(--accent)] font-serif leading-none absolute -top-2 left-3 select-none">&ldquo;</span>
                <p className="pl-3">
                  Dad, please don&apos;t tell mom, I was in a car accident near Connaught Place. The police officer needs ₹50,000 cash right now to release me or I&apos;m going to jail...
                </p>
              </div>

              {/* Context notes */}
              <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-6 font-normal">
                The caller voice was a 92-second voice sample scraped from the son&apos;s public Instagram reel, cloned using open-source diffusion models and layered with artificial street sirens.
              </p>

              {/* Interactive Audio Player Bar */}
              <div className="p-4 rounded-xl bg-[#050507] border border-[var(--glass-line)] mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayback}
                    className="w-10 h-10 rounded-full bg-[#050507]0 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[var(--ink-soft)] mb-1.5">
                      <span className="text-[var(--accent)] font-semibold">
                        {isPlaying ? 'PLAYING CLONED AUDIO RECONSTRUCTION' : 'AUDIO EVIDENCE READY'}
                      </span>
                      <span>00:{progress.toString().padStart(2, '0')} / 00:32</span>
                    </div>

                    {/* Progress Wave Bar */}
                    <div className="w-full bg-[#050507] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-red-400 h-full transition-all duration-300"
                        style={{ width: `${(progress / 32) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Meta Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[var(--glass-line)]/80 text-xs font-mono">
              <div className="p-2 rounded-lg bg-[var(--panel)]/60 border border-[var(--glass-line)]">
                <div className="text-[10px] text-slate-500">CALLER ID</div>
                <div className="text-[var(--ink-muted)] font-bold">Local Spoofed Trunk</div>
              </div>
              <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/30">
                <div className="text-[10px] text-red-400">THREAT LEVEL</div>
                <div className="text-red-300 font-bold">CRITICAL 94% FAKE</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--panel)]/60 border border-[var(--glass-line)]">
                <div className="text-[10px] text-slate-500">VOICE ORIGIN</div>
                <div className="text-[var(--accent-text)] font-bold">AI Synthesized</div>
              </div>
            </div>
          </div>

          {/* Right Card: Detected Signatures Breakdown */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-line)] mb-6">
                <h3 className="text-sm font-bold text-[var(--ink)] uppercase tracking-wider font-mono">
                  DETECTED CLONING SIGNATURES
                </h3>
                <span className="text-xs font-mono text-[var(--accent)] bg-[var(--panel)]/60 px-2 py-0.5 rounded border border-white/20">
                  LATENCY: 42ms
                </span>
              </div>

              <div className="space-y-4 text-xs">
                
                {/* Signature 1 */}
                <div className="p-3.5 rounded-xl bg-[var(--panel)]/60 border border-red-500/30 space-y-1">
                  <div className="flex items-center justify-between text-red-300 font-bold font-mono">
                    <span>Synthetic Glottal Spikes</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40">PHASE ERROR 89.4%</span>
                  </div>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Unnatural phase jumps between voiced syllables caused by recurrent neural vocoder synthesis.
                  </p>
                </div>

                {/* Signature 2 */}
                <div className="p-3.5 rounded-xl bg-[var(--panel)]/60 border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between text-amber-300 font-bold font-mono">
                    <span>Breathless Phonemes</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/40">ABNORMAL CADENCE</span>
                  </div>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Zero micro-inhalations during panicked speech. Human vocal tracts require respiratory cycle refills.
                  </p>
                </div>

                {/* Signature 3 */}
                <div className="p-3.5 rounded-xl bg-[var(--panel)]/60 border border-white/15 space-y-1">
                  <div className="flex items-center justify-between text-[var(--accent-text)] font-bold font-mono">
                    <span>Background Siren Ambience</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--panel)] text-[var(--accent)] border border-white/20">LOOP DETECTED</span>
                  </div>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Exact repetitive 4.2s audio loop signature identified from stock emergency siren sound effect.
                  </p>
                </div>

              </div>
            </div>

            {/* Action Log Box */}
            <div className="mt-6 p-4 rounded-xl bg-[var(--panel)]/30 border border-white/15 text-xs">
              <div className="flex items-center gap-2 text-[var(--accent-text)] font-bold font-mono mb-1">
                <CheckCircle className="w-4 h-4 text-[var(--accent)]" />
                <span>VOICESHIELD AUTOMATED MITIGATION:</span>
              </div>
              <p className="text-[var(--ink-muted)]">
                Call flagged in 42ms. Recipient received flashing high-priority overlay: <span className="text-red-400 font-bold">&quot;DO NOT SEND MONEY. AI CLONE CONFIRMED.&quot;</span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
