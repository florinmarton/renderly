import React from 'react';
import { JsonText } from '../../../types/design.types.js';
import { TextNodeRenderer } from './TextNodeRenderer.js';
import { AnimationWrapper } from '../../animation/AnimationWrapper.js';

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
        width: style.width ? Number(style.width) * (props.scale || 1) : 'auto',
        height: style.height ? Number(style.height) * (props.scale || 1) : 'auto',
        fontSize: props.fontSize || 16,
        textAlign: props.alignment,
        lineHeight: props.lineHeight || 1.5,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <AnimationWrapper props={props}>
        {props.config?.nodes ? (
          <TextNodeRenderer nodes={props.config.nodes} />
        ) : (
          props.text || ''
        )}
      </AnimationWrapper>
    </div >
  );
};