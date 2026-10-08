'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Shield, ShieldAlert, AlertTriangle, Play, Pause, Volume2, Wifi, Battery, Signal, User, RefreshCw, CheckCircle2 } from 'lucide-react';
import { playAlertBeep, playSuccessChime, startVoiceSimulation } from '@/lib/audioSimulator';

export default function LiveCallSimulation() {
  const [activeScenario, setActiveScenario] = useState<'grandchild' | 'ceo' | 'bank' | 'safe'>('grandchild');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [syntheticScore, setSyntheticScore] = useState(94);
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [bars, setBars] = useState<number[]>([20, 40, 70, 95, 80, 60, 85, 90, 45, 75, 60, 30]);

  const stopAudioRef = useRef<(() => void) | null>(null);

  const scenarios = {
    grandchild: {
      name: 'Unknown Caller',
      number: '+91 (987) 654-3210',
      tag: 'Grandchild Emergency Scam',
      audioText: '"Dad, please don\'t tell mom, I was in a car accident near Connaught Place. Send ₹50,000 immediately..."',
      score: 94,
      alert: 'SYNTHETIC DETECTED - Vocal tract resonance mismatch. Likely AI voice clone.',
      isSynthetic: true,
      modelAttribution: 'ElevenLabs v2 Clone',
    },
    ceo: {
      name: 'Executive Spoof',
      number: '+1 (415) 890-1122',
      tag: 'Executive Wire Transfer Scam',
      audioText: '"Hey, I am boarding a flight. Authorize the invoice for vendor Alpha immediately, do not wait for email."',
      score: 98,
      alert: 'CRITICAL SPOOF - Generative pitch flattening & absent micro-tremors detected.',
      isSynthetic: true,
      modelAttribution: 'Tortoise-TTS Diffusion',
    },
    bank: {
      name: 'HDFC Security Desk (Spoofed)',
      number: '+91 (022) 678-9000',
      tag: 'KYC Expiration Scam',
      audioText: '"Your net banking token has expired. Press 1 and dictate the OTP received on SMS to prevent account freeze."',
      score: 91,
      alert: 'SYNTHETIC DETECTED - Phase discontinuity in carrier frequency. VoIP spoof.',
      isSynthetic: true,
      modelAttribution: 'OpenAI Voice Engine clone',
    },
    safe: {
      name: 'Aarav (Son)',
      number: '+91 98200 12345',
      tag: 'Verified Biological Voice',
      audioText: '"Hey Dad! Just wanted to check if you reached home safely. Let\'s catch up this evening."',
      score: 3,
      alert: 'AUTHENTIC HUMAN SPEECH - Natural physiological jitter and breath aerodynamics verified.',
      isSynthetic: false,
      modelAttribution: 'Authentic Vocal Tract',
    },
  };

  const current = scenarios[activeScenario];

  // Dynamic audio visualizer bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() => {
          if (!isPlayingAudio) return Math.floor(Math.random() * 25) + 10;
          return Math.floor(Math.random() * 75) + 20;
        })
      );
    }, 200);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if (stopAudioRef.current) {
        stopAudioRef.current();
        stopAudioRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      if (current.isSynthetic) {
        playAlertBeep();
      } else {
        playSuccessChime();
      }
      const stopper = startVoiceSimulation(current.isSynthetic);
      stopAudioRef.current = stopper;
      setIsPlayingAudio(true);
    }
  };

  const handleSelectScenario = (key: 'grandchild' | 'ceo' | 'bank' | 'safe') => {
    if (stopAudioRef.current) {
      stopAudioRef.current();
      stopAudioRef.current = null;
    }
    setIsPlayingAudio(false);
    setIsQuarantined(false);
    setActiveScenario(key);
    setSyntheticScore(scenarios[key].score);
  };

  const handleQuarantine = () => {
    setIsQuarantined(true);
    playAlertBeep();
  };

  return (
    <section id="simulation" className="relative py-20 bg-transparent border-b border-[var(--glass-line)]/50 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/70 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>PHYSICAL-GRADE THREAT SHIELD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            Live Call Telemetry Simulation
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-soft)]">
            Experience how VoiceShield detects deepfake tactics in real-time under simulated conditions with synthetic voices and background audio.
          </p>
        </div>

        {/* Interactive Scenario Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['grandchild', 'ceo', 'bank', 'safe'] as const).map((key) => {
            const sc = scenarios[key];
            const isActive = activeScenario === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectScenario(key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? sc.isSynthetic
                      ? 'bg-red-950/80 border border-red-500/60 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-violet-950/80 border border-white/25 text-violet-200 shadow-[0_0_15px_rgba(167,139,250,0.3)]'
                    : 'bg-[var(--panel)]/70 border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink-muted)] hover:border-white/30'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${sc.isSynthetic ? 'bg-red-400' : 'bg-violet-400'}`} />
                <span>{sc.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Center: The Smartphone Telemetry Device Mock */}
        <div className="max-w-md mx-auto relative">
          
          {/* Outer glow ring around phone */}
          <div className={`absolute -inset-1 rounded-[40px] opacity-70 blur-xl transition-all duration-700 ${
            current.isSynthetic && syntheticScore > 50
              ? 'bg-gradient-to-b from-red-600/30 to-amber-600/20'
              : 'bg-gradient-to-b from-violet-500/30 to-purple-500/20'
          }`} />

          {/* Smartphone Frame */}
          <div className="relative rounded-[36px] bg-[#070d1e] border-2 border-white/20 shadow-2xl p-5 overflow-hidden backdrop-blur-2xl">
            
            {/* Top Speaker Notch & Camera */}
            <div className="flex items-center justify-between px-3 pt-1 pb-4 text-[11px] font-mono text-[var(--ink-soft)] border-b border-white/10">
              <span className="font-semibold text-[var(--ink-muted)]">12:45</span>
              <div className="w-16 h-4 bg-[var(--panel)] rounded-full flex items-center justify-center gap-1 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--ink-soft)]">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-[var(--accent)]" />
              </div>
            </div>

            {/* Caller Profile Section */}
            <div className="py-6 flex flex-col items-center text-center">
              
              {/* Pulsing Avatar */}
              <div className="relative mb-3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  current.isSynthetic && syntheticScore > 50
                    ? 'bg-red-950/80 border-2 border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                    : 'bg-violet-950/80 border-2 border-white/25 shadow-[0_0_20px_rgba(167,139,250,0.5)]'
                }`}>
                  <User className={`w-9 h-9 ${current.isSynthetic && syntheticScore > 50 ? 'text-red-400' : 'text-violet-400'}`} />
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-[var(--panel)] border border-white/15 text-[9px] font-mono text-[var(--accent-text)]">
                  5G
                </div>
              </div>

              {/* Caller Name and Number */}
              <h3 className="text-xl font-bold text-[var(--ink)] tracking-tight">{current.name}</h3>
              <p className="text-xs text-[var(--ink-soft)] font-mono mt-0.5">{current.number}</p>
              
              {/* Telemetry Stream Status */}
              <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[var(--accent)] bg-[var(--panel)]/50 px-2.5 py-1 rounded-full border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>VOICE STREAM ACTIVE - ANALYZING FREQUENCIES...</span>
              </div>
            </div>

            {/* Live Audio Equalizer Waveform */}
            <div className="my-2 p-3 rounded-xl bg-[var(--panel)]/80 border border-white/15">
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--ink-soft)] mb-2">
                <span>ACOUSTIC SPECTRUM</span>
                <span className="text-[var(--accent)]">{current.modelAttribution}</span>
              </div>
              <div className="flex items-end justify-center gap-1.5 h-16">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-2 rounded-full transition-all duration-200 ${
                      current.isSynthetic && syntheticScore > 50
                        ? i % 2 === 0
                          ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                          : 'bg-amber-400'
                        : 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]'
                    }`}
                  />
                ))}
              </div>

              {/* Simulation Audio Playback Toggle */}
              <button
                onClick={handleToggleAudio}
                className="mt-3 w-full py-1.5 rounded-lg bg-[var(--panel)] border border-white/20 hover:border-white/35 text-xs text-[var(--accent-text)] hover:bg-[var(--panel)]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Stop Audio Synthesis</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Play Simulated Call Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Quote */}
            <div className="p-2.5 rounded-lg bg-[var(--panel)]/50 border border-white/15 text-[11px] text-[var(--ink-muted)] italic mb-4">
              {current.audioText}
            </div>

            {/* Alert Banner */}
            <div
              className={`p-3 rounded-xl border mb-5 flex items-start gap-2.5 transition-all ${
                current.isSynthetic && syntheticScore > 50
                  ? isQuarantined
                    ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
                    : 'bg-red-950/90 border-red-500/70 text-red-100 alert-pulse'
                  : 'bg-violet-950/70 border border-white/20 text-violet-200'
              }`}
            >
              {current.isSynthetic && syntheticScore > 50 ? (
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              )}
              <div className="text-[11px] leading-snug">
                <span className="font-bold">
                  {isQuarantined
                    ? 'CALL QUARANTINED'
                    : current.isSynthetic && syntheticScore > 50
                    ? `⚠️ ${current.score}% SYNTHETIC DETECTED`
                    : '✅ VERIFIED CALLER'}:
                </span>{' '}
                {isQuarantined
                  ? 'Audio stream routed to honeypot telemetry. Real recipient muted.'
                  : current.alert}
              </div>
            </div>

            {/* Call Control Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleQuarantine}
                className="flex-1 py-3 px-4 rounded-xl bg-[#050507]/80 hover:bg-white/10 border border-white/20 hover:border-white/35 text-[var(--accent-text)] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <Shield className="w-4 h-4 text-[var(--accent)]" />
                <span>{isQuarantined ? 'Protected (Active)' : 'Keep Call Protected'}</span>
              </button>

              <button
                onClick={() => {
                  if (stopAudioRef.current) {
                    stopAudioRef.current();
                    stopAudioRef.current = null;
                  }
                  setIsPlayingAudio(false);
                  playAlertBeep();
                }}
                className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-500 text-[var(--ink)] flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all shrink-0"
                title="Hang up call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Interactive Confidence Slider */}
          <div className="mt-4 p-3 rounded-xl bg-[var(--panel)]/80 border border-white/15 text-xs text-[var(--ink-muted)]">
            <div className="flex justify-between items-center mb-1 text-[11px] font-mono">
              <span className="text-[var(--ink-soft)]">Simulation Threshold Adjuster:</span>
              <span className={syntheticScore > 50 ? 'text-red-400 font-bold' : 'text-violet-400 font-bold'}>
                {syntheticScore}% {syntheticScore > 50 ? 'Synthetic' : 'Authentic'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={syntheticScore}
              onChange={(e) => setSyntheticScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
