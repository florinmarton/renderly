import React from 'react';
import { JsonButton } from '../../types/design.types.js';
import { getBackgroundStyles, getBorderStyles } from '../../utils/style.js';

interface ButtonElementProps {
  element: JsonButton;
  style: React.CSSProperties;
}

export const ButtonElement: React.FC<ButtonElementProps> = ({ element, style }) => {
  const props = element.properties;

  const buttonStyle: React.CSSProperties = {
    ...style,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    boxSizing: 'border-box',
    ...getBorderStyles(props.border),
    ...getBackgroundStyles(props.backgroundColor),
    paddingLeft: props.labelOffsetX ? `${props.labelOffsetX}px` : 0,
    paddingTop: props.labelOffsetY ? `${props.labelOffsetY}px` : 0
  };

  return (
    <div className="element button-element">
      <button
        type="button"
        style={buttonStyle}
        aria-label={props.buttonLabel || 'Button'}
      >
        {props.buttonLabel || 'Button'}
      </button>
    </div>
  );
};
