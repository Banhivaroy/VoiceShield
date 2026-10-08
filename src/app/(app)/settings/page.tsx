'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  LayoutDashboard,
  History,
  Settings as SettingsIcon,
  HelpCircle,
  User,
  Bell,
  Lock,
  Smartphone,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Pause,
  Play,
  ArrowRight,
  ChevronRight,
  Ear,
  Radio,
  FileCheck,
  Check,
  Globe,
} from 'lucide-react';
import StarfieldBackground from '@/components/StarfieldBackground';
import { playSuccessChime, playAlertBeep } from '@/lib/audioSimulator';

export default function SettingsPage() {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'protection' | 'alerts' | 'privacy' | 'sessions' | 'appearance' | 'danger'>('profile');
  const [isShieldPaused, setIsShieldPaused] = useState(false);
  const [phone, setPhone] = useState('+91 98201 •••••');
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [email, setEmail] = useState('yachna.s@shieldmail.com');
  const [dialect, setDialect] = useState('English (India - Official)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sub-tab specific state
  const [liveProtEnabled, setLiveProtEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'oled'>('dark');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setPhone(data.user.phone);
          setEmail(data.user.email || '');
          setDialect(data.user.language || 'English (India - Official)');
          if (data.settings) {
            setLiveProtEnabled(data.settings.liveProtection);
            setSmsAlertsEnabled(data.settings.smsAlerts);
          }
        }
      })
      .catch(console.error);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          dialect,
          smsAlerts: smsAlertsEnabled,
          liveProtection: liveProtEnabled,
        })
      });
      if (res.ok) {
        playSuccessChime();
        showToast('Profile configuration committed to backend enclave.');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      playAlertBeep();
      showToast('Error saving configuration.');
    }
  };

  const handleTogglePause = () => {
    if (!isShieldPaused) {
      playAlertBeep();
      setIsShieldPaused(true);
      showToast('Acoustic shield paused for 1 hour.');
    } else {
      playSuccessChime();
      setIsShieldPaused(false);
      showToast('Acoustic shield resumed. Telemetry active.');
    }
  };

  const handleVerifyPhone = () => {
    setIsVerifyingPhone(true);
    setTimeout(() => {
      setIsVerifyingPhone(false);
      playSuccessChime();
      showToast('SMS verification challenge sent to primary SIM.');
    }, 800);
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
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Logo & Live Status */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--panel)] border border-white/15 flex items-center justify-center text-white group-hover:border-white/30 transition-colors shadow-[0_0_12px_rgba(255,255,255,0.08)]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--ink)]">
                Voice<span className="text-[var(--accent)]">Shield</span>
              </span>
            </Link>

            {/* Protected Pill Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/40 border border-white/20 text-[11px] font-medium text-violet-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
              </span>
              <span>Status: Protected</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium">
            <Link href="/" className="text-[var(--ink-muted)] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-[var(--ink-muted)] hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard" className="text-[var(--ink-muted)] hover:text-white transition-colors">
              Call history
            </Link>
            <Link href="/settings" className="text-white font-semibold border-b-2 border-white pb-0.5 transition-colors">
              Settings
            </Link>
            <Link href="/dashboard" className="text-[var(--ink-muted)] hover:text-white transition-colors">
              Help
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="text-[11px] font-mono border border-white/15 bg-[var(--panel)]/80 px-2.5 py-1 rounded-md text-[var(--ink-muted)]">
              <span className="text-white font-bold">EN</span> <span className="text-white/20">|</span> <span className="text-[var(--ink-soft)]">HI</span> <span className="text-white/20">|</span> <span className="text-[var(--ink-soft)]">TA</span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => showToast('No pending critical security advisories.')}
              className="relative p-2 rounded-lg text-[var(--ink-soft)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-[var(--ink)] leading-tight">Yachna</div>
                <div className="text-[10px] text-[var(--ink-soft)] leading-tight">Protected account</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-purple-400 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_12px_rgba(167,139,250,0.3)]">
                Y
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Main Body Layout with Left Sidebar */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-56 shrink-0 hidden lg:flex flex-col justify-between py-6 px-4 border-r border-white/10 bg-black/40 backdrop-blur-md min-h-[calc(100vh-64px)]">
          <div className="space-y-6">
            <div className="text-[10px] font-mono tracking-wider text-[var(--ink-soft)]/70 uppercase px-3 font-semibold">
              NAVIGATION
            </div>

            <nav className="space-y-1.5">
              <Link
                href="/dashboard"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[var(--ink-soft)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-[var(--ink-soft)]" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/dashboard"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[var(--ink-soft)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <History className="w-4 h-4 text-[var(--ink-soft)]" />
                <span>Call history</span>
              </Link>
              <Link
                href="/settings"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(167,139,250,0.1)]"
              >
                <SettingsIcon className="w-4 h-4 text-white" />
                <span>Settings</span>
              </Link>
              <Link
                href="/dashboard"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[var(--ink-soft)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[var(--ink-soft)]" />
                <span>Help</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Card in Sidebar */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--panel)]/80 border border-white/15 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="text-xs font-bold text-[var(--ink)]">Shield Core 4.2</div>
              <div className="text-[10px] text-violet-400 font-mono">Zero-Store Active</div>
            </div>
          </div>
        </aside>

        {/* Settings Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-full">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-soft)]">
                <span className="font-bold text-[var(--ink-muted)]">ENCL-ID // 99F2</span>
                <span className="text-[var(--ink-soft)]">|</span>
                <span className="text-violet-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                  STATUS: NORMAL
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                Security &amp; Protocol Settings
              </h1>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                Configure acoustic shielding filters, encrypted consensus ledgers, and terminal telemetry.
              </p>
            </div>

            {/* Right Top Status Box */}
            <div className="flex items-center gap-2 self-start lg:self-center font-mono">
              <div className="p-2.5 px-3.5 rounded-xl bg-[var(--panel)]/70 backdrop-blur-sm border border-white/15 text-left">
                <span className="text-[9px] uppercase tracking-wider text-[var(--ink-soft)] block font-semibold">
                  ACTIVE CORE
                </span>
                <span className="text-xs font-bold text-[var(--accent-text)]">
                  Neural Engine v4.2.0
                </span>
              </div>

              <button
                onClick={handleTogglePause}
                className="px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-900 border border-white/20 hover:border-white/40 text-xs text-white font-mono flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                {isShieldPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-violet-400" />
                    <span>Resume shield</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Pause shield (1 hr)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Sub-Navigation Menu (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-2 space-y-1 shadow-xl">
                
                {/* 1. User profile */}
                <button
                  onClick={() => setActiveSubTab('profile')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'profile'
                      ? 'bg-white/10 border border-white/20 text-white font-bold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                      : 'text-[var(--ink-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User className={`w-4 h-4 ${activeSubTab === 'profile' ? 'text-white' : 'text-[var(--accent)]'}`} />
                    <span>User profile</span>
                  </div>
                  {activeSubTab === 'profile' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                  )}
                </button>

                {/* 2. Live protection */}
                <button
                  onClick={() => setActiveSubTab('protection')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'protection'
                      ? 'bg-white/10 border border-white/20 text-white font-bold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                      : 'text-[var(--ink-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className={`w-4 h-4 ${activeSubTab === 'protection' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
                    <span>Live protection</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-950/40 border border-white/20 text-violet-400 font-bold">
                    ON
                  </span>
                </button>

                {/* 3. Alerts & SMS */}
                <button
                  onClick={() => setActiveSubTab('alerts')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'alerts'
                      ? 'bg-white/10 border border-white/20 text-white font-bold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                      : 'text-[var(--ink-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell className={`w-4 h-4 ${activeSubTab === 'alerts' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
                    <span>Alerts &amp; SMS</span>
                  </div>
                </button>

                {/* 4. Privacy & Ledger */}
                <button
                  onClick={() => setActiveSubTab('privacy')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'privacy'
                      ? 'bg-white/10 border border-white/20 text-white font-bold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                      : 'text-[var(--ink-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck className={`w-4 h-4 ${activeSubTab === 'privacy' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
                    <span>Privacy &amp; Ledger</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--panel)] border border-white/15 text-[var(--accent-text)]">
                    RAM 0
                  </span>
                </button>

                {/* 5. Active sessions */}
                <button
                  onClick={() => setActiveSubTab('sessions')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'sessions'
                      ? 'bg-white/10 border border-white/20 text-white font-bold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                      : 'text-[var(--ink-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className={`w-4 h-4 ${activeSubTab === 'sessions' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
                    <span>Active sessions</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--ink-soft)]">
                    2 nodes
                  </span>
                </button>

                {/* 6. Appearance */}
                <button
                  onClick={() => setActiveSubTab('appearance')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'appearance'
                      ? 'bg-white/10 border border-white/20 text-white font-bold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                      : 'text-[var(--ink-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Eye className={`w-4 h-4 ${activeSubTab === 'appearance' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
                    <span>Appearance</span>
                  </div>
                </button>

                {/* 7. Danger zone */}
                <button
                  onClick={() => setActiveSubTab('danger')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    activeSubTab === 'danger'
                      ? 'bg-red-950/40 border border-red-500/40 text-red-300 font-bold shadow-sm'
                      : 'text-red-400 hover:bg-red-950/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Danger zone</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </button>

              </div>

              {/* Zero Audio Vault Card */}
              <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-4 space-y-2 shadow-xl">
                <div className="flex items-center gap-1.5 text-violet-400 font-mono text-xs font-bold">
                  <Shield className="w-3.5 h-3.5 text-violet-400" />
                  <span>ZERO AUDIO VAULT</span>
                </div>
                <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
                  Voice data is processed transiently in memory-only neural partitions. Zero plain audio persists after analysis.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono">
                  <span className="text-[var(--ink-soft)]">RAM volatile shred</span>
                  <span className="text-violet-400 font-bold">100% OK</span>
                </div>
              </div>

            </div>

            {/* Right Panel Content (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* SUB-TAB 1: User Profile (Exact Match to Screenshot) */}
              {activeSubTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  {/* Panel Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        Identity &amp; Channel Profile
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Your verified acoustic interception channels and alert dispatch parameters.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-soft)]">
                      SECT-01
                    </span>
                  </div>

                  {/* Form Inputs Grid (Row 1) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Shielded Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider block">
                        SHIELDED PHONE NUMBER (SAMPLE)
                      </label>
                      
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-white font-bold">{phone}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-950/40 border border-white/20 text-violet-400 font-bold">
                            Verified
                          </span>
                          <button
                            type="button"
                            onClick={handleVerifyPhone}
                            className="px-2.5 py-1 rounded-lg bg-black hover:bg-zinc-900 border border-white/20 hover:border-white/40 text-[11px] font-mono text-white cursor-pointer transition-colors shadow-sm"
                          >
                            {isVerifyingPhone ? 'Sending...' : 'Verify & change'}
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-[var(--ink-soft)]">
                        Primary SIM monitored for deepfake impersonation vectoring.
                      </p>
                    </div>

                    {/* Security Dispatch Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider block">
                        SECURITY DISPATCH EMAIL
                      </label>

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-white/40 text-xs font-mono text-white focus:outline-none transition-colors"
                      />

                      <p className="text-[11px] text-[var(--ink-soft)]">
                        High-severity breach signals are duplicated here.
                      </p>
                    </div>

                  </div>

                  {/* Form Inputs Grid (Row 2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                    
                    {/* Dialect Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-[var(--ink-muted)] uppercase tracking-wider block">
                        PREFERRED ALERT SPEECH &amp; SMS DIALECT
                      </label>

                      <div className="relative">
                        <select
                          value={dialect}
                          onChange={(e) => setDialect(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-white/40 text-xs font-mono text-white focus:outline-none cursor-pointer appearance-none transition-colors"
                        >
                          <option value="English (India - Official)" className="bg-black text-white">English (India - Official)</option>
                          <option value="Hindi (हिन्दी - Standard)" className="bg-black text-white">Hindi (हिन्दी - Standard)</option>
                          <option value="Hinglish (Colloquial)" className="bg-black text-white">Hinglish (Colloquial)</option>
                          <option value="Tamil (தமிழ்)" className="bg-black text-white">Tamil (தமிழ்)</option>
                          <option value="Telugu (తెలుగు)" className="bg-black text-white">Telugu (తెలుగు)</option>
                        </select>
                      </div>
                    </div>

                    {/* Intervention Banner Preview */}
                    <div className="space-y-1.5">
                      <div className="flex justify-end">
                        <span className="text-[10px] font-mono text-[var(--accent)] cursor-pointer">Preview active</span>
                      </div>

                      <div className="p-3 rounded-xl bg-black/60 border border-white/15 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--panel)] border border-white/15 flex items-center justify-center text-[var(--accent)] shrink-0">
                          <Ear className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 text-xs font-mono">
                          <div className="text-[10px] text-[var(--ink-soft)] uppercase font-bold tracking-wider">
                            INTERVENTION BANNER PREVIEW
                          </div>
                          <div className="text-[var(--ink-muted)] italic font-medium">
                            &ldquo;Warning: Synthetic voice detected on live channel.&rdquo;
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Save Button Row */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-900 border border-white/20 hover:border-white/40 text-white font-bold text-xs cursor-pointer transition-all font-mono shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                    >
                      Save profile changes
                    </button>
                  </div>

                </form>
              )}

              {/* SUB-TAB 2: Live Protection */}
              {activeSubTab === 'protection' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        Live Protection Enclave
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Control continuous audio-frequency analysis for incoming cellular and VoIP calls.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-soft)]">
                      SECT-02
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Continuous Incoming Screening</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Scan voice packets in local volatile RAM during active calls.</div>
                      </div>
                      <button
                        onClick={() => {
                          setLiveProtEnabled(!liveProtEnabled);
                          showToast(`Live screening ${!liveProtEnabled ? 'enabled' : 'disabled'}.`);
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                          liveProtEnabled ? 'bg-violet-600 shadow-[0_0_12px_rgba(167,139,250,0.5)]' : 'bg-white/20'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          liveProtEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Aggressive Grandchild Scam Interceptor</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Trigger immediate screen freeze when emergency extortion phrases are paired with diffusion voice traits.</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-950/40 border border-white/20 text-violet-400 font-bold">ACTIVE</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: Alerts & SMS */}
              {activeSubTab === 'alerts' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        Alert &amp; Dispatch Rules
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Configure who gets notified when a deepfake caller is detected.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-soft)]">
                      SECT-03
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Automated SMS Warning to Recipient</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Sends instant SMS: &ldquo;Do not send money or share OTP.&rdquo;</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={smsAlertsEnabled}
                        onChange={(e) => setSmsAlertsEnabled(e.target.checked)}
                        className="accent-[var(--accent)] w-4 h-4 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)]">Secondary Emergency Contact Mirror</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Notify family member if high-risk clone call exceeds 30 seconds.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailAlertsEnabled}
                        onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
                        className="accent-[var(--accent)] w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: Privacy & Ledger */}
              {activeSubTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        Cryptographic Privacy &amp; Zero-Retention
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Inspect hardware enclave verification keys and RAM destruction certificates.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-soft)]">
                      SECT-04
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-[var(--ink-soft)]">Volatile Shredder Protocol:</span>
                      <span className="text-violet-400 font-bold">DoD 5220.22-M Zero-Fill</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--ink-soft)]">Persistent Disk Access:</span>
                      <span className="text-red-400 font-bold">PROHIBITED (0 bytes written)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--ink-soft)]">Current RAM Buffer Occupancy:</span>
                      <span className="text-[var(--accent)] font-bold">0.00 KB</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: Active Sessions */}
              {activeSubTab === 'sessions' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        Active Hardware Nodes &amp; Sessions
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Devices connected to your VoiceShield cellular telemetry feed.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-soft)]">
                      SECT-05
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">Samsung Galaxy S24 Ultra (Primary SIM)</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Delhi NCR, India • On-device Hook v4.2</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-950/40 border border-white/20 text-violet-400 font-bold">CURRENT NODE</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/15 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">MacBook Pro 16&quot; (Dashboard Console)</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Chrome 131 • HTTPS Hardware Enclave</div>
                      </div>
                      <span className="text-[var(--accent)] text-[10px] font-bold">ACTIVE NOW</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: Appearance */}
              {activeSubTab === 'appearance' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                        Console Appearance &amp; Contrast
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        High-contrast solid cyber security palettes (Zero gradient / Zero blur).
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--panel)]/80 border border-white/15 text-[var(--ink-soft)]">
                      SECT-06
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setThemeMode('dark');
                        showToast('Solid Midnight Cyber mode active.');
                      }}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        themeMode === 'dark'
                          ? 'bg-white/10 border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                          : 'bg-black/60 border-white/15 text-[var(--ink-soft)] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">Midnight Cyber (Default)</div>
                      <div className="text-[10px] text-[var(--ink-soft)] mt-1">Solid deep navy and cyan accents.</div>
                    </button>

                    <button
                      onClick={() => {
                        setThemeMode('oled');
                        showToast('Pure OLED Black mode active.');
                      }}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        themeMode === 'oled'
                          ? 'bg-white/10 border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                          : 'bg-black/60 border-white/15 text-[var(--ink-soft)] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">Pure OLED Black</div>
                      <div className="text-[10px] text-[var(--ink-soft)] mt-1">True zero-light black for maximum battery life.</div>
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-TAB 7: Danger Zone */}
              {activeSubTab === 'danger' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between pb-4 border-b border-red-500/30">
                    <div>
                      <h2 className="text-xl font-bold text-red-400 tracking-tight">
                        Danger Zone &amp; Enclave Reset
                      </h2>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Irreversible administrative actions for device unlinking and token destruction.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-300 font-bold">
                      SECT-07
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Purge All Incident Logs</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Obliterates past call metadata hashes and threat summaries.</div>
                      </div>
                      <button
                        onClick={() => {
                          playAlertBeep();
                          showToast('Incident metadata purged permanently.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-900 border border-white/20 hover:border-red-500/50 text-red-400 text-xs font-mono font-bold cursor-pointer transition-colors shadow-sm"
                      >
                        Purge Logs
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">De-register Shield from Primary SIM</div>
                        <div className="text-[11px] text-[var(--ink-soft)]">Unlinks VoiceShield from +91 98201 ••••• and revokes token.</div>
                      </div>
                      <button
                        onClick={() => {
                          playAlertBeep();
                          showToast('SIM de-registration initiated.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-black hover:bg-zinc-900 border border-white/20 hover:border-red-500/50 text-red-400 text-xs font-mono font-bold cursor-pointer transition-colors shadow-sm"
                      >
                        De-register SIM
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Settings Footer */}
          <footer className="pt-6 pb-2 border-t border-white/10 text-xs font-mono text-[var(--ink-soft)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-white/50" />
              <span>VoiceShield verdict is a mathematical risk signal, not legal proof.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Cyber Fraud Emergency Helpline: <strong className="text-white">1930</strong></span>
              <span>•</span>
              <span className="uppercase text-[10px] tracking-wider text-[var(--ink-soft)]">CONFIDENTIAL DEFENSE TELEMETRY</span>
            </div>
          </footer>

        </main>

      </div>

    </div>
  );
}
