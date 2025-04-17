import NodeCache from 'node-cache';

// Get cache TTL from environment variable with fallback to 1 hour (3600 seconds)
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);

// Initialize cache
const cache = new NodeCache({
  stdTTL: CACHE_TTL,
  checkperiod: CACHE_TTL * 0.2, // Check for expired keys at 20% of TTL
});

export const getFromCache = (key: string) => {
  return cache.get(key);
};

export const setInCache = (key: string, value: any) => {
  return cache.set(key, value);
};

export const removeFromCache = (key: string) => {
  return cache.del(key);
};

export default cache;