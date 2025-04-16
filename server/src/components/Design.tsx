import React from 'react';
import { DesignJsonWithBanner, JsonSlideOrElement, isJsonBackgroundSolid, isSlide } from '../types/design.types.js';
import { DesignElement } from './elements/DesignElement.js';
import { SlideElement } from './elements/SlideElement.js';

interface DesignProps {
  design: DesignJsonWithBanner;
}

export const Design: React.FC<DesignProps> = ({ design }) => {
  if (!design || !design.banner) {
    return <div className="design-error">Invalid design</div>;
  }

  const banner = design.banner;
  const properties = banner.properties;

  const width = properties.width;
  const height = properties.height;
  const backgroundColor = isJsonBackgroundSolid(properties.backgroundColor) ? properties.backgroundColor.scolor : '#ffffff';

  return (
    <div
      className="design-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {banner.elements?.map((element: JsonSlideOrElement, index) => (
        isSlide(element)
          ? <SlideElement key={`slide-${element.properties.id || index}`} element={element} />
          : <DesignElement key={`element-${element.properties.id || index}`} element={element} />
      ))}
    </div>
  );
};
