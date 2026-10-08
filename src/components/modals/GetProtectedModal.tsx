'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, Upload, Mic, ShieldCheck, AlertTriangle, Loader2,
  Activity, Cpu, CheckCircle2, Radio, RotateCcw, ArrowRight, Info
} from 'lucide-react';
import { playAlertBeep, playSuccessChime } from '@/lib/audioSimulator';

interface GetProtectedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'uploading' | 'done' | 'error';
type Verdict = 'spoof' | 'bonafide' | null;

interface Result {
  prediction: Verdict;
  verdict_label: string;
  spoof_probability: number;
  confidence: number;
  threshold: number;
  latency_ms: number;
  model: string;
  window_scores?: number[];
}

const ACCEPTED = '.wav,.mp3,.m4a,.ogg,.flac';

export default function GetProtectedModal({ isOpen, onClose }: GetProtectedModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<Result | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [bars, setBars] = useState<number[]>(Array.from({ length: 20 }, () => 15));
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animated waveform bars
  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => {
      setBars((prev) =>
        prev.map(() =>
          status === 'uploading'
            ? Math.floor(Math.random() * 60) + 30
            : Math.floor(Math.random() * 18) + 8
        )
      );
    }, 140);
    return () => clearInterval(t);
  }, [isOpen, status]);

  // Fake progress bar while running inference
  useEffect(() => {
    if (status === 'uploading') {
      setProgress(5);
      progressRef.current = setInterval(() => {
        setProgress((p) => (p < 88 ? p + Math.random() * 12 : p));
      }, 220);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
      if (status === 'done') setProgress(100);
    }
  }, [status]);

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
    setFileName('');
    setProgress(0);
  };

  const runDetection = useCallback(async (file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    setResult(null);
    setErrorMsg('');

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/detect', { method: 'POST', body: form });
      const data = await res.json();

      if (!res.ok || data.ok === false) {
        throw new Error(data.error || 'Detection failed');
      }

      setResult(data as Result);
      setStatus('done');

      if (data.prediction === 'spoof') {
        playAlertBeep();
      } else {
        playSuccessChime();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Unknown error');
      setStatus('error');
    }
  }, []);

  const handleFile = (file: File | null | undefined) => {
    if (!file) return;
    runDetection(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  if (!isOpen) return null;

  const isSpoof = result?.prediction === 'spoof';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#08080a] border border-white/15 shadow-[0_0_80px_rgba(6,182,212,0.08)] text-white overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-none">AI Voice Spoof Detector</h2>
              <p className="text-[11px] text-white/50 font-mono mt-0.5">VoiceSpoofCNNV3 · PyTorch · 64 Mel-Bands</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* ── IDLE: Upload Zone ── */}
          {status === 'idle' && (
            <>
              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all py-10 px-6 text-center ${
                  dragOver
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                    : 'border-white/15 bg-white/3 hover:border-cyan-400/50 hover:bg-cyan-950/10'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Drop audio file here</p>
                  <p className="text-xs text-white/50 mt-1">or click to browse · WAV, MP3, M4A, OGG, FLAC</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse"></span>
                  ML model loaded · inference in &lt;80ms
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED}
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>

              {/* How it works */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex gap-3 items-start text-[11px] text-white/60">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Your audio is converted to a <span className="text-white">3-channel Log-Mel spectrogram (Δ, ΔΔ)</span> and run through a{' '}
                  <span className="text-white">4-layer CNN (VoiceSpoofCNNV3)</span> trained to detect ElevenLabs, Tortoise-TTS, and other voice clones.
                  Audio is never stored.
                </span>
              </div>
            </>
          )}

          {/* ── UPLOADING: Running inference ── */}
          {status === 'uploading' && (
            <div className="space-y-5 py-4">
              {/* Waveform visualizer */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-3">
                  <span className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    EXTRACTING LOG-MEL FEATURES...
                  </span>
                  <span className="text-cyan-400">CNN INFERENCE RUNNING</span>
                </div>
                <div className="flex items-end gap-1 h-14 justify-center">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-2.5 rounded-t-sm bg-gradient-to-t from-cyan-900 via-cyan-500 to-cyan-200 shadow-[0_0_6px_rgba(6,182,212,0.4)] transition-all duration-150"
                    />
                  ))}
                </div>
              </div>

              {/* File name */}
              <div className="text-center">
                <p className="text-xs text-white/60 font-mono truncate px-2">
                  Analysing: <span className="text-cyan-300">{fileName}</span>
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Running PyTorch inference</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>VoiceSpoofCNNV3 — 4 Conv Layers · Adaptive Avg Pool · Sigmoid output</span>
              </div>
            </div>
          )}

          {/* ── DONE: Result ── */}
          {status === 'done' && result && (
            <div className="space-y-4">
              {/* Verdict Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isSpoof
                  ? 'bg-rose-950/30 border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.15)]'
                  : 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isSpoof ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {isSpoof
                      ? <AlertTriangle className="w-6 h-6" />
                      : <ShieldCheck className="w-6 h-6" />
                    }
                  </div>
                  <div>
                    <p className={`text-lg font-extrabold ${isSpoof ? 'text-rose-300' : 'text-emerald-300'}`}>
                      {isSpoof ? 'AI CLONED VOICE DETECTED' : 'AUTHENTIC HUMAN VOICE'}
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">{result.verdict_label}</p>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    label: 'Spoof Probability',
                    value: `${(result.spoof_probability * 100).toFixed(1)}%`,
                    accent: isSpoof ? 'text-rose-300' : 'text-emerald-300',
                  },
                  {
                    label: 'Confidence',
                    value: `${(result.confidence * 100).toFixed(1)}%`,
                    accent: 'text-cyan-300',
                  },
                  {
                    label: 'Inference Latency',
                    value: `${result.latency_ms} ms`,
                    accent: 'text-white',
                  },
                  {
                    label: 'Decision Threshold',
                    value: `${result.threshold}`,
                    accent: 'text-white/70',
                  },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-white/50 font-mono">{s.label}</p>
                    <p className={`text-lg font-bold font-mono mt-0.5 ${s.accent}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Individual Windows Breakdown */}
              {result.window_scores && result.window_scores.length > 0 && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[10px] text-white/50 font-mono mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    INDIVIDUAL WINDOW SCORES (2s chunks)
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {result.window_scores.map((score, idx) => {
                      const isSpoofWindow = score >= result.threshold;
                      return (
                        <div 
                          key={idx} 
                          className={`px-2 py-1 rounded-[6px] text-[10px] font-mono border ${
                            isSpoofWindow 
                              ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' 
                              : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {(score * 100).toFixed(1)}%
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2.5">
                <button
                  onClick={reset}
                  className="flex-1 py-3 rounded-full bg-white/8 border border-white/15 hover:bg-white/12 hover:border-white/25 text-sm font-semibold text-white/80 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Test Another File
                </button>
              </div>
            </div>
          )}

          {/* ── ERROR ── */}
          {status === 'error' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-950/50 border border-rose-500/40 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Detection Failed</p>
                <p className="text-xs text-rose-300 mt-1 font-mono">{errorMsg}</p>
                <p className="text-xs text-white/40 mt-2">
                  Make sure the Python ML server is running on port 8000.
                </p>
              </div>
              <button
                onClick={reset}
                className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 border border-white/15 hover:bg-white/12 text-sm font-semibold text-white cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
