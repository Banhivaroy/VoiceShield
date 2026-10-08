export {};
import { redis } from "../redis";

// counts requests in a time window, and blocks when the limit is passed
export async function rateLimit(key: string, limit: number, windowSec: number) {
  const k = `rl:${key}`;
  const res = (await redis.multi().incr(k).ttl(k).exec()) as [[Error | null, number], [Error | null, number]];
  const count = res[0][1];
  const ttl = res[1][1];
  if (ttl === -1) await redis.expire(k, windowSec);    // first request starts the window
  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfterSec: ttl > 0 ? ttl : windowSec,
  };
}

// ready-made rules, used as: rateLimit(...limits.sendCode(phone))
export const limits = {
  sendCode: (id: string) => [`send-code:${id}`, 5, 600] as const,     // 5 per 10 minutes
  verifyCode: (id: string) => [`verify-code:${id}`, 10, 600] as const,
  clipCheck: (id: string) => [`clip:${id}`, 20, 3600] as const,       // 20 per hour
  report: (id: string) => [`report:${id}`, 10, 3600] as const,
};