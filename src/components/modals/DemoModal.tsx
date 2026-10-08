'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Activity, Zap, Cpu, ShieldCheck, AlertTriangle, Volume2, RotateCcw } from 'lucide-react';
import { playAlertBeep, playSuccessChime, startVoiceSimulation } from '@/lib/audioSimulator';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [selectedTrack, setSelectedTrack] = useState<'synthetic' | 'authentic' | 'replay'>('synthetic');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stopAudioRef = useRef<(() => void) | null>(null);

  const tracks = {
    synthetic: {
      name: 'Sample A: ElevenLabs v2 Generative Clone',
      origin: 'Scraped 15-second TikTok Audio',
      threatScore: 96,
      latency: '38ms',
      glottalJitter: '0.02% (Unnatural Flatness)',
      formantSpread: 'Abnormal F2/F3 Dispersion',
      isSynthetic: true,
      quote: '"Mom, I dropped my phone in water. Wire ₹40,000 to this friend\'s UPI number right now..."',
    },
    authentic: {
      name: 'Sample B: Biological Human Speaker',
      origin: 'Live Microphone Voice Capture',
      threatScore: 4,
      latency: '41ms',
      glottalJitter: '1.84% (Natural Physiological)',
      formantSpread: 'Organic Anatomical Resonance',
      isSynthetic: false,
      quote: '"Hey, I am just leaving the office now. See you in twenty minutes!"',
    },
    replay: {
      name: 'Sample C: Replay Attack with Siren Masking',
      origin: 'Pre-recorded audio through loudspeaker',
      threatScore: 92,
      latency: '45ms',
      glottalJitter: 'Loudspeaker Acoustic Artifacts',
      formantSpread: 'Room Reverberation Convolution',
      isSynthetic: true,
      quote: '"Officer needs the fine paid immediately! Listen to the sirens outside!"',
    },
  };

  const current = tracks[selectedTrack];

  // Canvas Spectrogram animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step++;
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw frequency bars
      const barCount = 48;
      const barWidth = canvas.width / barCount;

      for (let i = 0; i < barCount; i++) {
        let heightMultiplier = 0.2;
        if (isPlaying) {
          heightMultiplier = Math.sin((step * 0.15) + (i * 0.3)) * 0.4 + 0.5;
        }

        const barHeight = heightMultiplier * canvas.height * 0.8;
        const x = i * barWidth;
        const y = canvas.height - barHeight;

        // Gradient color based on synthetic vs authentic
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        if (current.isSynthetic) {
          grad.addColorStop(0, '#f87171');
          grad.addColorStop(0.5, '#ef4444');
          grad.addColorStop(1, '#06b6d4');
        } else {
          grad.addColorStop(0, '#34d399');
          grad.addColorStop(0.7, '#059669');
          grad.addColorStop(1, '#06b6d4');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      }

      // Draw horizontal frequency gridlines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;
      for (let h = 20; h < canvas.height; h += 30) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(canvas.width, h);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPlaying, current.isSynthetic]);

  // Audio simulation toggle
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (stopAudioRef.current) {
        stopAudioRef.current();
        stopAudioRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (current.isSynthetic) {
        playAlertBeep();
      } else {
        playSuccessChime();
      }
      const stopper = startVoiceSimulation(current.isSynthetic);
      stopAudioRef.current = stopper;
      setIsPlaying(true);
    }
  };

  const handleSelect = (key: 'synthetic' | 'authentic' | 'replay') => {
    if (stopAudioRef.current) {
      stopAudioRef.current();
      stopAudioRef.current = null;
    }
    setIsPlaying(false);
    setSelectedTrack(key);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#040815] border border-white/20 p-6 sm:p-8 shadow-[0_0_70px_rgba(255,255,255,0.05)] text-[var(--ink)] overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            if (stopAudioRef.current) stopAudioRef.current();
            setIsPlaying(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050507]/80 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <Activity className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
            <span>FORENSIC TELEMETRY STUDIO // LIVE DEMO</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight mb-1">
          Acoustic Forensics Spectrum Workbench
        </h3>
        <p className="text-xs text-[var(--ink-soft)] mb-6">
          Compare real-time neural Fourier decomposition of authentic human vocal tracts against diffusion generative clones.
        </p>

        {/* Track Picker Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          {(['synthetic', 'authentic', 'replay'] as const).map((key) => {
            const tr = tracks[key];
            const isActive = selectedTrack === key;
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  isActive
                    ? tr.isSynthetic
                      ? 'bg-red-950/70 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-violet-950/70 border border-white/25 shadow-[0_0_15px_rgba(167,139,250,0.3)]'
                    : 'bg-[var(--panel)]/60 border border-white/15 text-[var(--ink-soft)] hover:border-white/30'
                }`}
              >
                <div className="font-bold text-[var(--ink)] mb-0.5">{tr.name.split(':')[0]}</div>
                <div className="text-[10px] text-[var(--ink-soft)] truncate">{tr.name.split(':')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Visualizer Canvas Card */}
        <div className="p-4 rounded-2xl bg-[#000000] border border-white/15 mb-6">
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span className="text-[var(--accent)]">REAL-TIME FAST FOURIER TRANSFORM (FFT)</span>
            <span className="text-[var(--ink-soft)]">44.1 kHz • 24-bit Flac Stream</span>
          </div>

          <canvas
            ref={canvasRef}
            width={640}
            height={160}
            className="w-full h-40 rounded-xl bg-[#000000] border border-white/10"
          />

          {/* Interactive Player Controls */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-900">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
                  isPlaying
                    ? 'bg-[#050507] text-[var(--ink-muted)] border border-white/20'
                    : 'bg-[#050507]0 hover:bg-cyan-400 border border-white/20 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                <span>{isPlaying ? 'Pause Audio Stream' : 'Run Forensics Simulation'}</span>
              </button>
              <span className="text-xs font-mono text-[var(--ink-soft)] italic">
                &ldquo;{current.quote}&rdquo;
              </span>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
              current.isSynthetic
                ? 'bg-red-950 text-red-300 border border-red-500/50'
                : 'bg-violet-950 text-violet-300 border border-white/20'
            }`}>
              <span>{current.threatScore}% SYNTHETIC PROBABILITY</span>
            </div>
          </div>
        </div>

        {/* Detailed Forensics Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono mb-6">
          <div className="p-3 rounded-xl bg-[var(--panel)]/60 border border-white/15">
            <span className="text-slate-500 text-[10px] block">GLOTTAL MICRO-JITTER</span>
            <span className={current.isSynthetic ? 'text-red-400 font-bold' : 'text-violet-400 font-bold'}>
              {current.glottalJitter}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--panel)]/60 border border-white/15">
            <span className="text-slate-500 text-[10px] block">FORMANT F1-F4 DISPERSION</span>
            <span className={current.isSynthetic ? 'text-amber-400 font-bold' : 'text-violet-400 font-bold'}>
              {current.formantSpread}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--panel)]/60 border border-white/15">
            <span className="text-slate-500 text-[10px] block">PROCESSING VERDICT TIME</span>
            <span className="text-[var(--accent-text)] font-bold">{current.latency}</span>
          </div>
        </div>

        {/* Bottom Button */}
        <button
          onClick={() => {
            if (stopAudioRef.current) stopAudioRef.current();
            setIsPlaying(false);
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-[var(--panel)] hover:bg-[#050507] border border-white/20 hover:border-white/35 text-xs font-bold text-[var(--accent-text)] cursor-pointer transition-colors"
        >
          Close Forensic Studio
        </button>

      </div>
    </div>
  );
}
