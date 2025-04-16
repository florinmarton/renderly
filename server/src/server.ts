import express from 'express';
import cors from 'cors';
import { fetchDesignJson } from './services/jsonFetcher.js';
import { renderDesignToHtml } from './services/ssrRenderer.js';
import { getCachedHtml, cacheHtml } from './services/cacheService.js';
import { DesignJsonWithBanner } from './types/design.types.js';

export function startServer(port: number): void {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get('/api/render', async (req, res) => {
    try {
      const hash = req.query.hash as string;

      if (!hash) {
        return res.status(400).send('Missing design hash parameter');
      }

      const cacheKey = `design:${hash}`;
      let html = getCachedHtml(cacheKey);

      if (!html) {
        console.log(`Cache miss for ${hash}, fetching and rendering...`);

        const designJson = (await fetchDesignJson(hash)) as DesignJsonWithBanner;
        html = renderDesignToHtml(designJson);
        cacheHtml(cacheKey, html);
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

  // Start server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}