import { checkAndStoreRateLimitHit } from "@/lib/db";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 15;

const hitsByIp = new Map<string, number[]>();

function checkLeadRateLimitInMemory(clientIp: string): boolean {
  const now = Date.now();
  const prev = hitsByIp.get(clientIp) ?? [];
  const recent = prev.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hitsByIp.set(clientIp, recent);
    return false;
  }

  recent.push(now);
  hitsByIp.set(clientIp, recent);
  return true;
}

export async function checkLeadRateLimit(clientIp: string): Promise<boolean> {
  const normalizedIp = clientIp.trim() || "unknown";
  const dbOutcome = await checkAndStoreRateLimitHit({
    clientIp: normalizedIp,
    windowMs: WINDOW_MS,
    maxPerWindow: MAX_PER_WINDOW,
  });

  // If DB is not configured/unavailable, keep fallback behavior in memory.
  if (dbOutcome === null) {
    return checkLeadRateLimitInMemory(normalizedIp);
  }
  return dbOutcome;
}
