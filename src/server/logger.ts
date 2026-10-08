// any field with one of these words in its name is hidden before printing
const HIDE = /(phone|code|otp|token|secret|key|authorization|password|audio|body|cookie)/i;

function clean(value: unknown, depth = 0): unknown {
  if (depth > 4) return "[deep]";
  if (value instanceof Error) return { name: value.name };   // never print error text, it may hold private data
  if (Array.isArray(value)) return value.map((v) => clean(v, depth + 1));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = HIDE.test(k) ? "[hidden]" : clean(v, depth + 1);
    }
    return out;
  }
  return value;
}

function write(level: string, message: string, data?: unknown) {
  const line = { level, time: new Date().toISOString(), message, ...(data ? { data: clean(data) } : {}) };
  console.log(JSON.stringify(line));
}

export const log = {
  info: (m: string, d?: unknown) => write("info", m, d),
  warn: (m: string, d?: unknown) => write("warn", m, d),
  error: (m: string, d?: unknown) => write("error", m, d),
};