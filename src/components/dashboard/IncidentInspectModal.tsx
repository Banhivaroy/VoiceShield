'use client';

import React, { useState } from 'react';
import { X, ShieldAlert, PhoneOff, CheckCircle2, Download, AlertOctagon, Activity, FileText } from 'lucide-react';
import { playAlertBeep, playSuccessChime } from '@/lib/audioSimulator';

interface IncidentInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  callerNumber?: string;
}

export default function IncidentInspectModal({
  isOpen,
  onClose,
  callerNumber = '+91 98201 •••••',
}: IncidentInspectModalProps) {
  const [isQuarantined, setIsQuarantined] = useState(false);

  if (!isOpen) return null;

  const handleQuarantine = () => {
    setIsQuarantined(true);
    playAlertBeep();
  };

  const handleExport = () => {
    const report = {
      incidentId: 'INC-2026-98201-DELHI',
      callerNumber,
      threatScore: '92% AI Voice Clone',
      detectedSignatures: [
        'Missing respiratory micro-inhalations',
        'Repetitive 4.2s background siren loop detected',
        'Glottal phase discontinuity in carrier frequency',
      ],
      timestamp: 'Today, 14:18 IST',
      actionTaken: isQuarantined ? 'Quarantined & Blocked' : 'Flagged High Risk',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `incident-${callerNumber.replace(/[^0-9]/g, '')}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    playSuccessChime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a0a0d]/95 backdrop-blur-xl border border-red-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(239,68,68,0.25)] text-[var(--ink)] overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-mono text-red-300">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>CRITICAL INCIDENT DOSSIER // #INC-89201</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight mb-1">
          High-Risk Voice Clone Incident Inspection
        </h3>
        <p className="text-xs text-[var(--ink-soft)] mb-6">
          Forensic telemetry captured from recent incoming call: <strong className="text-white font-mono">{callerNumber}</strong>
        </p>

        {/* Threat Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mb-6">
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30">
            <span className="text-red-400 text-[10px] block">SYNTHETIC CHANCE</span>
            <span className="text-xl font-bold text-red-300">92%</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--panel)]/70 border border-white/15">
            <span className="text-white/40 text-[10px] block">CALL TIME</span>
            <span className="text-xl font-bold text-[var(--ink)]">Today, 14:18</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--panel)]/70 border border-white/15">
            <span className="text-white/40 text-[10px] block">MODEL SIGNATURE</span>
            <span className="text-sm font-bold text-[var(--accent-text)]">ElevenLabs Multilingual</span>
          </div>
        </div>

        {/* Forensic Timeline Breakdown */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/15 mb-6 space-y-3">
          <div className="text-xs font-mono text-[var(--ink-muted)] font-bold flex items-center justify-between">
            <span>DETECTION TIME LOG</span>
            <span className="text-red-400">FLAGGED IN 42ms</span>
          </div>

          <div className="space-y-2 text-xs font-mono text-[var(--ink-soft)]">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400">00:00 - 00:10</span>
              <span>Caller opened with generic &ldquo;Hello Dad&rdquo; greeting (Natural voice sample snippet).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400">00:10 - 00:18</span>
              <span>Sudden shift into flat pitch contour with artificial emergency siren background loop.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400">00:18 - 00:42</span>
              <span>Urgent extortion demand for ₹50,000 cash. VoiceShield push alert triggered immediately.</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
          <button
            onClick={handleExport}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[var(--panel)] hover:bg-[#232326] border border-white/15 text-xs font-mono text-[var(--ink-muted)] hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Download Incident JSON</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleQuarantine}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold font-mono cursor-pointer transition-all flex items-center justify-center gap-2 ${
                isQuarantined
                  ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              }`}
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>{isQuarantined ? 'Number Quarantined' : 'Quarantine & Block Number'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[var(--panel)] hover:bg-[#232326] border border-white/15 text-xs text-[var(--ink-soft)] hover:text-white font-mono cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
