import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "VoiceShield — Real-Time AI Voice Spoofing & Deepfake Defense",
  description: "Real-time deepfake audio defense for phone calls and audio streams. Verify identity before sending money or disclosing sensitive data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${plusJakarta.variable} bg-[var(--bg)] text-[var(--ink)] min-h-screen antialiased selection:bg-[var(--accent)] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
