import NodeCache from 'node-cache';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);
const REDIS_URL = process.env.REDIS_URL;
const USE_REDIS = process.env.USE_REDIS === 'true';

// Initialize in-memory cache as fallback
const memoryCache = new NodeCache({
  stdTTL: CACHE_TTL,
  checkperiod: CACHE_TTL * 0.2,
});

// Initialize Redis client if enabled
let redisClient: ReturnType<typeof createClient> | null = null;
let redisConnected = false;

if (USE_REDIS && REDIS_URL) {
  try {
    redisClient = createClient({ url: REDIS_URL });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
      redisConnected = false;
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
      redisConnected = true;
    });

    // Connect to Redis
    redisClient.connect().catch(err => {
      console.error('Failed to connect to Redis:', err);
      redisConnected = false;
    });
  } catch (error) {
    console.error('Error initializing Redis client:', error);
  }
}

// Cache interface functions
export const getFromCache = async (key: string): Promise<any> => {
  // Try Redis first if connected
  if (redisConnected && redisClient) {
    try {
      const value = await redisClient.get(key);
      if (value) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Redis get error:', error);
      // Fall back to memory cache on error
    }
  }

  // Fall back to memory cache
  return memoryCache.get(key);
};

export const setInCache = async (key: string, value: any, ttl = CACHE_TTL): Promise<boolean> => {
  // Try Redis first if connected
  if (redisConnected && redisClient) {
    try {
      await redisClient.set(key, JSON.stringify(value), { EX: ttl });
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      // Fall back to memory cache on error
    }
  }

  // Fall back to memory cache
  return memoryCache.set(key, value, ttl);
};

export const removeFromCache = async (key: string): Promise<boolean> => {
  let result = false;

  // Try Redis first if connected
  if (redisConnected && redisClient) {
    try {
      await redisClient.del(key);
      result = true;
    } catch (error) {
      console.error('Redis delete error:', error);
      // Continue to also remove from memory cache
    }
  }

  const memoryResult = memoryCache.del(key);
  return result || memoryResult > 0;
};

export const closeCacheConnections = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
  }
};

export default {
  getFromCache,
  setInCache,
  removeFromCache,
  closeCacheConnections,
};