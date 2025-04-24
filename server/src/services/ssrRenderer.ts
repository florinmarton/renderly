import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Design } from '../components/Design.js';
import { DesignJsonWithBanner } from '../types/design.types.js';

export function renderDesignToHtml(designJson: DesignJsonWithBanner): string {
  try {
    const html = renderToStaticMarkup(
      React.createElement(Design, { design: designJson })
    );

    return html;
  } catch (error) {
    console.error('Error rendering design:', error);
    throw error;
  }
}