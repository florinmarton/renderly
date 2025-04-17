import React from 'react';
import { JsonImage } from '../../types/design.types.js';

export const IMAGE_URL_PREFIX = 'https://d2gla4g2ia06u2.cloudfront.net/assets/media/';

interface ImageElementProps {
  element: JsonImage;
  style: React.CSSProperties;
}

export const ImageElement: React.FC<ImageElementProps> = ({ element, style }) => {
  const props = element.properties;

  if (!props.url) {
    return <div style={style} className="element image-element image-error">Missing image source</div>;
  }

  return (
    <div
      className="element image-element"
      style={{
        ...style,
        backgroundImage: `url(${IMAGE_URL_PREFIX}${props.url})`,
        backgroundSize: props.scaleMode === 'aspect' ? 'contain' : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};