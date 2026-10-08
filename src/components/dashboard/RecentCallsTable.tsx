'use client';

import React, { useState } from 'react';
import { Clock, Search, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface CallRecord {
  id: string;
  dateTime: string;
  number: string;
  duration: string;
  language: string;
  resultType: 'alert' | 'safe' | 'warning';
  resultText: string;
  percent?: string;
  timeline: {
    natural: string;
    flagged: string;
    detected: string;
    description: string;
  };
}

export const initialCallRecords: CallRecord[] = [
  {
    id: 'c1',
    dateTime: 'Today, 14:18',
    number: '+91 98201 •••••',
    duration: '00:42',
    language: 'English (India)',
    resultType: 'alert',
    resultText: 'Possible AI voice (92% AI chance)',
    percent: '92%',
    timeline: {
      natural: '0-10s (Natural)',
      flagged: '10-18s (Flagged)',
      detected: '18-42s (AI voice detected)',
      description: 'The caller began normally, then transitioned into a synthesized emergency pitch.',
    },
  },
  {
    id: 'c2',
    dateTime: 'Today, 11:06',
    number: '+91 98451 •••••',
    duration: '03:15',
    language: 'Tamil',
    resultType: 'safe',
    resultText: 'Real voice',
    timeline: {
      natural: '0-3m15s (All Natural)',
      flagged: 'None',
      detected: 'Zero synthetic markers',
      description: 'Verified biological conversation with natural prosody and colloquial pauses.',
    },
  },
  {
    id: 'c3',
    dateTime: 'Yesterday, 19:40',
    number: '+91 91234 •••••',
    duration: '00:18',
    language: 'Hindi',
    resultType: 'warning',
    resultText: 'Be careful (Noisy audio)',
    timeline: {
      natural: '0-12s (Human speech)',
      flagged: '12-18s (Heavy static & street noise)',
      detected: 'Low confidence scan',
      description: 'Acoustic background interference obscured high-frequency formant inspection.',
    },
  },
  {
    id: 'c4',
    dateTime: 'Yesterday, 15:22',
    number: '+91 98721 •••••',
    duration: '01:10',
    language: 'English (India)',
    resultType: 'safe',
    resultText: 'Real voice',
    timeline: {
      natural: '0-1m10s (All Natural)',
      flagged: 'None',
      detected: 'Zero synthetic markers',
      description: 'Natural speaker airflow turbulence confirmed authentic anatomy.',
    },
  },
];

interface RecentCallsTableProps {
  selectedCallId: string;
  onSelectCall: (call: CallRecord) => void;
  calls: CallRecord[];
}

export default function RecentCallsTable({
  selectedCallId,
  onSelectCall,
  calls,
}: RecentCallsTableProps) {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'safe'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = calls.filter((call) => {
    // Tab filter
    if (filter === 'alerts' && call.resultType !== 'alert') return false;
    if (filter === 'safe' && call.resultType !== 'safe') return false;
    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        call.number.toLowerCase().includes(q) ||
        call.language.toLowerCase().includes(q) ||
        call.dateTime.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md border border-white/15 p-5 shadow-xl space-y-4">
      
      {/* Top Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--accent)]" />
          <h3 className="text-base font-bold text-[var(--ink)] tracking-tight">Recent calls</h3>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex rounded-lg border border-white/15 bg-[var(--panel)]/60 p-0.5 text-xs font-mono">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white/15 border border-white/25 text-white font-bold shadow-sm'
                : 'text-[var(--ink-soft)] hover:text-white'
            }`}
          >
            All calls (24)
          </button>
          <button
            onClick={() => setFilter('alerts')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'alerts'
                ? 'bg-red-950/90 border border-red-500/50 text-red-300 font-bold shadow-sm'
                : 'text-[var(--ink-soft)] hover:text-white'
            }`}
          >
            Alerts (1)
          </button>
          <button
            onClick={() => setFilter('safe')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              filter === 'safe'
                ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-bold shadow-sm'
                : 'text-[var(--ink-soft)] hover:text-white'
            }`}
          >
            Safe (23)
          </button>
        </div>
      </div>

      {/* Search Input & Retention Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search caller number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--panel)]/90 border border-white/15 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
        </div>

        <span className="text-[11px] font-mono text-[var(--ink-soft)]">
          All audio deleted right after screening
        </span>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/[0.04] text-[var(--ink-soft)] border-b border-white/10 text-[10px] uppercase tracking-wider">
            <tr>
              <th className="p-3">DATE &amp; TIME</th>
              <th className="p-3">CALLER NUMBER</th>
              <th className="p-3">DURATION</th>
              <th className="p-3">LANGUAGE</th>
              <th className="p-3">RESULT</th>
              <th className="p-3 text-right">DETAILS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCalls.map((call) => {
              const isSelected = selectedCallId === call.id;
              return (
                <tr
                  key={call.id}
                  onClick={() => onSelectCall(call)}
                  className={`hover:bg-white/[0.05] transition-colors cursor-pointer ${
                    isSelected ? 'bg-white/[0.08]' : ''
                  }`}
                >
                  <td className="p-3 text-[var(--ink-muted)] font-medium">
                    <span className={call.resultType === 'alert' ? 'text-red-400 font-bold' : ''}>
                      {call.dateTime}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--ink-muted)] font-bold">{call.number}</td>
                  <td className="p-3 text-[var(--ink-soft)]">{call.duration}</td>
                  <td className="p-3 text-[var(--ink-muted)]">{call.language}</td>
                  <td className="p-3">
                    {call.resultType === 'alert' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-950/80 border border-red-500/50 text-red-300 text-[11px] font-bold">
                        <span>{call.resultText}</span>
                      </span>
                    )}
                    {call.resultType === 'safe' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{call.resultText}</span>
                      </span>
                    )}
                    {call.resultType === 'warning' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px]">
                        <span>{call.resultText}</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCall(call);
                      }}
                      className={`inline-flex items-center gap-1 text-xs cursor-pointer ${
                        call.resultType === 'alert'
                          ? 'text-white hover:text-[var(--accent-text)] font-bold'
                          : 'text-[var(--ink-soft)] hover:text-white'
                      }`}
                    >
                      <span>View</span>
                      {call.resultType === 'alert' && <ArrowRight className="w-3 h-3" />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
