const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 15;

const hitsByIp = new Map<string, number[]>();

export function checkLeadRateLimit(clientIp: string): boolean {
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
