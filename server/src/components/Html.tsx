import React from 'react';
import fs from 'fs';
import path from 'path';

interface HtmlProps {
  children: React.ReactNode;
  title?: string;
}

const animationCss = fs.readFileSync(
  path.join(process.cwd(), 'src/styles/animations.css'),
  'utf-8'
);

export const Html: React.FC<HtmlProps> = ({ children, title = 'Design Preview' }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <style>{animationCss}</style>
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
};