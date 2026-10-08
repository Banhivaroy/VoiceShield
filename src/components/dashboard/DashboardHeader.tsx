'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Bell, HelpCircle, ChevronDown, Check } from 'lucide-react';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount?: number;
  onOpenNotifications?: () => void;
  onOpenHelp?: () => void;
}

export default function DashboardHeader({
  activeTab,
  setActiveTab,
  unreadCount = 1,
  onOpenNotifications,
  onOpenHelp,
}: DashboardHeaderProps) {
  const [selectedLang, setSelectedLang] = useState('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = ['EN', 'HI', 'TA'];

  return (
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
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-[11px] font-medium text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Status: Protected</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[var(--ink-muted)]">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'dashboard'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white text-[var(--ink-muted)]'
            }`}
          >
            Dashboard
          </Link>
          <button
            onClick={() => setActiveTab('history')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'history'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white text-[var(--ink-muted)]'
            }`}
          >
            Call history
          </button>
          <Link
            href="/settings"
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'settings'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white text-[var(--ink-muted)]'
            }`}
          >
            Settings
          </Link>
          <button
            onClick={() => (onOpenHelp ? onOpenHelp() : setActiveTab('help'))}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'help'
                ? 'text-white font-semibold border-b-2 border-white'
                : 'hover:text-white text-[var(--ink-muted)]'
            }`}
          >
            Help
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          
          {/* Language Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/15 bg-[var(--panel)]/80 text-[11px] font-mono text-[var(--ink-muted)] hover:border-white/30 transition-colors"
            >
              <span className="font-semibold text-white">{selectedLang}</span>
              <span className="text-white/20">|</span>
              <span className="text-[var(--ink-soft)]">HI</span>
              <span className="text-white/20">|</span>
              <span className="text-[var(--ink-soft)]">TA</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-28 rounded-lg bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/20 py-1 shadow-2xl z-50 text-xs font-mono">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-[var(--ink-muted)] hover:bg-white/10 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <Check className="w-3 h-3 text-[var(--accent)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="hidden sm:flex items-center gap-1 text-xs text-[var(--ink-soft)] hover:text-white transition-colors cursor-pointer px-1 py-1"
            title="Get Help & Guides"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[var(--ink-soft)]" />
            <span>Help</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-[var(--ink-soft)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="1 Active Threat Alert"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {/* User Profile Badge */}
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
  );
}
