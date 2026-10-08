'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Fingerprint, Phone, ArrowRight, ShieldCheck, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import { playSuccessChime } from '@/lib/audioSimulator';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userEmail: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const router = useRouter();
  const [method, setMethod] = useState<'passkey' | 'phone' | 'sso'>('passkey');
  const [phone, setPhone] = useState('+91 98100 12345');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBiometricAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      playSuccessChime();
      onLoginSuccess('user@voiceshield.internal');
      onClose();
      router.push('/dashboard');
    }, 1200);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      playSuccessChime();
      onLoginSuccess(phone);
      onClose();
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#040816] border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.05)] text-[var(--ink)] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050507]/80 border border-white/20 text-xs font-mono text-[var(--accent-text)]">
            <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>ZERO-TRUST AUTHENTICATION</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight mb-1">
          Access VoiceShield Console
        </h3>
        <p className="text-xs text-[var(--ink-soft)] mb-6">
          Authenticate using device biometrics, SMS token, or corporate single sign-on.
        </p>

        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setMethod('passkey')}
            className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              method === 'passkey'
                ? 'bg-[#050507]0 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-white/20'
                : 'bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            Passkey
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              method === 'phone'
                ? 'bg-[#050507]0 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-white/20'
                : 'bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            Phone OTP
          </button>
          <button
            onClick={() => setMethod('sso')}
            className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              method === 'sso'
                ? 'bg-[#050507]0 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-white/20'
                : 'bg-[var(--panel)] border border-white/15 text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            Enterprise SSO
          </button>
        </div>

        {/* Passkey / Biometrics Flow */}
        {method === 'passkey' && (
          <div className="space-y-6 text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--panel)]/70 border border-white/20 flex items-center justify-center text-[var(--accent)] shadow-[0_0_25px_rgba(255,255,255,0.05)]">
              <Fingerprint className="w-10 h-10 animate-pulse" />
            </div>

            <div>
              <h4 className="text-base font-bold text-[var(--ink)]">Biometric Passkey (FIDO2)</h4>
              <p className="text-xs text-[var(--ink-soft)] mt-1">
                Touch your fingerprint sensor, FaceID, or hardware YubiKey to log in without passwords.
              </p>
            </div>

            <button
              onClick={handleBiometricAuth}
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#050507]0 hover:bg-cyan-400 border border-white/20 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Device Cryptographic Enclave...</span>
                </>
              ) : (
                <>
                  <Fingerprint className="w-4 h-4" />
                  <span>Authenticate with Touch ID / Passkey</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Phone OTP Flow */}
        {method === 'phone' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[var(--ink-muted)]">Registered Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-[var(--panel)] border border-white/20 text-sm font-mono text-[var(--ink)] focus:outline-none focus:border-white"
              />
            </div>

            {otpSent && (
              <div>
                <label className="text-xs font-mono text-[var(--ink-muted)]">One-Time Security Token (OTP)</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-[var(--panel)] border border-white/20 text-sm font-mono text-[var(--ink)] focus:outline-none focus:border-white"
                />
              </div>
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full py-3 rounded-full bg-[#050507]0 hover:bg-cyan-400 border border-white/20 text-slate-950 font-bold text-xs font-mono cursor-pointer transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Send Verification Code
              </button>
            ) : (
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full py-3 rounded-full bg-[#050507]0 hover:bg-cyan-400 border border-white/20 text-slate-950 font-bold text-xs font-mono cursor-pointer transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>Verify Token &amp; Enter Console</span>
              </button>
            )}
          </div>
        )}

        {/* Enterprise SSO Flow */}
        {method === 'sso' && (
          <div className="space-y-3">
            <button
              onClick={handleBiometricAuth}
              className="w-full py-3 px-4 rounded-xl bg-[var(--panel)] border border-white/15 hover:border-white/35 text-xs font-medium text-[var(--ink-muted)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Continue with Okta SSO</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
            </button>
            <button
              onClick={handleBiometricAuth}
              className="w-full py-3 px-4 rounded-xl bg-[var(--panel)] border border-white/15 hover:border-white/35 text-xs font-medium text-[var(--ink-muted)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Continue with Google Workspace (SAML 2.0)</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
            </button>
            <button
              onClick={handleBiometricAuth}
              className="w-full py-3 px-4 rounded-xl bg-[var(--panel)] border border-white/15 hover:border-white/35 text-xs font-medium text-[var(--ink-muted)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>Continue with Microsoft Entra ID (Azure)</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <Link
            href="/login"
            onClick={onClose}
            className="text-xs text-[var(--ink-soft)] hover:text-white transition-colors inline-flex items-center gap-1 font-mono"
          >
            Go to full login directory / route <ArrowRight className="w-3 h-3 text-[var(--accent)]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
