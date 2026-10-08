'use client';

import React, { useState } from 'react';
import { Volume2, Play, Pause, CheckCircle2, Globe2, Sparkles } from 'lucide-react';
import { playSuccessChime, startVoiceSimulation } from '@/lib/audioSimulator';

export default function RegionalAccents() {
  const [activeTab, setActiveTab] = useState<'indian-en' | 'hindi' | 'hinglish' | 'tamil-telugu'>('indian-en');
  const [isPlaying, setIsPlaying] = useState(false);

  const data = {
    'indian-en': {
      tab: 'Indian English',
      title: 'Indian English Phonetic Calibrator',
      desc: 'Accounts for retroflex consonants (t, d), unaspirated plosives, and distinctive cadence variations in Indian English that standard Western deepfake models falsely flag as synthetic.',
      phrase: 'Transfer the NEFT OTP sent to your WhatsApp immediately to verify your account.',
      accuracy: '99.2%',
      falsePositive: '<0.08%',
      nuance: 'Compensates for syllable-timed prosody vs stress-timed Western English.',
    },
    hindi: {
      tab: 'Hindi (हिन्दी)',
      title: 'Hindi Dialectal & Aspirated Phoneme Calibrator',
      desc: 'Accurately distinguishes between voiced aspirated (भ, ध, घ) and unvoiced aspirated consonants (फ, थ, ख), preventing false synthetic flags on high breath expulsion.',
      phrase: 'आपके बैंक खाते में संदिग्ध लेनदेन हुआ है, तुरंत वेरिफिकेशन कोड साझा करें।',
      accuracy: '99.4%',
      falsePositive: '<0.06%',
      nuance: 'Eliminates false alarms triggered by colloquial Delhi, UP, and Mumbai cadence.',
    },
    hinglish: {
      tab: 'Hinglish (हिंग्लिश)',
      title: 'Hinglish Code-Switching Neural Calibrator',
      desc: 'Handles rapid mid-sentence linguistic transitions between English and Hindi, dynamically adjusting pitch trajectory models without dropping phonetic context.',
      phrase: 'Arre bhai, accident ho gaya hai Connaught Place ke paas, jaldi GPay karo ₹20,000.',
      accuracy: '98.9%',
      falsePositive: '<0.11%',
      nuance: 'Maintains acoustic continuity across sudden intra-sentential language switches.',
    },
    'tamil-telugu': {
      tab: 'Tamil / Telugu (தமிழ் / తెలుగు)',
      title: 'Dravidian Phonological Prosody Calibrator',
      desc: 'Specialized weighting for retroflex lateral approximants (ழ) and alveolar trills, ensuring pristine acoustic fidelity and zero false positive rejections in South Indian telephony.',
      phrase: 'வங்கி கணக்கு சரிபார்ப்புக்கு உடனடியாக இந்த இணைப்பை கிளிக் செய்யவும்.',
      accuracy: '99.1%',
      falsePositive: '<0.09%',
      nuance: 'Calibrated for rapid syllable rates and regional intonation curves.',
    },
  };

  const current = data[activeTab];

  const handlePlaySample = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      playSuccessChime();
      startVoiceSimulation(false);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  return (
    <section id="accents" className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>MULTI-LINGUAL ACCURACY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              Calibrated for Regional Accents
            </h2>
          </div>
          <p className="text-sm text-[var(--ink-soft)] max-w-md">
            Trained on diverse accents across Indian and global linguistic patterns to eliminate false alarms and detect localized voice scams.
          </p>
        </div>

        {/* Accent Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['indian-en', 'hindi', 'hinglish', 'tamil-telugu'] as const).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setIsPlaying(false);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#050507]0 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                    : 'bg-[var(--panel)]/80 border border-[var(--glass-line)] text-[var(--ink-muted)] hover:border-white/35 hover:text-[var(--ink)]'
                }`}
              >
                <span>{data[key].tab}</span>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-slate-950" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-[#040816] border border-white/20 p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent)] bg-[var(--panel)]/60 border border-white/20 px-3 py-1 rounded-md">
                <Globe2 className="w-3.5 h-3.5" />
                <span>PHONETIC PROFILER // {current.tab.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
                {current.title}
              </h3>

              <p className="text-sm text-[var(--ink-muted)] leading-relaxed font-normal">
                {current.desc}
              </p>

              {/* Sample phrase box */}
              <div className="p-4 rounded-2xl bg-[#050507]/80 border border-[var(--glass-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[var(--ink-soft)] uppercase">
                    TEST PHONETIC SAMPLE
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--ink-muted)] font-mono italic">
                    &ldquo;{current.phrase}&rdquo;
                  </div>
                </div>

                <button
                  onClick={handlePlaySample}
                  className="px-4 py-2 rounded-xl bg-[var(--panel)] border border-white/20 text-[var(--accent-text)] hover:bg-white/10 text-xs font-mono flex items-center gap-2 shrink-0 cursor-pointer transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-cyan-400" />}
                  <span>{isPlaying ? 'Playing Sample...' : 'Hear Calibration'}</span>
                </button>
              </div>

              <div className="text-xs text-[var(--ink-soft)] pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                <span>{current.nuance}</span>
              </div>
            </div>

            {/* Right Big Stat Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-b from-cyan-950/50 via-slate-900/60 to-slate-950 border border-white/20 text-center shadow-[0_0_30px_rgba(255,255,255,0.06)]">
              <span className="text-xs font-mono tracking-wider text-[var(--accent)] uppercase mb-2">
                REGIONAL ACCURACY
              </span>
              <div className="text-5xl font-extrabold text-[var(--ink)] tracking-tight bg-gradient-to-r from-cyan-300 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                {current.accuracy}
              </div>
              <p className="text-xs font-medium text-[var(--ink-muted)] mt-2">
                Accuracy across Indian dialects
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--glass-line)] w-full text-[11px] font-mono text-[var(--accent-text)]">
                False Positive Rate: {current.falsePositive}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
