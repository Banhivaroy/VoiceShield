# VoiceShield — Engineering & AI Rules

## Tech Stack
- Next.js 16+ (App Router with `(app)`, `(auth)`, `admin`, `api` route groups)
- React 19, TypeScript
- Tailwind CSS
- Prisma ORM (PostgreSQL)
- Web Audio API (real-time telemetry synthesis & signal processing)

## Architecture Guidelines
- Zero-Retention & Privacy: No persistent storage of raw audio files. Memory-only ephemeral buffers.
- Clean Cyber Defense UI: Solid, high-contrast, professional cyber security aesthetic. Avoid generic gradients and blurry glassmorphism.
- Production Interactive Standards: All interactive buttons must have deterministic feedback (modals, toasts, real-time audio playback, state changes).
