import NodeCache from 'node-cache';

// Initialize cache with 5 minute TTL
const cache = new NodeCache({ stdTTL: 300 });

export function getCachedHtml(key: string): string | undefined {
  return cache.get(key) as string;
}

export function cacheHtml(key: string, html: string): void {
  cache.set(key, html);
}