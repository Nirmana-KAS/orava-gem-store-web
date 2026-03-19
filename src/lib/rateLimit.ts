const store = new Map<string, number[]>();

export function rateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const requests = store.get(identifier) ?? [];
  const filtered = requests.filter((timestamp) => now - timestamp < windowMs);
  if (filtered.length >= limit) {
    store.set(identifier, filtered);
    return false;
  }
  filtered.push(now);
  store.set(identifier, filtered);
  return true;
}

