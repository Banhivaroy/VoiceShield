'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import HighRiskAlertBanner from '@/components/dashboard/HighRiskAlertBanner';
import LiveProtectionControl from '@/components/dashboard/LiveProtectionControl';
import MetricCards from '@/components/dashboard/MetricCards';
import ClipDetectionSection, { sampleClips } from '@/components/dashboard/ClipDetectionSection';
import ResultBreakdownSection from '@/components/dashboard/ResultBreakdownSection';
import IncidentInspectModal from '@/components/dashboard/IncidentInspectModal';
import StarfieldBackground from '@/components/StarfieldBackground';
import RecentCallsTable, { CallRecord } from '@/components/dashboard/RecentCallsTable';
import { ShieldCheck, PhoneCall, ExternalLink, CheckCircle2, Lock } from 'lucide-react';
import { playAlertBeep, playSuccessChime } from '@/lib/audioSimulator';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSample, setActiveSample] = useState<'grandchild' | 'mother' | 'traffic'>('grandchild');
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Database states
  const [user, setUser] = useState<any>(null);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [selectedCallId, setSelectedCallId] = useState('');

  React.useEffect(() => {
    // Fetch User Settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch((err) => console.error('Failed to fetch user', err));

    // Fetch Calls
    fetch('/api/calls')
      .then((res) => res.json())
      .then((data) => {
        if (data.calls) {
          // Map DB call format to UI format
          const mappedCalls: CallRecord[] = data.calls.map((c: any) => ({
            id: c.id,
            dateTime: new Date(c.createdAt).toLocaleString(),
            number: c.maskedNumber || 'Unknown',
            duration: c.durationSec ? `${Math.floor(c.durationSec / 60)}:${(c.durationSec % 60).toString().padStart(2, '0')}` : '00:00',
            language: c.language || 'English',
            resultType: c.verdict === 'AI_MADE' ? 'alert' : c.verdict === 'UNSURE' ? 'warning' : 'safe',
            resultText: c.verdict === 'AI_MADE' ? 'AI Voice Detected' : c.verdict === 'UNSURE' ? 'Warning' : 'Real Voice',
            timeline: { natural: '0-5s', flagged: 'None', detected: 'None', description: c.reasons?.join(', ') || 'No description' }
          }));
          setCalls(mappedCalls);
        }
      })
      .catch((err) => console.error('Failed to fetch calls', err));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunScan = () => {
    setIsScanning(true);
    playAlertBeep();
    setTimeout(() => {
      setIsScanning(false);
      playSuccessChime();
      showToast('Audio clip screening complete. No persistence to disk.');
    }, 1200);
  };

  const handleReportFalseAlarm = () => {
    playSuccessChime();
    showToast('Feedback logged. Neural weighting will be recalibrated for this accent.');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[var(--ink)] flex flex-col font-sans selection:bg-cyan-200 selection:text-cyan-900 relative">
      {/* Full-page cosmic starfield background */}
      <StarfieldBackground />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#0e0e12]/90 backdrop-blur-md border border-white/20 text-white text-xs font-mono shadow-[0_0_25px_rgba(167,139,250,0.3)] flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <DashboardHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={isAlertDismissed ? 0 : 1}
        onOpenNotifications={() => setIsInspectOpen(true)}
        onOpenHelp={() => showToast('Help Desk: Dial 1930 or email help@voiceshield.internal')}
      />

      {/* Main Body Layout with Left Sidebar */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-full">
          
          {/* Main Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                  Welcome back{user ? `, ${user.email?.split('@')[0] || user.phone}` : ''}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-medium text-emerald-400">
                  Standard protection
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
                VoiceShield is monitoring your phone calls for artificial voices and scams.
              </p>
            </div>

            {/* Zero Audio Saved Sample Pill */}
            <div className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[var(--panel)]/70 backdrop-blur-sm border border-white/15 text-xs font-mono text-emerald-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero audio saved <strong className="text-[var(--ink-soft)] font-normal">[Sample]</strong></span>
            </div>
          </div>

          {/* High Risk Alert Banner */}
          <HighRiskAlertBanner
            isDismissed={isAlertDismissed}
            onDismiss={() => setIsAlertDismissed(true)}
            onInspectAlert={() => setIsInspectOpen(true)}
          />

          {activeTab === 'history' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <RecentCallsTable 
                selectedCallId={selectedCallId} 
                onSelectCall={(c) => setSelectedCallId(c.id)} 
                calls={calls} 
              />
            </div>
          ) : (
            <>
              {/* Live Call Protection Control Box */}
              <LiveProtectionControl />

              {/* 4 Stats Cards */}
              <MetricCards />

              {/* Middle Two-Column Grid: Detect a Clip & Result */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left: Detect a Clip (7 cols) */}
                <div className="lg:col-span-7">
                  <ClipDetectionSection
                    activeSample={activeSample}
                    setActiveSample={setActiveSample}
                    onRunScan={handleRunScan}
                    isScanning={isScanning}
                  />
                </div>

                {/* Right: Result Breakdown (5 cols) */}
                <div className="lg:col-span-5">
                  <ResultBreakdownSection
                    clipData={sampleClips[activeSample]}
                    onReportFalseAlarm={handleReportFalseAlarm}
                  />
                </div>
              </div>
            </>
          )}

          {/* Emergency Support Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--panel)]/70 border border-white/15 flex items-center justify-center text-[var(--accent)] shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--ink)]">Need help or suspect an ongoing fraud?</h4>
                <p className="text-xs text-[var(--ink-soft)]">
                  Connect the official cyber safety cell immediately. Free and 24/7 accessible.
                </p>
              </div>
            </div>

            <a
              href="tel:1930"
              className="px-4 py-2.5 rounded-xl bg-[var(--panel)] hover:bg-[#232323] border border-white/20 hover:border-white/40 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>National Cyber Crime Helpline: 1930</span>
            </a>
          </div>

          {/* Dashboard Footer */}
          <footer className="pt-6 pb-2 border-t border-white/10 text-xs font-mono text-[var(--ink-soft)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              © 2026 VoiceShield. A risk signal, not proof. All audio is deleted immediately.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white transition-colors">
                Privacy &amp; Terms
              </Link>
              <span>•</span>
              <a href="tel:1930" className="hover:text-white transition-colors">
                Cyber Helpline: 1930
              </a>
            </div>
          </footer>

        </main>

      </div>

      {/* Incident Inspect Modal */}
      <IncidentInspectModal
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        callerNumber="+91 98201 •••••"
      />

    </div>
  );
}
