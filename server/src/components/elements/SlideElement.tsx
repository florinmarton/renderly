import React from 'react';
import { JsonSlide, JsonElement } from '../../types/design.types.js';
import { DesignElement } from './DesignElement.js';

interface SlideElementProps {
  element: JsonSlide;
  style?: React.CSSProperties;
}

const SLIDE_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

export const SlideElement: React.FC<SlideElementProps> = ({ element, style }) => {
  if (!element.elements || !Array.isArray(element.elements)) {
    return <div style={style} className="element slide-element slide-error">Invalid slide</div>;
  }

  return (
    <div
      className="element slide-element"
      style={{
        ...SLIDE_STYLE,
        ...style,
      }}
    >
      {element.elements.map((childElement, index) => (
        <DesignElement key={childElement.properties.id || index} element={childElement as JsonElement} />
      ))}
    </div>
  );
};