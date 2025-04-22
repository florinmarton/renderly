import { Request, Response, NextFunction } from 'express';

interface CacheOptions {
  maxAge?: number;        // seconds to consider fresh
  staleWhileRevalidate?: number;  // additional seconds to serve stale
}

export function createCacheMiddleware(options: CacheOptions = {}) {

  // By default, cache for 60 seconds and allow serving stale content for up to 30 seconds while fetching new version
  const {
    maxAge = 60,
    staleWhileRevalidate = 30
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    // Disable caching in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      res.set('Cache-Control', 'no-store');
      return next();
    }

    res.set(
      'Cache-Control',
      `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
    );
    next();
  };
}