import { Request, Response, NextFunction } from 'express';

interface CacheOptions {
  maxAge: number;
  staleWhileRevalidate: number;
}

export const createCacheMiddleware = (options: CacheOptions) => {
  const { maxAge, staleWhileRevalidate } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    // Disable caching in non-production environments
    if (process.env.ENABLE_BROWSER_CACHE !== 'true') {
      res.set('Cache-Control', 'no-store');
      return next();
    }

    res.setHeader(
      'Cache-Control',
      `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
    );
    next();
  };
};