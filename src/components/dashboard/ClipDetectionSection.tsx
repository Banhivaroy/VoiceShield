'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mic, Play, Pause, RotateCcw, Cloud, Lock, Check, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import { playAlertBeep, playSuccessChime, startVoiceSimulation } from '@/lib/audioSimulator';

export interface SampleClipData {
  id: 'grandchild' | 'mother' | 'traffic';
  tag: string;
  name: string;
  subname: string;
  durationStr: string;
  totalSeconds: number;
  unusualSection: string;
  score: number;
  resultTitle: string;
  resultDesc: string;
  isSynthetic: boolean;
  reasons: { title: string; desc: string }[];
}

export const sampleClips: Record<'grandchild' | 'mother' | 'traffic', SampleClipData> = {
  grandchild: {
    id: 'grandchild',
    tag: 'AI voice sample 00:07',
    name: 'Grandchild urgent call',
    subname: 'Cloned voice sample',
    durationStr: '00:07.4',
    totalSeconds: 7.4,
    unusualSection: '00:03.2 / 00:07.4',
    score: 92,
    resultTitle: 'Strong indicators of AI synthesis',
    resultDesc: "The caller's voice patterns showed consistent synthetic traits compared to normal human speech.",
    isSynthetic: true,
    reasons: [
      {
        title: 'Pitch stayed unusually steady',
        desc: 'Natural human speech has micro-fluctuations in pitch that were missing here.',
      },
      {
        title: 'Some sound patterns matched AI-generated speech',
        desc: 'Certain audio frequencies followed repeating digital synthesis curves.',
      },
      {
        title: 'Unnatural tone continuity across phrases',
        desc: 'Words transitioned without standard natural pauses between spoken sentences.',
      },
    ],
  },
  mother: {
    id: 'mother',
    tag: 'Real voice sample 00:20',
    name: 'Mother family call',
    subname: 'Authentic human voice',
    durationStr: '00:20.0',
    totalSeconds: 20.0,
    unusualSection: 'None (Natural biological resonance)',
    score: 2,
    resultTitle: 'Authentic human biological voice',
    resultDesc: "Vocal cords exhibit natural aerodynamic airflow turbulence, physiological pitch jitter, and authentic pauses.",
    isSynthetic: false,
    reasons: [
      {
        title: 'Natural organic pitch micro-tremors verified',
        desc: 'Physiological vocal cord vibrations correspond accurately with human muscular dynamics.',
      },
      {
        title: 'Authentic respiratory micro-inhalations',
        desc: 'Natural breathing gaps detected between articulated sentences.',
      },
      {
        title: 'Zero vocoder synthesis artifacts',
        desc: 'No phase smearing or robotic mathematical pitch quantization.',
      },
    ],
  },
  traffic: {
    id: 'traffic',
    tag: 'Noisy call sample 00:06',
    name: 'Traffic background call',
    subname: 'Heavy street noise',
    durationStr: '00:06.2',
    totalSeconds: 6.2,
    unusualSection: '00:01.8 / 00:04.5 (High background noise)',
    score: 14,
    resultTitle: 'Human speech with ambient vehicle noise',
    resultDesc: "Heavy background vehicular rumble detected, but underlying voice formants match authentic biological speech.",
    isSynthetic: false,
    reasons: [
      {
        title: 'Acoustic background noise successfully isolated',
        desc: 'Spectral filtering separated 50Hz road rumble from vocal frequencies.',
      },
      {
        title: 'Biological formant trajectories preserved',
        desc: 'F1 and F2 speech vowel peaks match human vocal tract geometry.',
      },
      {
        title: 'Recommendation: Balanced Caution',
        desc: 'If caller requests urgent money, verify identity out-of-band.',
      },
    ],
  },
};

interface ClipDetectionSectionProps {
  activeSample: 'grandchild' | 'mother' | 'traffic';
  setActiveSample: (sample: 'grandchild' | 'mother' | 'traffic') => void;
  onRunScan: () => void;
  isScanning: boolean;
}

