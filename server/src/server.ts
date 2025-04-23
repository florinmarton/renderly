import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchDesignJson } from './services/jsonFetcher.js';
import { renderDesignToHtml } from './services/ssrRenderer.js';
import { setInCache, getFromCache, closeCacheConnections } from './services/cacheService.js';
import { DesignJsonWithBanner } from './types/design.types.js';
import { createCacheMiddleware } from './middleware/cache.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION || '60', 10);
const CACHE_STALE_WHILE_REVALIDATE = parseInt(process.env.CACHE_STALE_WHILE_REVALIDATE || '30', 10);

// Configure cache durations
const cacheMiddleware = createCacheMiddleware({
  maxAge: CACHE_DURATION,
  staleWhileRevalidate: CACHE_STALE_WHILE_REVALIDATE,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/render', cacheMiddleware, async (req, res) => {
  try {
    const hash = req.query.hash as string;

    if (!hash) {
      return res.status(400).send('Missing design hash parameter');
    }

    const cacheKey = `design:${hash}`;
    let html = await getFromCache(cacheKey);

    if (!html) {
      console.log(`Cache miss for ${hash}, fetching and rendering...`);

      const designJson = (await fetchDesignJson(hash)) as DesignJsonWithBanner;
      html = renderDesignToHtml(designJson);
      setInCache(cacheKey, html);
    } else {
      console.log(`Cache hit for ${hash}`);
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error rendering design:', error);
    res.status(500).send(`Error rendering design: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Handle graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down server...');
    server.close();
    await closeCacheConnections();
    console.log('Server shutdown complete');
    process.exit(0);
  };

  // Listen for termination signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return server;
};

export default app;