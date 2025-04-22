import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Design } from '../components/Design.js';
import { DesignJsonWithBanner } from '../types/design.types.js';

export function renderDesignToHtml(designJson: DesignJsonWithBanner): string {
  try {
    const reactHtml = renderToStaticMarkup(
      React.createElement(Design, { design: designJson })
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${designJson.banner.properties.name || 'Design Render'}</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              overflow: hidden;
              width: 100%;
              height: 100%;
            }
            #root {
              width: 100%;
              height: 100%;
            }
            .design-container {
              height: 100%;
              overflow: scroll;
            }
          </style>
        </head>
        <body>
          <div id="root">${reactHtml}</div>
        </body>
      </html>
    `;
  } catch (error) {
    console.error('Error rendering design:', error);
    throw error;
  }
}