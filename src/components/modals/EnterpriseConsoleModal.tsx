'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Terminal, ShieldAlert, CheckCircle, Download, Activity, Server, Radio, RefreshCw, AlertTriangle } from 'lucide-react';
import { playAlertBeep } from '@/lib/audioSimulator';

interface EnterpriseConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnterpriseConsoleModal({ isOpen, onClose }: EnterpriseConsoleModalProps) {
  const [calls, setCalls] = useState([
    {
      id: 'CALL-9021',
      time: '12:44:02',
      trunk: 'SIP-US-EAST-01',
      caller: '+1 (415) 890-1122',
      target: 'Treasury Desk Ext #402',
      verdict: 'AI CLONE FLAGGED (98%)',
      model: 'Tortoise-TTS Diffusion',
      latency: '36ms',
      status: 'QUARANTINED',
      isThreat: true,
    },
    {
      id: 'CALL-9020',
      time: '12:43:51',
      trunk: 'SIP-IND-MUM-04',
      caller: '+91 (022) 5543-9821',
      target: 'Retail Wealth Support',
      verdict: 'AUTHENTIC HUMAN (1%)',
      model: 'Biological Vocal Cord',
      latency: '42ms',
      status: 'CLEARED',
      isThreat: false,
    },
    {
      id: 'CALL-9019',
      time: '12:43:18',
      trunk: 'SIP-UK-LON-02',
      caller: '+44 20 7946 0912',
      target: 'C-Suite Direct Line',
      verdict: 'AI CLONE FLAGGED (94%)',
      model: 'ElevenLabs v2 Clone',
      latency: '40ms',
      status: 'TERMINATED',
      isThreat: true,
    },
    {
      id: 'CALL-9018',
      time: '12:42:30',
      trunk: 'SIP-US-WEST-02',
      caller: '+1 (206) 555-0143',
      target: 'Customer Service IVR',
      verdict: 'AUTHENTIC HUMAN (2%)',
      model: 'Biological Vocal Cord',
      latency: '38ms',
      status: 'CLEARED',
      isThreat: false,
    },
  ]);

  const [downloaded, setDownloaded] = useState(false);

  const handleSimulateNewCall = () => {
    playAlertBeep();
    const newCall = {
      id: `CALL-${Math.floor(Math.random() * 9000) + 1000}`,
      time: new Date().toLocaleTimeString(),
      trunk: 'SIP-APAC-SGP-01',
      caller: `+65 ${Math.floor(Math.random() * 8999) + 1000} ${Math.floor(Math.random() * 8999) + 1000}`,
      target: 'Global Settlement Wire Desk',
      verdict: 'CRITICAL SPOOF DETECTED (97%)',
      model: 'XTTS-v2 Generative',
      latency: '34ms',
      status: 'INTERCEPTED',
      isThreat: true,
    };
    setCalls((prev) => [newCall, ...prev.slice(0, 5)]);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(calls, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `voiceshield-telemetry-incident-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#000000] border border-white/20 p-6 sm:p-8 shadow-[0_0_80px_rgba(255,255,255,0.05)] text-[var(--ink)] overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050507]/80 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>CENTRALIZED THREAT INTELLIGENCE CONSOLE</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight mb-1">
          Enterprise Live Forensics &amp; SIP Trunk Stream
        </h3>
        <p className="text-xs text-[var(--ink-soft)] mb-6">
          Real-time packet inspection for PBX, Genesys, Twilio Flex, and Asterisk enterprise telecom trunks.
        </p>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--panel)]/60 border border-white/15">
            <span className="text-slate-500 text-[10px] block">CALLS SCANNED TODAY</span>
            <span className="text-lg font-bold text-[var(--ink)]">18,492</span>
          </div>
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30">
            <span className="text-red-400 text-[10px] block">CLONES NEUTRALIZED</span>
            <span className="text-lg font-bold text-red-300">142</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--panel)]/60 border border-white/15">
            <span className="text-slate-500 text-[10px] block">MEDIAN TELEMETRY LATENCY</span>
            <span className="text-lg font-bold text-[var(--accent)]">38.4ms</span>
          </div>
          <div className="p-3.5 rounded-xl bg-violet-950/40 border border-white/15">
            <span className="text-violet-300 text-[10px] block">WIRE FRAUD PREVENTED</span>
            <span className="text-lg font-bold text-violet-200">₹4.82 Cr</span>
          </div>
        </div>

        {/* Live Stream Table */}
        <div className="rounded-2xl bg-[#000000] border border-white/15 overflow-hidden mb-6">
          <div className="p-3.5 bg-[var(--panel)]/80 border-b border-white/15 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[var(--accent-text)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#050507]0"></span>
              </span>
              <span>LIVE INBOUND TELECOM TRUNK STREAM</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateNewCall}
                className="px-2.5 py-1 rounded bg-[var(--panel)] border border-white/20 hover:border-white/35 text-[var(--accent-text)] hover:bg-cyan-900 text-[11px] cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Inbound Spoof</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[var(--panel)]/50 text-[var(--ink-soft)] border-b border-white/10 text-[11px]">
                <tr>
                  <th className="p-3">CALL ID</th>
                  <th className="p-3">TRUNK</th>
                  <th className="p-3">ORIGIN CALLER</th>
                  <th className="p-3">DESTINATION</th>
                  <th className="p-3">VERDICT</th>
                  <th className="p-3">LATENCY</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {calls.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--panel)]/40 transition-colors">
                    <td className="p-3 font-bold text-[var(--ink-muted)]">{c.id}</td>
                    <td className="p-3 text-[var(--ink-soft)]">{c.trunk}</td>
                    <td className="p-3 text-[var(--ink-muted)]">{c.caller}</td>
                    <td className="p-3 text-[var(--ink-soft)]">{c.target}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.isThreat
                          ? 'bg-red-950 text-red-400 border border-red-500/40'
                          : 'bg-violet-950 text-violet-400 border border-white/20'
                      }`}>
                        {c.verdict}
                      </span>
                    </td>
                    <td className="p-3 text-[var(--accent-text)]">{c.latency}</td>
                    <td className="p-3">
                      <span className="text-[11px] text-[var(--ink-muted)] font-bold">{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-[var(--ink-soft)] font-mono">
            Encrypted with hardware TPM 2.0 enclave • Zero audio retention
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleExportJSON}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[var(--panel)] border border-white/20 hover:border-white/35 text-[var(--accent-text)] hover:bg-[var(--panel)] text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloaded ? 'Downloaded!' : 'Export Telemetry Log (JSON)'}</span>
            </button>

            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 border border-white/20 text-white text-xs font-bold font-mono cursor-pointer transition-colors text-center inline-block"
            >
              Open Full Dashboard &rarr;
            </Link>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#050507]0 hover:bg-cyan-400 border border-white/20 text-slate-950 text-xs font-bold font-mono cursor-pointer transition-colors"
            >
              Close Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
