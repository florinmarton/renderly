import React from 'react';
import { TextSpan } from './TextSpan.js';
import { JsonTextSlateConfigNode } from '../../../types/design.types.js';

interface TextParagraphProps {
  node: JsonTextSlateConfigNode;
}

export const TextParagraph: React.FC<TextParagraphProps> = ({ node }) => {
  return (
    <p style={{ margin: '0 0 0.5em 0' }}>
      {node.children.map((child, index: number) => (
        <TextSpan key={index} node={child} />
      ))}
    </p>
  );
};