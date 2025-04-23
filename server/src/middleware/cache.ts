import { Request, Response, NextFunction } from 'express';

interface CacheOptions {
  maxAge: number;
  staleWhileRevalidate: number;
}

export const createCacheMiddleware = (options: CacheOptions) => {
  const { maxAge, staleWhileRevalidate } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    // Disable caching in non-production environments
    console.log('NODE_ENV', process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
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