import React from 'react';
import { DesignJsonWithBanner } from '../types/design.types.js';

interface DesignProps {
  design: DesignJsonWithBanner;
}

export const Design: React.FC<DesignProps> = ({ design }) => {
  if (!design || !design.banner) {
    return <div className="design-error">Invalid design</div>;
  }

  return (
    <div className="design-container">
      <pre>{JSON.stringify(design, null, 2)}</pre>
    </div>
  );
};