export default function ClipDetectionSection({
  activeSample,
  setActiveSample,
  onRunScan,
  isScanning,
}: ClipDetectionSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(3.2);
  const [selectedLanguage, setSelectedLanguage] = useState('English (India)');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [customFile, setCustomFile] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stopAudioRef = useRef<(() => void) | null>(null);

  const current = sampleClips[activeSample];

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= current.totalSeconds) {
            setIsPlaying(false);
            if (stopAudioRef.current) stopAudioRef.current();
            return 0;
          }
          return +(prev + 0.2).toFixed(1);
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, current.totalSeconds]);

  // Recording simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 10) {
            setIsRecording(false);
            setCustomFile('recorded_snippet_mic.wav');
            playSuccessChime();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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

  const handleReplay = () => {
    setCurrentTime(0);
    if (!isPlaying) {
      handleTogglePlay();
    }
  };

  const handleSampleChange = (id: 'grandchild' | 'mother' | 'traffic') => {
    if (stopAudioRef.current) {
      stopAudioRef.current();
      stopAudioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(id === 'grandchild' ? 3.2 : 0);
    setCustomFile(null);
    setActiveSample(id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFile(e.target.files[0].name);
      playSuccessChime();
    }
  };

  const handleRecordSnippet = () => {
    if (isRecording) {
      setIsRecording(false);
      setCustomFile('recorded_snippet_mic.wav');
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);
    }
  };

  // Generate waveform bars (some natural blue, some red flagged in middle)
  const totalBars = 36;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 shadow-xl space-y-5">
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--panel)]/80 border border-white/15 flex items-center justify-center text-[var(--accent)]">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base font-bold text-[var(--ink)] tracking-tight">Detect a clip</h3>
        </div>

        {/* Action Buttons: Upload Audio & Record Snippet */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-white/90 text-black text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload audio</span>
          </button>

          <button
            onClick={handleRecordSnippet}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
              isRecording
                ? 'bg-red-950 border border-red-500 text-red-300 animate-pulse'
                : 'bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-muted)] hover:border-white/30 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-[var(--ink-soft)]" />
            <span>{isRecording ? `Recording (${recordingSeconds}s)...` : 'Record snippet'}</span>
          </button>
        </div>
      </div>

      {/* Spoken Language Dropdown */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-[var(--ink-soft)] font-mono">Spoken language:</span>
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="appearance-none bg-[var(--panel)]/90 border border-white/15 hover:border-white/30 text-[var(--ink-muted)] text-xs font-mono rounded-lg px-3 py-1.5 pr-8 focus:outline-none cursor-pointer"
          >
            <option value="English (India)">English (India)</option>
            <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
            <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
            <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
            <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
          </select>
          <ChevronDown className="w-3 h-3 text-[var(--ink-soft)] absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Privacy Note Banner */}
      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Privacy note: Your audio is deleted right after checking.</span>
      </div>

      {/* Example Sample Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-[var(--ink-soft)]">Or try an example sample:</div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          
          {/* Chip 1: Grandchild */}
          <button
            onClick={() => handleSampleChange('grandchild')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeSample === 'grandchild'
                ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                : 'bg-[var(--panel)]/60 border border-white/15 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--ink-soft)] mb-0.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>AI voice sample 00:07</span>
            </div>
            <div className="text-xs font-bold text-[var(--ink)] leading-tight">Grandchild urgent call</div>
            <div className="text-[10px] text-[var(--ink-soft)]">Cloned voice sample</div>
          </button>

          {/* Chip 2: Mother */}
          <button
            onClick={() => handleSampleChange('mother')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeSample === 'mother'
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'bg-[var(--panel)]/60 border border-white/15 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--ink-soft)] mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Real voice sample 00:20</span>
            </div>
            <div className="text-xs font-bold text-[var(--ink)] leading-tight">Mother family call</div>
            <div className="text-[10px] text-[var(--ink-soft)]">Authentic human voice</div>
          </button>

          {/* Chip 3: Traffic */}
          <button
            onClick={() => handleSampleChange('traffic')}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeSample === 'traffic'
                ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-[var(--panel)]/60 border border-white/15 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--ink-soft)] mb-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Noisy call sample 00:06</span>
            </div>
            <div className="text-xs font-bold text-[var(--ink)] leading-tight">Traffic background call</div>
            <div className="text-[10px] text-[var(--ink-soft)]">Heavy street noise</div>
          </button>

        </div>
      </div>

      {/* Drag & Drop File Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-6 rounded-2xl border border-dashed border-white/20 hover:border-white/40 bg-black/40 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-[var(--panel)]/60 border border-white/15 flex items-center justify-center text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform">
          <Cloud className="w-5 h-5" />
        </div>
        <p className="text-xs font-semibold text-[var(--ink-muted)]">
          {customFile ? (
            <span className="text-[var(--accent-text)] font-mono">Selected: {customFile}</span>
          ) : (
            <>
              Drop phone audio file here, or{' '}
              <span className="text-[var(--accent)] underline underline-offset-2">browse your files</span>
            </>
          )}
        </p>
        <p className="text-[10px] text-[var(--ink-soft)] font-mono mt-1">
          Accepts WAV, MP3, M4A • Recommended: 5-10s snippet • Max 10MB
        </p>
      </div>

      {/* Audio Preview & Waveform Box */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--ink-muted)] font-semibold">Audio preview</span>
          <span className="text-amber-400 text-[11px]">
            Unusual tone section : {current.unusualSection}
          </span>
        </div>

        {/* Waveform graphic with flagged marker */}
        <div className="relative pt-6 pb-2">
          {/* Tag marker above flagged section */}
          {activeSample === 'grandchild' && (
            <div className="absolute top-0 left-1/3 -translate-x-1/2 px-2 py-0.5 rounded bg-red-950 border border-red-500/60 text-[9px] font-mono text-red-300 flex items-center gap-1 shadow-sm">
              <span>Not subtle steady pitch</span>
            </div>
          )}

          {/* Equalizer Waveform bars */}
          <div className="flex items-end justify-between gap-1 h-14 px-1">
            {Array.from({ length: totalBars }).map((_, i) => {
              const isFlaggedSection = activeSample === 'grandchild' && i >= 11 && i <= 21;
              const heights = [35, 45, 60, 75, 40, 85, 90, 65, 50, 70, 80, 95, 90, 85, 90, 80, 88, 75, 65, 55, 45, 40, 30, 25, 45, 60, 50, 40, 35, 30, 25, 20, 35, 40, 30, 20];
              const h = heights[i % heights.length];
              
              return (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isFlaggedSection
                      ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                      : 'bg-violet-400/90 shadow-[0_0_6px_rgba(167,139,250,0.5)]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Controls and Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="w-7 h-7 rounded-lg bg-[var(--panel)] border border-white/20 text-white hover:bg-white/10 flex items-center justify-center cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />}
            </button>
            <button
              onClick={handleReplay}
              className="w-7 h-7 rounded-lg bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-white flex items-center justify-center cursor-pointer"
              title="Replay from start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-[var(--ink-soft)] ml-1">
              00:{currentTime.toFixed(1).padStart(4, '0')} / {current.durationStr}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[var(--ink-soft)]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-red-500"></span>
              <span>Flagged patterns</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-violet-400"></span>
              <span>Natural voice</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <span className="text-[11px] font-mono text-[var(--ink-soft)]">
          Audio is screened in private memory
        </span>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => {
              setCustomFile(null);
              setCurrentTime(0);
              setIsPlaying(false);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-mono text-[var(--ink-soft)] hover:text-white bg-[var(--panel)]/60 border border-white/15 hover:border-white/30 cursor-pointer"
          >
            Clear
          </button>

          <button
            onClick={onRunScan}
            disabled={isScanning}
            className="px-5 py-2 rounded-xl bg-white hover:bg-white/90 text-black font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Screening Audio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Check this audio</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
