import React from 'react';
import { JsonElement, isImage, isText } from '../../types/design.types.js';
import { ImageElement } from './ImageElement.js';
import { TextElement } from './TextElement.js';
import { UnsupportedElement } from './UnsupportedElement.js';

interface DesignElementProps {
  element: JsonElement;
}

export const DesignElement: React.FC<DesignElementProps> = ({ element }) => {
  // Common styles for all elements
  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    left: element.properties.x || 0,
    top: element.properties.y || 0,
    width: element.properties.width || 'auto',
    height: element.properties.height || 'auto',
    opacity: element.properties.opacity !== undefined ? element.properties.opacity : 1,
    transform: element.properties.rotation ? `rotate(${element.properties.rotation}deg)` : undefined,
    zIndex: element.properties.id || 0,
  };

  if (isImage(element)) {
    return <ImageElement element={element} style={commonStyle} />;
  } else if (isText(element)) {
    return <TextElement element={element} style={commonStyle} />;
  } else {
    return <UnsupportedElement element={element} style={commonStyle} />;
  }
};