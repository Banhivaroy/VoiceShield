'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, History, Settings, HelpCircle, Shield, Radio } from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'Call history', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside className="w-56 shrink-0 hidden lg:flex flex-col justify-between py-6 px-4 border-r border-white/10 bg-black/40 backdrop-blur-md min-h-[calc(100vh-64px)]">
      
      {/* Top Menu */}
      <div className="space-y-6">
        <div className="text-[10px] font-mono tracking-wider text-[var(--ink-soft)]/70 uppercase px-3 font-semibold">
          NAVIGATION
        </div>

        <nav className="space-y-1.5">
          <Link
            href="/dashboard"
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white/10 border border-white/20 text-white font-semibold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                : 'text-[var(--ink-soft)] hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-white/10 border border-white/20 text-white font-semibold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                : 'text-[var(--ink-soft)] hover:text-white hover:bg-white/5'
            }`}
          >
            <History className={`w-4 h-4 ${activeTab === 'history' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
            <span>Call history</span>
          </button>
          <Link
            href="/settings"
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'settings'
                ? 'bg-white/10 border border-white/20 text-white font-semibold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                : 'text-[var(--ink-soft)] hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => setActiveTab('help')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'help'
                ? 'bg-white/10 border border-white/20 text-white font-semibold shadow-[0_0_15px_rgba(167,139,250,0.1)]'
                : 'text-[var(--ink-soft)] hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className={`w-4 h-4 ${activeTab === 'help' ? 'text-white' : 'text-[var(--ink-soft)]'}`} />
            <span>Help</span>
          </button>
        </nav>
      </div>

      {/* Bottom Live Protection Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live protection
          </span>
          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>
        <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed font-normal">
          Calls are screened in memory and deleted right after inspection.
        </p>
      </div>

    </aside>
  );
}
