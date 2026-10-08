export {};
import { z } from "zod";

export const phoneSchema = z.string().regex(/^\+[1-9]\d{7,14}$/, "Enter a valid phone number");
export const codeSchema = z.string().regex(/^\d{6}$/, "Enter the 6-digit code");
export const languageSchema = z.enum(["en", "hi", "bn", "ta"]);

// limits for audio files
export const AUDIO_LIMITS = {
  maxBytes: 10 * 1024 * 1024,
  types: ["audio/wav", "audio/x-wav", "audio/mpeg", "audio/mp4", "audio/x-m4a"],
  minSeconds: 5,
  maxSeconds: 10,
};

// the shape of a result from the ML service. No audio fields.
export const callResultSchema = z.object({
  verdict: z.enum(["REAL", "AI_MADE", "UNSURE"]),
  ai_probability: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  reasons: z.array(z.string()).max(3),
  warnings: z.array(z.string()),
  model_version: z.string(),
});