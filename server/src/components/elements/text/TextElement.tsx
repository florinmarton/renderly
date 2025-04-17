import React from 'react';
import { JsonText } from '../../../types/design.types.js';
import { TextNodeRenderer } from './TextNodeRenderer.js';

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
        fontSize: props.fontSize || 16,
        textAlign: props.alignment,
        lineHeight: props.lineHeight || 1.5,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {props.config?.nodes ? (
        <TextNodeRenderer nodes={props.config.nodes} />
      ) : (
        props.text || ''
      )}
    </div>
  );
};