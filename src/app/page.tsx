'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveCallSimulation from '@/components/LiveCallSimulation';
import MetricsHighlights from '@/components/MetricsHighlights';
import DefendOnYourTerms from '@/components/DefendOnYourTerms';
import ForensicPipeline from '@/components/ForensicPipeline';
import ActionableTruthSection from '@/components/ActionableTruthSection';
import IncidentSimulation from '@/components/IncidentSimulation';
import PrivacyPromise from '@/components/PrivacyPromise';
import RegionalAccents from '@/components/RegionalAccents';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import StarfieldBackground from '@/components/StarfieldBackground';

// Modals
import GetProtectedModal from '@/components/modals/GetProtectedModal';
import DemoModal from '@/components/modals/DemoModal';
import EnterpriseConsoleModal from '@/components/modals/EnterpriseConsoleModal';
import AuditLedgerModal from '@/components/modals/AuditLedgerModal';


export default function Home() {
  const [getProtectedOpen, setGetProtectedOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#000000] text-[var(--ink)] flex flex-col font-sans selection:bg-cyan-200 selection:text-cyan-900 relative">
      {/* Full-page cosmic starfield background */}
      <StarfieldBackground />
      
      {/* User Login Notification Banner if logged in */}
      {currentUser && (
        <div className="bg-[#050507]/90 border-b border-white/20 text-[var(--accent-text)] text-xs py-2 px-4 flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
            <span>Signed in as: <strong>{currentUser}</strong> • Hardware Enclave Active</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-[11px] font-semibold text-white hover:underline flex items-center gap-1">
              Go to Dashboard &rarr;
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/settings" className="text-[11px] text-white/70 hover:text-white hover:underline">
              Settings
            </Link>
            <span className="text-white/30">•</span>
            <button
              onClick={() => setCurrentUser(null)}
              className="text-[11px] underline hover:text-[var(--ink)] cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenGetProtected={() => setGetProtectedOpen(true)}
        onOpenDemo={() => setDemoOpen(true)}
        onOpenEnterprise={() => setEnterpriseOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with Hologram HUD Radar */}
        <HeroSection
          onOpenGetProtected={() => setGetProtectedOpen(true)}
          onOpenDemo={() => setDemoOpen(true)}
        />

        {/* 2. Live Call Telemetry Simulation (Smartphone Mock with Real Interactive Audio) */}
        <LiveCallSimulation />

        {/* 3. Metrics & Spec Highlights Row (4 Cards) */}
        <MetricsHighlights />

        {/* 4. Defend on your terms (Dual Layer Architecture) */}
        <DefendOnYourTerms
          onOpenGetProtected={() => setGetProtectedOpen(true)}
          onOpenEnterprise={() => setEnterpriseOpen(true)}
        />

        {/* 5. Forensic Telemetry in 4 Stages */}
        <ForensicPipeline />

        {/* 6. Actionable Forensics (No vague warnings, circular gauge & directive) */}
        <ActionableTruthSection />

        {/* 7. Real-World Attack Simulation (The Urgent Grandchild Scam) */}
        <IncidentSimulation />

        {/* 8. Cryptographic Privacy Promise (RAM-Only & Zero-Knowledge) */}
        <PrivacyPromise onOpenAuditModal={() => setAuditOpen(true)} />

        {/* 9. Calibrated for Regional Accents (Indian English, Hindi, Hinglish, Tamil/Telugu) */}
        <RegionalAccents />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAuditModal={() => setAuditOpen(true)}
        onOpenEnterprise={() => setEnterpriseOpen(true)}
      />

      {/* Production Interactive Modals */}

      <GetProtectedModal
        isOpen={getProtectedOpen}
        onClose={() => setGetProtectedOpen(false)}
      />

      <DemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
      />

      <EnterpriseConsoleModal
        isOpen={enterpriseOpen}
        onClose={() => setEnterpriseOpen(false)}
      />

      <AuditLedgerModal
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
      />

    </div>
  );
}
