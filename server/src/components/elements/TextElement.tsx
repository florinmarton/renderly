import React from 'react';
import { JsonText, JsonTextAlignment } from '../../types/design.types.js';

interface TextElementProps {
  element: JsonText;
  style: React.CSSProperties;
}

export const TextElement: React.FC<TextElementProps> = ({ element, style }) => {
  const props = element.properties;

  return (
    <div
      className="element text-element"
      style={{
        ...style,
        color: '#000000',
        fontSize: props.fontSize || 16,
        textAlign: props.alignment,
        lineHeight: 1.5,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {props.text || ''}
    </div>
  );
};