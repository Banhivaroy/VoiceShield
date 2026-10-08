'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Globe, ChevronDown, Menu, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenGetProtected: () => void;
  onOpenDemo: () => void;
  onOpenEnterprise: () => void;
}

export default function Navbar({
  onOpenGetProtected,
  onOpenDemo,
  onOpenEnterprise,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 z-[50] w-full h-[56px] md:h-[calc(var(--u)*67)] px-[20px] md:pl-[calc(var(--u)*24.5)] md:pr-[calc(var(--u)*50.7)] flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group hidden-start" style={{ transition: 'opacity 0.6s var(--e-soft)', transitionDelay: '0.46s' }}>
        <Shield className="w-5 h-5 text-white" />
        <span className="font-[800] text-[20px] md:text-[calc(var(--u)*26)] tracking-[calc(var(--u)*0.45)] text-white">
          VoiceShield
        </span>
      </Link>

      {/* Center Links */}
      <nav className="hidden xl:flex items-center gap-[calc(var(--u)*24)]">
        {[
          { text: 'Home', href: '/' },
          { text: 'Dashboard', href: '/dashboard' },
          { text: 'Settings', href: '/settings' },
          { text: 'Forensics', href: '/#forensics' },
          { text: 'About', href: '/#accents' },
          { text: 'FAQ', href: '/#faq' },
        ].map((link, i) => (
          <Link
            key={link.text}
            href={link.href}
            className="hidden-start text-[13px] md:text-[calc(var(--u)*11.5)] font-medium text-[var(--ink-muted)] hover:text-white transition-colors"
            style={{ transition: 'opacity 0.55s var(--e-soft)', transitionDelay: `${0.54 + i * 0.045}s` }}
          >
            {link.text}
          </Link>
        ))}
        <button
          onClick={onOpenEnterprise}
          className="hidden-start text-[13px] md:text-[calc(var(--u)*11.5)] font-medium text-[var(--ink-muted)] hover:text-white transition-colors"
          style={{ transition: 'opacity 0.55s var(--e-soft)', transitionDelay: `${0.54 + 6 * 0.045}s` }}
        >
          Enterprise PBX
        </button>
      </nav>

      {/* Right Controls */}
      <div className="hidden xl:flex items-center gap-3">
        <button className="hidden-start flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--panel)] border border-white/15 hover:border-white/30 text-[#e8e8e8] hover:bg-[#232323] text-[13px]" style={{ transition: 'opacity 0.55s var(--e-soft)', transitionDelay: '0.68s' }}>
          <Globe className="w-3.5 h-3.5" />
          <span>EN</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        <Link
          href="/login"
          className="hidden-start h-[44px] md:h-[calc(var(--u)*28)] px-4 rounded-[14px] md:rounded-[calc(var(--u)*14)] bg-[var(--panel)] border border-white/15 hover:border-white/30 text-[#e8e8e8] hover:bg-[#232323] font-medium text-[13px] flex items-center cursor-pointer"
          style={{ transition: 'opacity 0.55s var(--e-soft)', transitionDelay: '0.68s' }}
        >
          Login
        </Link>

        <button
          onClick={onOpenGetProtected}
          className="hidden-start h-[44px] md:h-[calc(var(--u)*28)] px-4 rounded-[14px] md:rounded-[calc(var(--u)*14)] bg-[var(--white-btn)] border border-white/30 hover:border-white text-[var(--btn-ink)] hover:bg-[#fff] font-medium text-[13px] flex items-center gap-1 cursor-pointer"
          style={{ transition: 'opacity 0.55s var(--e-soft)', transitionDelay: '0.73s' }}
        >
          Get Protected
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mobile Burger */}
      <button
        className="xl:hidden hidden-start p-2 rounded-full bg-[var(--panel)] border border-white/15 text-[#e8e8e8]"
        onClick={() => setMobileMenuOpen(true)}
        style={{ transition: 'opacity 0.55s var(--e-soft)', transitionDelay: '0.68s' }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-4 right-4 bg-[rgba(10,10,12,0.86)] backdrop-blur-[22px] border border-white/20 rounded-[20px] p-4 flex flex-col gap-3 min-w-[200px]">
          <button onClick={() => setMobileMenuOpen(false)} className="self-end text-white text-sm cursor-pointer">Close</button>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-white/80">Home</Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-white/80">Dashboard</Link>
          <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-white/80">Settings</Link>
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-white/80">Login</Link>
          <button onClick={() => { setMobileMenuOpen(false); onOpenGetProtected(); }} className="text-left text-[var(--accent)] font-medium cursor-pointer">Get Protected Now</button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenEnterprise(); }} className="text-left text-white/80 cursor-pointer">Enterprise PBX</button>
        </div>
      )}
    </header>
  );
}
