import React from 'react';
import { JsonElement, isImage, isText, isButton } from '../../types/design.types.js';
import { ImageElement } from './ImageElement.js';
import { TextElement } from './text/TextElement.js';
import { ButtonElement } from './ButtonElement.js';
import { UnsupportedElement } from './UnsupportedElement.js';
import { getBaseElementStyles } from '../../utils/style.js';

interface DesignElementProps {
  element: JsonElement;
}

export const DesignElement: React.FC<DesignElementProps> = ({ element }) => {
  // Common styles for all elements
  const commonStyle = getBaseElementStyles(element.properties);

  if (isImage(element)) {
    return <ImageElement element={element} style={commonStyle} />;
  } else if (isText(element)) {
    return <TextElement element={element} style={commonStyle} />;
  } else if (isButton(element)) {
    return <ButtonElement element={element} style={commonStyle} />;
  } else {
    return <UnsupportedElement element={element} style={commonStyle} />;
  }
};