// every error uses one shape: { error: "CODE", message: "plain words" }
const STATUS = {
  INVALID_INPUT: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
} as const;

export type ErrorCode = keyof typeof STATUS;

export function fail(code: ErrorCode, message: string, headers?: Record<string, string>) {
  return Response.json({ error: code, message }, { status: STATUS[code], headers });
}

export function ok<T>(data: T, status = 200) {
  return Response.json(data, { status });
}

