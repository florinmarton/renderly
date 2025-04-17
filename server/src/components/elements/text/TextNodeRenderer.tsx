import React from 'react';
import { TextParagraph } from './TextParagraph.js';
import { JsonTextSlateConfigNode } from '../../../types/design.types.js';

interface TextNodeRendererProps {
  nodes: JsonTextSlateConfigNode[];
}

export const TextNodeRenderer: React.FC<TextNodeRendererProps> = ({ nodes }) => {
  if (!nodes?.length) {
    return null;
  }

  return (
    <>
      {nodes.map((node, index) => {
        switch (node.type) {
          case 'paragraph':
            return <TextParagraph key={index} node={node} />;
          default:
            if (node.children?.length) {
              return <TextNodeRenderer key={index} nodes={node.children as JsonTextSlateConfigNode[]} />;
            }
            return null;
        }
      })}
    </>
  );
};