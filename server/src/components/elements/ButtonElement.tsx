import React from 'react';
import { JsonButton } from '../../types/design.types.js';
import { getBackgroundStyles, getBorderStyles } from '../../utils/style.js';
import { AnimationWrapper } from '../animation/AnimationWrapper.js';

interface ButtonElementProps {
  element: JsonButton;
  style: React.CSSProperties;
}

export const ButtonElement: React.FC<ButtonElementProps> = ({ element, style }) => {
  const props = element.properties;

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: style.width,
    height: style.height,
    textDecoration: 'none',
    boxSizing: 'border-box',
    ...getBorderStyles(props.border),
    ...getBackgroundStyles(props.backgroundColor),
    paddingLeft: props.labelOffsetX ? `${props.labelOffsetX}px` : 0,
    paddingTop: props.labelOffsetY ? `${props.labelOffsetY}px` : 0
  };

  return (
    <div className="element button-element" style={style} >
      <AnimationWrapper props={props}>
        <button
          type="button"
          style={buttonStyle}
          aria-label={props.buttonLabel || 'Button'}
        >
          <label className="button-label">
            {props.buttonLabel || 'Button'}
          </label>
        </button>
      </AnimationWrapper>
    </div>
  );
};
