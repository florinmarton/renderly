import React from 'react';
import { JsonElement } from '../../types/design.types.js';

interface UnsupportedElementProps {
  element: JsonElement;
  style: React.CSSProperties;
}

export const UnsupportedElement: React.FC<UnsupportedElementProps> = ({ element, style }) => {
  return (
    <div
      className="element unsupported-element"
      style={{
        ...style,
        border: '2px dashed #ff0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Unsupported Element</p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Type: {element.type || 'unknown'}</p>
      </div>
    </div>
  );
};