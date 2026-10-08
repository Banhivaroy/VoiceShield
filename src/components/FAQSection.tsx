'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does VoiceShield operate without eavesdropping on private conversations?',
      a: 'VoiceShield evaluates the physical and acoustic properties of sound—such as vocal tract length, laryngeal frequency jitter, and phase smearing—rather than parsing speech into text. We never transcribe words, build speech-to-text models, or log semantic conversation. Raw audio buffers are processed in volatile RAM and zero-wiped within 12 milliseconds.',
    },
    {
      q: 'Does it work with WhatsApp, Telegram, and encrypted VoIP calls?',
      a: 'Yes. For mobile users, VoiceShield uses high-performance on-device accessibility and telecom audio-routing hooks on Android and iOS to analyze the local incoming speaker stream. Because analysis occurs directly at the device output layer, end-to-end encryption in WhatsApp and Telegram remains completely intact and uncompromised.',
    },
    {
      q: 'Can it detect deepfakes created using voice clips under 5 seconds?',
      a: 'Absolutely. Generative voice synthesis architectures (such as diffusion vocoders and autoregressive models) fundamentally struggle to reproduce the biological micro-turbulence of human breath and authentic glottal opening phase dynamics. These synthetic markers are identifiable within the first 42 to 80 milliseconds of voiced audio.',
    },
    {
      q: 'What happens when someone speaks with a cold, bad connection, or sore throat?',
      a: 'Biological vocal cords, even when swollen or strained by a cold, still obey anatomical fluid dynamics: turbulent airflow, physical inertia, and natural pitch micro-jitter. VoiceShield is trained specifically to distinguish real pathological or cellular connection noise from algorithmic generative artifacts, maintaining a false positive rate under 0.1%.',
    },
    {
      q: 'Can enterprise call centers integrate VoiceShield via SIP trunks or Twilio?',
      a: 'Yes. For banks, fintechs, and call centers, VoiceShield provides an ultra-low latency SIP trunking proxy, WebRTC SDK, and REST API. We integrate natively with Twilio Flex, Genesys Cloud, Asterisk, and Cisco Unified Communications Manager in under 15 minutes.',
    },
    {
      q: 'How fast is the detection latency before someone can be scammed?',
      a: 'Our edge neural engine returns a deterministic verdict in less than 80 milliseconds (typically 42ms). This means a deepfake caller is flagged before they finish speaking their opening greeting, providing an instant warning banner on your screen before any sensitive information or OTP can be solicited.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-transparent border-b border-[var(--glass-line)]/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)]/60 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>CRITICAL ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
            Frequently Answered Questions
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-soft)]">
            Everything you need to know regarding latency, privacy, accuracy, and operational integration.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/80 border border-white/15 hover:border-white/35 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-bold text-[var(--ink-muted)] group-hover:text-[var(--accent-text)] transition-colors">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] group-hover:text-[var(--accent)] group-hover:border-white/35 transition-all ${
                    isOpen ? 'rotate-180 bg-[var(--panel)]/50 text-[var(--accent-text)]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed border-t border-white/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
